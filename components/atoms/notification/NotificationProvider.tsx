import { Notifications } from '@mantine/notifications';
import { NotificationContext } from './NotivicationContext';
import { useState } from 'react';

const NotificationProdiver = ({ children }: any) => {
  const [position, setPosition] = useState<'top-center' | 'bottom-center'>(
    'top-center'
  );

  return (
    <NotificationContext.Provider value={{ position, setPosition }}>
      <Notifications position={position} />
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProdiver };
