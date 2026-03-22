const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()


const paymentRouter = require("./Routes/paymentRoute")
const app = express()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

// Routes
app.use("/auth", require("./Routes/authRoute"))
app.use("/shipments", require("./Routes/shipmentRoute"))
app.use("/customer", require("./Routes/customerRoute"))
app.use("/drivers", require("./Routes/driverRoute"))
app.use("/admin", require("./Routes/adminRoute"))
app.use("/payment", paymentRouter)



app.listen(process.env.PORT || 5001, () =>
  console.log(`Server running on port ${process.env.PORT || 5001}`)
)
