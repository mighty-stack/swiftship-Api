const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../Models/userModel")


// REGISTER (driver, customer, admin)
register = async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body

    if (!["driver", "customer", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" })
    }

    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: "Email already exists" })

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
    })

    res.json({ message: `${role} registered successfully`, user })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}


// LOGIN (any role)
login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "Invalid email or password" })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message: "Invalid email or password" })

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7h" }
    )

    res.json({
      message: "Login successful",
      token,
      user,
    })

  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  register,
  login,
}
