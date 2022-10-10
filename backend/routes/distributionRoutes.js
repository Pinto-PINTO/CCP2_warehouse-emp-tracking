const express = require("express")

const {
    getDistributions,
    getDistribution,
    createDistribution,
    deleteDistribution,
    updateDistribution
} = require("../controllers/distributionController")

const router = express.Router()

// GET all shipments
router.get("/", getDistributions)

// GET a single shipment
router.get("/:id", getDistribution)


// POST a new shipment
router.post("/", createDistribution)


// DELETE a new shipment
router.delete("/:id", deleteDistribution)

// UPDATE a new shipment
router.patch("/:id", updateDistribution)



module.exports = router