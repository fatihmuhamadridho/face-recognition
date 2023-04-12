import React, { useContext } from 'react';

export type INotificationContext = {
  position: string;
  // eslint-disable-next-line no-unused-vars
  setPosition: (event: 'top-center' | 'bottom-center') => void;
};

/* istanbul ignore next */
const noop = () => {};

export const NotificationContext = React.createContext<INotificationContext>({
  position: 'top-center',
  setPosition: noop
});

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'FeedListContent.* Component must be rendered as child of FeedListContent Component'
    );
  }

  return context;
};
