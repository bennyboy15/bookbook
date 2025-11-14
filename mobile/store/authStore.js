import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create((set, get) => ({
    user: null,
    token: null,
    isLoading: false,
    isCheckingAuth: false,

    register: async (name, username, email, password) => {
        try {
            set({ isLoading: true });
            const response = await fetch("https://bookbook-8jgx.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, email: email, username: username, password: password })
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Something went wrong");

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({ token: data.token, user: data.user, isLoading: false });
            return { success: true }

        } catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message }
        }
    },

    login: async (username, password) => {
        try {
            set({ isLoading: true });
            const response = await fetch("https://bookbook-8jgx.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Something went wrong");

            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.token);

            set({ token: data.token, user: data.user, isLoading: false });
            return { success: true }

        } catch (error) {
            set({ isLoading: false });
            return { success: false, error: error.message }
        }
    },

    logout: async () => {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        set({ token: null, user: null });
    },

    checkAuth: async () => {
        try {
            set({ isCheckingAuth: true });
            const token = await AsyncStorage.getItem("token");
            const userJson = await AsyncStorage.getItem("user");
            const user = userJson ? JSON.parse(userJson) : null;

            set({ token, user });
        } catch (error) {
            console.log("Auth check failed", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

}))