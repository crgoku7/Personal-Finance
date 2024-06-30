import incomeExpense from "../model/income_expense.model.js";

export const incomeExpenseAdd = async (req, res) => {
  try {
    const { email, type, name, date, amount, description } = req.body;

    const createEntry = new incomeExpense({
      email: email,
      type: type,
      name: name,
      date: date,
      amount: amount,
      description: description,
    });
    await createEntry.save();
    res.status(201).json({ message: "Entry added succesfully" });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const incomeExpenseGet = async (req, res) => {
  try {
    const data = await incomeExpense.find();
    res.status(200).json(data);

  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
