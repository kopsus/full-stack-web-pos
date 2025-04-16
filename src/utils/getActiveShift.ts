import prisma from "@/lib/prisma";

export const getActiveShift = async (userId: string) => {
  const shift = await prisma.shift.findFirst({
    where: {
      user_id: userId,
      end_time: null,
    },
    include: {
      user: true,
    },
  });

  return shift;
};
