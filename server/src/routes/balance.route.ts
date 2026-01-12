import {
  deposit,
  authorize,
  reserve,
  withdraw,
  rejectWithdrawal,
  currencyConversion,
} from "../controllers/balance.controller.js";
import { Router } from "express";

const router = Router();

router.post("/deposit", deposit);
router.post("/authorize", authorize);
router.post("/reserve", reserve);
router.post("/withdraw", withdraw);
//router.post('/rejectWithdrawal', rejectWithdrawal)
router.post("/convert", currencyConversion);

export default router;
