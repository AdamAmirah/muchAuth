import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const serverAuth = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  return { currentUser };
};

export default serverAuth;
