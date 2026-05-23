const Item = require("../models/Item");

const getItems = async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
};

const createItem = async (req, res) => {
  const { name, description } = req.body;

  const item = await Item.create({
    name,
    description,
  });

  res.status(201).json(item);
};

const deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};