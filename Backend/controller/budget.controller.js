import budget from "../model/budget.model.js";

export const budgetAdd = async (req, res) => {
    try {
        const {email, type, title, amount, date} = req.body;

        const createEntry = new budget({
            email: email,
            type: type,
            title: title,
            date: date,
            amount: amount,
          });
          await createEntry.save();
          res.status(201).json({ message: "Budget added succesfully" });

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const budgetGet = async (req, res) => {
    try {
      const data = await budget.find();
      res.status(200).json(data);
  
    } catch (error) {
      console.log("Error: ", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };