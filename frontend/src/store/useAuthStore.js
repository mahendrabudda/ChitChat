import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  socket: null,
  loading: true,
  onlineUsers: [],

  login: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login successful");
      get().connectSocket();
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  signup: async (data) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.post("/auth/sign-up", data);
      set({ authUser: res.data });
      toast.success("Account created");
      get().connectSocket();
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out");
      get().disconnectSocket();
    } catch (err) {
      toast.error("Logout failed");
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch {
      set({ authUser: null });
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  },

  connectSocket: () => {
  const { authUser, socket } = get();
  if (!authUser || socket?.connected) return;

  const newSocket = io(BASE_URL, {
    withCredentials: true,
    query: { userId: authUser._id },   // ← add this line
  });

  newSocket.connect();
  newSocket.on("getOnlineUsers", (userIds) => set({ onlineUsers: userIds }));
  set({ socket: newSocket });
},

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) socket.disconnect();
    set({ socket: null });
  },
}));