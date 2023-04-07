import React, { useContext } from 'react';

export type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  user: any;
  setUser: (e: any) => void;
  accessToken?: string;
  setAccessToken: (e: any) => void;
};

/* istanbul ignore next */
const noop = () => {};

export const AuthContext = React.createContext<IAuthContext>({
  authenticated: false,
  user: null,
  accessToken: '',
  setAuthenticated: noop,
  setUser: noop,
  setAccessToken: noop
});

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'FeedListContent.* Component must be rendered as child of FeedListContent Component'
    );
  }

  return context;
};
