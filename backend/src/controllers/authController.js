const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const { data: existingUser, error: fetchError } = await supabase
  .from("users")
  .select("id")
  .eq("email", email)
  .single();

  if (fetchError && fetchError.code !== "PGRST116") {
  return res.status(500).json({
    message: fetchError.message,
  });
}

  if (existingUser) {
  return res.status(409).json({
    message: "User already exists",
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


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }
const { data: user, error } = await supabase
  .from("users")
  .select("*")
  .eq("email", email)
  .single();

  if (!user) {
  return res.status(401).json({
    message: "Invalid email or password",
  });
}

const isPasswordMatch = await bcrypt.compare(
  password,
  user.password
);
console.log("Entered password:", password);
console.log("Stored hash:", user.password);
console.log("Password match:", isPasswordMatch);

if (!isPasswordMatch) {
  return res.status(401).json({
    message: "Invalid email or password",
  });
}

const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d",
  }
);

res.json({
  message: "Login successful",
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
});
};

module.exports = {
  registerUser,
  loginUser,
};
