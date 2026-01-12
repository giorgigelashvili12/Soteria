import Merchant from "../models/Merchant.model.js";
import Membership from "../models/Membership.model.js";
import Workspace from "../models/Workspace.model.js";
import { transactionalApi } from "../services/brevo.service.js";
import type { Request, Response } from "express";
import Invitation from "../models/Invitation.model.js";
import crypto from "crypto";

export const invite = async (req: Request, res: Response) => {
  try {
    const { email, role, workspaceId } = req.body;
    // @ts-ignore
    const inviterId = req.merchant.id;

    const invited = await Merchant.findOne({ email });
    const workspace = await Workspace.findById(workspaceId);
    //@ts-ignore
    const inviter = req.merchant;

    if (!workspace) {
      return res.status(404).json({ msg: "workspace not found" });
    }
    if (!inviter) {
      return res.status(404).json({ msg: "inviter not found" });
    }
    if (!invited) {
      return res
        .status(404)
        .json({ msg: "invited must have an account first" });
    }

    await Invitation.deleteMany({
      email: email.toLowerCase(),
      workspace_id: workspaceId,
    });
    await Membership.deleteMany({
      merchant_id: invited._id,
      workspace_id: workspaceId,
    });

    const token = crypto.randomBytes(32).toString("hex");
    await Invitation.create({
      workspace_id: workspaceId,
      email: email,
      role: role,
      token: token,
      inviter_id: inviter._id,
      expires_at: new Date(Date.now() + 86400000),
      status: "pending",
    });

    const existing = await Membership.findOne({
      workspace_id: workspaceId,
      merchant_id: invited._id,
    });
    if (existing)
      return res
        .status(400)
        .json({ msg: "user was invited or is already a member" });

    const membership = new Membership({
      workspace_id: workspaceId,
      merchant_id: invited._id,
      role: role,
      status: "invited",
    });

    await membership.save();

    const inviterName = inviter.legalName;
    const spaceName = workspace.name;
    const inviteUrl = `http://localhost:5173/dashboard/accept-invite/${token}`;
    const tag = role.charAt(0).toUpperCase() + role.slice(1);

    await transactionalApi.sendTransacEmail({
      sender: { email: process.env.BREVO_SENDER, name: "Soteria" },
      to: [{ email: email, name: invited.legalName }],
      subject: `Invitation to join ${spaceName} on Soteria`,
      htmlContent: `
      <div style="background-color: #f9fafb; padding: 40px 20px; font-family: sans-serif;">
        <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="padding: 32px;">
            <div style="background-color: #10b981; width: 100px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: #fff; font-weight: bold; font-size: 20px; display: flex; align-items: center; justify-content: center;"><p>Soteria</p></div>
            <h1 style="font-size: 24px; font-weight: 700; color: #111827; margin: 0;">Join the team</h1>
            <p style="font-size: 16px; line-height: 24px; color: #4b5563; margin-top: 16px;">
              <strong>${inviterName}</strong> has invited you to join the <strong>${spaceName}</strong> workspace.
            </p>
            <div style="border-radius: 8px; padding: 16px; margin: 24px 0;">
              <span style="font-size: 14px; color: #6b7280;">Role: <strong style="background-color: #f3f4f6; padding: 3px; padding-left: 10px; padding-right: 10px; border-radius: 15px; border: 1px solid #cecfd1">${tag}</strong></span>
            </div>
            <a href="${inviteUrl}" style="background: linear-gradient(to right, #22c55e, #0d9488); color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: 600; display: inline-block; width: 100%; text-align: center; box-sizing: border-box;">
              Accept Invitation
            </a>
          </div>
        </div>
      </div>
      `,
    });

    return res.status(200).json({
      status: "success",
      msg: "Invitation sent",
      membershipId: membership._id,
    });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ msg: e.message });
  }
};

export const userData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "Workspace id is required" });
    }

    const members = await Membership.find({ workspace_id: id })
      .populate("merchant_id", "legalName email")
      .sort({ joined_at: -1 });

    return res.status(200).json({ members });
  } catch (e: any) {
    return res.status(500).json({ msg: e.message });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const { membershipId } = req.params;
    const { newRole } = req.body;

    //@ts-ignore
    const admin = req.merchant._id;

    const adminChange = await Membership.findOne({
      merchant_id: admin,
      status: "active",
    });
    if (!adminChange || !["owner", "admin"].includes(adminChange.role)) {
      return res.status(403).json({ msg: "only admins can change roles" });
    }

    const updated = await Membership.findByIdAndUpdate(
      membershipId,
      { role: newRole },
      { new: true },
    );

    return res.status(200).json({ msg: "new role assigne", updated });
  } catch (e) {
    return res.status(500).json({ msg: "internal server error", data: e });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { membershipId } = req.params;
    const { reason } = req.body;

    const toRemove =
      await Membership.findById(membershipId).populate("merchant_id");
    if (!toRemove) {
      return res.status(404).json({ msg: "member not found" });
    }

    await Membership.findByIdAndDelete(membershipId);

    return res.status(200).json({ msg: "user removed" });
  } catch (e) {
    return res.status(500).json({ msg: "internal server error", data: e });
  }
};
