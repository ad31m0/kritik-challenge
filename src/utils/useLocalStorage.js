/* istanbul ignore file */
import { useState, useEffect } from "react";
/**
 * Custom react hook for localStorage
 * 
 * @example const [name, setName] = useLocalStorage("name", "Avg Joe");
 *   
 * @param key: string
 * @param defaultValue: any
 * 
 */
export const useLocalStorage = (key: string, defaultValue: any) => {
    const getStorageValue = (key: string, defaultValue: any) => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : defaultValue;
    }

    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
