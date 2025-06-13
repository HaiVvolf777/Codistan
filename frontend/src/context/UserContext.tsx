/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} from '../services/api';



const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const useUsersQuery = (params: { page: number; limit: number; sort: string }) =>
    useQuery({
      queryKey: ['users', params],
      queryFn: () => fetchUsers(params.page, params.limit, params.sort),
    });

  const useUserQuery = (id: string) => useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const value = {
    useUsersQuery,
    useUserQuery,
    createUser: createUserMutation.mutateAsync,
    updateUser: updateUserMutation.mutateAsync,
    deleteUser: deleteUserMutation.mutateAsync,
    isLoading: createUserMutation.isPending || updateUserMutation.isPending || deleteUserMutation.isPending,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUsers = (params?: { page: number; limit: number; sort: string }) => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  
  if (params) {
    return {
      ...context,
      usersQuery: context.useUsersQuery(params),
    };
  }
  
  return context;
};