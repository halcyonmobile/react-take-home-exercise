export const zustandStorage = {
  setItem: (name: string, value: string): void => localStorage.setItem(name, value),
  getItem: (name: string): string | null => {
    const value = localStorage.getItem(name);
    return value ?? null;
  },
  removeItem: (name: string): void => localStorage.removeItem(name),
};