import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log(req.body);
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, name, jobTitle, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        jobTitle,
        phoneNumber,
        hashedPassword,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
