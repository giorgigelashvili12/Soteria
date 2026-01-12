// analytics
import Invitation from "../models/Invitation.model.js";
import type { Request, Response } from "express";
import Membership from "../models/Membership.model.js";

export const invitation = async (req: Request, res: Response) => {
  try {
    const { workspaceId } = req.params;

    if (!workspaceId) {
      return res.status(400).json({ msg: "workspace id is missing" });
    }

    const pending = await Invitation.countDocuments({
      workspace_id: workspaceId,
      status: "pending",
    });
    const accepted = await Invitation.countDocuments({
      workspace_id: workspaceId,
      status: "accepted",
    });
    const suspended = await Invitation.countDocuments({
      workspace_id: workspaceId,
      status: "suspended",
    });

    const sum = pending + accepted + suspended;

    return res.status(200).json({
      msg: "analytics fetched",
      data: [pending, accepted, suspended, sum],
    });
  } catch (e) {
    return res.status(500).json({ msg: "internal server error", data: e });
  }
};

export const accept = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    //@ts-ignore
    const merchantId = req.merchant._id;

    if (!token) {
      return res.status(400).json({ msg: "missing token" });
    }

    const invite = await Invitation.findOne({
      token: token,
      status: "pending",
    }).populate("workspace_id", "name");

    if (!invite) {
      console.log("triggered");
      return res.status(404).json({ msg: "invite not found or accepted" });
    }

    //@ts-ignore
    const merchantEmail = req.merchant.email;
    if (invite.email !== merchantEmail) {
      console.log("invalid email", invite.email, merchantEmail);
      return res.status(403).json({
        msg: `You're logged in as ${merchantEmail}. invite was sent to ${invite.email}`,
      });
    }

    if (new Date() > invite.expires_at) {
      return res.status(400).json({ msg: "invitation libk expired" });
    }

    const populated = (invite.workspace_id as any)._id;

    const member = await Membership.findOneAndUpdate(
      {
        workspace_id: populated,
        merchant_id: merchantId,
      },
      {
        status: "active",
        role: invite.role,
        joined_at: new Date(),
      },
      { upsert: true, new: true },
    );

    invite.status = "accepted";
    await invite.save();

    return res.status(200).json({
      msg: "Successfully joined workspace!",
      workspaceId: populated,
      //@ts-ignore
      workspaceName: invite.workspace_id.name,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "internal server error", data: e });
  }
};
