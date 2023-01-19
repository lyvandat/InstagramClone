import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../lib/auth";
import { connectDB } from "../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(501).json({ message: "request method not supported" });
    return;
  }

  // for connecting db
  let client;
  const { name, email, password } = req.body;

  if (
    !email.includes("@") ||
    email.trim().length < 6 ||
    !password ||
    password.trim().length < 6
  ) {
    res.status(422).json({ message: "email and password is not valid" });
    return;
  }

  try {
    client = await connectDB();
  } catch (err) {
    res.status(500).json({ message: "cannot connect to db" });
    return;
  }

  try {
    const db = client.db();
    const isExistUser = await db.collection("users").findOne({ email });

    if (isExistUser) {
      res.status(403).json({ message: "email has already existed" });
      return;
    }
    const hashedPassword = await hashPassword(password);
    const result = await db
      .collection("users")
      .insertOne({ name, email, password: hashedPassword });
    res.status(200).json({
      id: result.insertedId,
      message: "account created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "cannot create account" });
    return;
  }

  if (client) {
    client.close();
  }
}
