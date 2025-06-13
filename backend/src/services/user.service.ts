import prisma from '../config/db';
import { User } from '../models/user.model';

export const createUser = async (userData: User) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email }
  });

  if (existingUser) {
    throw new Error('EMAIL_EXISTS');
  }

  return await prisma.user.create({ 
    data: userData 
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const getUsers = async (
  page: number = 1,
  limit: number = 10,
  sort: string = "createdAt"
) => {
  const [data, total] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sort]: "asc" },
    }),
    prisma.user.count()
  ]);
  
  return { data, total }; 
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const updateUser = async (id: string, userData: Partial<User>) => {
  return prisma.user.update({ where: { id }, data: userData });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({ where: { id } });
};

