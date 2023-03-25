import React from 'react';

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
   accessToken: "",
   setAuthenticated: noop,
   setUser: noop,
   setAccessToken: noop
});
