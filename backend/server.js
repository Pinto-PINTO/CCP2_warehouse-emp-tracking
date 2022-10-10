//Requirements
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const inventoryRoutes = require("./routes/inventoryRoutes");
const supplyRoutes = require("./routes/supplyRoutes");
const shipmentRoutes = require("./routes/shipments");
const mailRoutes = require("./routes/mailRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const QASessionRoutes = require("./routes/qaSessionRoutes");
const distributionRoutes = require("./routes/distributionRoutes");
const vehicleRoutes = require('./routes/vehicleRoutes')

const userRoutes = require("./routes/userRoutes");

//Initializiations
const app = express();

//Middle ware

//checking for json data in any request and if there is,express.json passes it to the req object to be used
app.use(express.json());

//this handles all the request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//Route Registration
app.use("/api/inventory/items", inventoryRoutes);
app.use("/api/supplies", supplyRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/distributions", distributionRoutes);
app.use('/api/vehicles', vehicleRoutes)

app.use("/api/qualityassurance", QASessionRoutes);
app.use("/api/inventory/items", inventoryRoutes);
app.use("/api/supplies", supplyRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/mail", mailRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/user", userRoutes);

//Database Connection
mongoose
  .connect(process.env.MONGO_STOCKTRACKING_URI)
  .then(() => {
    //Request Listener
    app.listen(process.env.PORT, () => {
      console.log(" Databse Connection Established,  Listening on port:4000");
    });
  })
  .catch((error) => {
    console.log("Connection to the MongoDB Failed:" + error);
  });
