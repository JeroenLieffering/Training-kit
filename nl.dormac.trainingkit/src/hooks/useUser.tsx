import { User } from 'dart-api';
import { useEffect, useState } from 'react';
import { useModuleContext } from './useModuleContext';
import { useUserManager } from './useUserManager';

export function useUser() {
  const [user, setUser] = useState<'operator' | 'supervisor'>(User.OPERATOR);

  const userManager = useUserManager();
  const moduleContext = useModuleContext();

  useEffect(() => {
    userManager.user.register(moduleContext, setUser);

    setUser(userManager.user.value);

    return () => {
      return userManager.user.unregister(moduleContext, setUser);
    };
  }, []);

  return user;
}
