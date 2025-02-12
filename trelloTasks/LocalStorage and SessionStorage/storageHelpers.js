export const MAX_STORAGE_LIMIT = 5 * 1024 * 1024;
let fallbackStorage = {};

export function isStorageAvailable() {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch {
        return false;
    }
}

export function getStorage() {
    return isStorageAvailable() ? localStorage : {
        getItem: (key) => fallbackStorage[key] || null,
        setItem: (key, value) => fallbackStorage[key] = value,
        removeItem: (key) => delete fallbackStorage[key],
    };
}

export function getLocalStorageSize() {
    if (!isStorageAvailable()) return 0;
    return Object.keys(localStorage).reduce((total, key) => total + key.length + localStorage[key].length, 0);
}
