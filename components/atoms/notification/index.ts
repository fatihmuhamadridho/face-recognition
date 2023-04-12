import { notifications } from '@mantine/notifications';

export class notification {
  static success(message?: string) {
    return notifications.show({
      message: message || 'success',
      color: 'green'
    });
  }

  static failed = (message?: string) => {
    return notifications.show({
      message: message || 'failed',
      color: 'red'
    });
  };

  static warning = (message?: string) => {
    return notifications.show({
      message: message || 'warning',
      color: 'orange'
    });
  };
}
