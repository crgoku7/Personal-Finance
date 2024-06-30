import mongoose from "mongoose";

const budgetSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    type:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type: Date,
        required:true
    }
})

const budget = mongoose.model("Budget", budgetSchema);

export default budget;