const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()


const paymentRouter = require("./Routes/paymentRoute")
const app = express()
const allowedOrigins = [
  'http://localhost:5173', 
  'https://swiftship-qfov.vercel.app'
]


app.use(express.json())
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}))

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
