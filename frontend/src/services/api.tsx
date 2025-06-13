const API_BASE_URL = 'http://localhost:5000/api';

export const fetchUsers = async (page = 1, limit = 10, sort = 'createdAt') => {
  const response = await fetch(`${API_BASE_URL}/users?page=${page}&limit=${limit}&sort=${sort}`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const fetchUser = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
};

interface User {
  name: string;
  email: string;
   role: string;
}

export const createUser = async (userData: User) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};

interface UpdateUserData extends Partial<User> {
  id: string;
}

export const updateUser = async ({ id, ...userData }: UpdateUserData) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to update user');
  return response.json();
};

export const deleteUser = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete user');
  return response.json();
};