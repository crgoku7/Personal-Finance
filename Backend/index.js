import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./route/user.route.js";
import incomeExpenseRoute from "./route/income_expense.route.js";
import budgetRoute from "./route/budget.route.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const URI = process.env.MongoDBURI;

try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Connected to MongoDB");

} catch (error) {
    console.log("error: ", error);
}

app.use("/user", userRoute);

app.use("/incomeExpense", incomeExpenseRoute);

app.use("/budget", budgetRoute);

app.listen(PORT, () =>{
    console.log(`Example App listening on port ${PORT}`);
});