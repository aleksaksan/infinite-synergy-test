import { IUser } from "../store/userSlice";

const DATA_URL = "../../mockData/users-large.json" as const;

export const fetchUsers = async (): Promise<IUser[]> => {
  const response = await fetch(DATA_URL);
  if (!response.ok)
    throw new Error('Failed to load users');
  return await response.json();
};
