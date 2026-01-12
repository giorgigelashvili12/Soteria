import Workspace from "../models/Workspace.model.js";
import Merchant from "../models/Merchant.model.js";
import Membership from "../models/Membership.model.js";
import type { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const merId = req.user.id; // auth middleware
    const merchant = (await Merchant.findById(merId))!;

    const existing = await Workspace.countDocuments({ owner_id: merId });
    if (merchant.emailVerified && existing >= 1) {
      return res.status(403).json({
        msg: "verify your email to create more workspaces",
      });
    }

    let init = "playground";
    if (merchant.documentVerified) {
      init = "live";
    } else if (merchant.emailVerified) {
      init = "test";
    }

    const newWorkspace = new Workspace({
      owner_id: merId,
      name: req.body.name,
      status: init,
      branding: {
        description: req.body.description || "",
      },
    });

    await newWorkspace.save();

    await Membership.create({
      workspace_id: newWorkspace._id,
      merchant_id: merId,
      role: "owner",
      status: "active",
      joined_at: new Date(),
    });

    return res.status(201).json({ newWorkspace });
  } catch (e) {
    return res.status(500).json({ msg: "internal server error", data: e });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    //@ts-ignore
    const workspaces = await Workspace.find({ owner_id: req.user.id });
    return res.json(workspaces);
  } catch (e) {
    return res.status(500).json({ msg: "internal server error", data: e });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const merchantId = req.merchant?._id?.toString() || req.merchant?.id;

    const memberships = await Membership.find({
      merchant_id: merchantId,
      status: "active",
    }).populate("workspace_id", "name logo");

    const workspaces = memberships
      .map((m) => m.workspace_id)
      .filter((ws) => ws !== null);

    return res.status(200).json({ workspaces });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "internal server error", data: e });
  }
};

export const workspaceId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //@ts-ignore
    const merchant = req.merchant?._id || req.merchant?.id;
    console.info(id, merchant);

    if (!id || !merchant) {
      return res
        .status(400)
        .json({ msg: "id or token missing", data: [id, merchant] });
    }

    const workspace = await Workspace.findById(id);
    if (!workspace) {
      return res.status(404).json({ msg: "workspace not found", data: [] });
    }

    const membership = await Membership.findOne({
      workspace_id: id,
      merchant_id: merchant,
      status: "active",
    });
    if (!membership) {
      return res
        .status(403)
        .json({ msg: "access denied", data: "not a member" });
    }

    return res
      .status(200)
      .json({ msg: "found", workspace, role: membership.role });
  } catch (e) {
    return res.status(500).json({ msg: "internal server error", data: e });
  }
};
