const SavingSchema = require("../models/SavingModel");

exports.addSaving = async (req, res) => {
  const { title, amount, description, category, type, date } = req.body;

  const saving = new SavingSchema({
    title,
    type,
    amount,
    description,
    category,
    date,
  });

  try {
    //validations
    if (!title || !amount || !description || !category || !date) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    if (amount < 0 || !amount === "number") {
      return res.status(400).json({ msg: "Amount cannot be negative" });
    }
    await saving.save();
    res.status(200).json({ msg: "Saving added successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getSavings = async (req, res) => {
  try {
    const saving = await SavingSchema.find();
    res.status(200).json(saving);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.deleteSaving = async (req, res) => {
  const { id } = req.params;
  SavingSchema.findByIdAndDelete(id)
    .then((saving) => {
      res.status(200).json({ msg: "Saving deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Server Error" });
    });
};

exports.updateSaving = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedSaving = await SavingSchema.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedSaving) {
      return res.status(404).json({ msg: "Saving not found" });
    }

    return res
      .status(200)
      .json({ msg: "Saving updated successfully", saving: updatedSaving });
  } catch (err) {
    console.error("Error updating saving:", err);
    return res.status(500).json({ msg: "Server Error" });
  }
};
