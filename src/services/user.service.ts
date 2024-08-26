import { User } from '../interfaces/user.interface';
import UserModel from '../models/users.model';

const getUsers = async (): Promise<User[]> => {
  const users = await UserModel.find().select('-password');
  return users;
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await UserModel.findOne({ email });
  return user;
};

const getUserById = async (id: string): Promise<User | null> => {
  const user = await UserModel.findOne({ _id: id });
  if (!user) return null;
  const userModified = user.toObject();
  delete (userModified as any).password;
  return userModified;
};

const addUser = async (data: Partial<User>) => {
  const user = await UserModel.create(data);
  const userModified = user.toObject();
  delete (userModified as any).password;
  return userModified;
};

const updateUser = async (id: string, data: Partial<User>) => {
  const user = await UserModel.findOneAndUpdate({ _id: id }, { ...data, updatedAt: new Date() }, { new: true }).select('-password');
  return user;
};

const deleteUser = async (id: string) => {
  const user = await UserModel.deleteOne({ _id: id });
  return user;
};

export { getUsers, getUserByEmail, getUserById, addUser, updateUser, deleteUser };
