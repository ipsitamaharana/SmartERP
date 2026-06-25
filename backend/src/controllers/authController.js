const bcrypt = require("bcryptjs");
const supabase = require("../config/supabase");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  

const hashedPassword = await bcrypt.hash(password, 10);

const { data, error } = await supabase
  .from("users")
  .insert([
    {
      name,
      email,
      password: hashedPassword,
    },
  ]);

if (error) {
  console.log(error);

  return res.status(500).json({
    message: error.message,
  });
}

  res.json({
    message: "Register Controller Working",
  });
};

module.exports = {
  registerUser,
};