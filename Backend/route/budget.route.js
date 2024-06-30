import express, {Router} from "express";
import { budgetAdd, budgetGet } from "../controller/budget.controller.js";

const router = express.Router();

router.post("/budgetAdd", budgetAdd);
router.get("/budgetGet", budgetGet);

export default router;