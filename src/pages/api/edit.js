import prisma from "../../libs/prismadb";
import serverAuth from "../../libs/serverAuth";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { name, jobTitle, email, phoneNumber, password } = req.body;
    if (!name || !email || !jobTitle || !phoneNumber) {
      throw new Error("Missing fields");
    }
    const hasPasswordChanged = password !== "";
    let hashedPassword;
    if (hasPasswordChanged) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name,
        jobTitle,
        email,
        phoneNumber,
        hashedPassword: hasPasswordChanged
          ? hashedPassword
          : currentUser.hashedPassword,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
