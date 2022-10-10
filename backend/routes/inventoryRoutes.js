const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

//Get All items in the inventory

router.get("/", getItems);

//Get a single Item

router.get("/:id", getItem);

//Post a new item to the inventory
router.post("/", createItem);

//Delete a new item to the inventory
router.delete("/:id", deleteItem);

//Update  a item to the inventory
router.patch("/:id", updateItem);

module.exports = router;
