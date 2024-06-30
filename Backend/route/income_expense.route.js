import express, {Router} from "express";
import { incomeExpenseAdd, incomeExpenseGet } from "../controller/income_expense.controller.js";

const router = express.Router();

router.post("/incomeExpenseAdd", incomeExpenseAdd);
router.get("/incomeExpenseGet", incomeExpenseGet);

export default router;