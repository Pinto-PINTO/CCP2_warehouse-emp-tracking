const express = require("express")

const {
    getShipments,
    getShipment,
    createShipment,
    deleteShipment,
    updateShipment
} = require("../controllers/shipmentController")

const router = express.Router()

// GET all shipments
router.get("/", getShipments)

// GET a single shipment
router.get("/:id", getShipment)


// POST a new shipment
router.post("/", createShipment)


// DELETE a new shipment
router.delete("/:id", deleteShipment)

// UPDATE a new shipment
router.patch("/:id", updateShipment)



module.exports = router