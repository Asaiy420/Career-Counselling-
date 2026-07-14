import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import crypto from "node:crypto";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

const users: User[] = [];

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name?.trim()) {
    return res.status(400).json({ message: "Name is required" });
  }

  if (!email?.trim()) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (!password || !/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/.test(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters, include one uppercase letter, one number, and one special character",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = users.find((user) => user.email === normalizedEmail);

  if (existingUser) {
    return res.status(409).json({ message: "An account with this email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  };

  users.push(newUser);

  return res.status(201).json({
    message: "Registration successful",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email?.trim()) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password?.trim()) {
    return res.status(400).json({ message: "Password is required" });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((u) => u.email === normalizedEmail);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});