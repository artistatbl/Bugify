import { MetadataRoute } from "next";
import prisma from "prisma/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
    take: 1,
  });

  return [
    {
      url: "https://bugify.vercel.app",
      lastModified: new Date(),
    },
    ...users.map((user) => ({
      url: `https://bugify.vercel.app/users/${user.id}`,
      lastModified: new Date(),
    })),
  ];
}
