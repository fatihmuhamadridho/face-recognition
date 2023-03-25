import { storageHelper } from '@libs';
import { useEffect, useState } from 'react';
import { AuthService } from 'services/authService/auth';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>();
  const [accessToken, setAccessToken] = useState<string>('');
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      const token = storageHelper.get('access_token');
      if (token) {
        try {
          const response = await AuthService.onPrivilege(token);
          if (response.status === 200) {
            console.log(response.data.data);
            setUser(response.data.data);
            setAccessToken(response.data.data.access_token);
            setAuthenticated(true);
            setIsLoading(false);
          }
        } catch (error: any) {
          console.error(error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        authenticated,
        setUser,
        setAccessToken,
        setAuthenticated
      }}>
      {children}
    </AuthContext.Provider>
  );
};
