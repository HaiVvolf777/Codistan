'use client';

import { UserProvider } from '@/context/UserContext';
import UserList from '@/components/user/UserList';

const User = () => {
  return (
    <UserProvider>
      <UserList />
    </UserProvider>
  );
}

export default User;
