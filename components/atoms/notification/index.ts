import { notifications } from '@mantine/notifications';

export const notifySucces = (message?: string) => {
  return notifications.show({
    message: message || 'success',
    color: 'green'
  });
};

export const notifyFailed = (message?: string) => {
  return notifications.show({
    message: message || 'failed',
    color: 'red'
  });
};

export const notifyWarning = (message?: string) => {
  return notifications.show({
    message: message || 'warning',
    color: 'orange'
  });
};
