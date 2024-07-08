import { User } from '../models/user';

const users: User[] = [];

export const registerUser = (username: string, password: string): User => {
  const user = new User(username, password);
  users.push(user);
  return user;
};

export const authenticateUser = (username: string, password: string): User | null => {
  return users.find(user => user.username === username && user.password === password) || null;
};

export const getUserById = (id: string): User | null => {
  return users.find(user => user.id === id) || null;
};
