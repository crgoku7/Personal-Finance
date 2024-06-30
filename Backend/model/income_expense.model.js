import mongoose from "mongoose";

const incomeExpenseSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String
    }
})

const incomeExpense = mongoose.model("incomeExpense", incomeExpenseSchema);

export default incomeExpense;