/* eslint-disable import/no-anonymous-default-export */
export default {
  get: (name: string) => {
    const storage = localStorage.getItem(name);

    return storage ? storage : null;
  },
  set: (name: string, value: any) => {
    return localStorage.setItem(name, value);
  },
  remove: (name: string) => {
    return localStorage.removeItem(name);
  },
  removeAll: () => {
    return localStorage.clear();
  }
};
