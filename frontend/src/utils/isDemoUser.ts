import { IUser } from '@components/User/user.types';

export const isDemoUser = (user?: IUser | null): boolean => {
  if (!user) return false;
  return user.isDemo === true;
};
