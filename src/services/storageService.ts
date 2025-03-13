export const saveToStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};
