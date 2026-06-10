import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useFriendStore = create((set) => ({
  searchResults: [],
  incomingRequests: [],
  friends: [],
  isSearching: false,
  isLoadingRequests: false,
  isLoadingFriends: false,

  searchUsers: async (query) => {
    if (!query || query.trim().length < 2) {
      set({ searchResults: [] });
      return;
    }
    set({ isSearching: true });
    try {
      const res = await axiosInstance.get(`/friends/search?query=${query}`);
      set({ searchResults: res.data });
    } catch (err) {
      toast.error(err.response?.data?.message || "Search failed");
    } finally {
      set({ isSearching: false });
    }
  },

  sendFriendRequest: async (receiverId) => {
    try {
      await axiosInstance.post(`/friends/send/${receiverId}`);
      toast.success("Friend request sent");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send request");
    }
  },

  getIncomingRequests: async () => {
    set({ isLoadingRequests: true });
    try {
      const res = await axiosInstance.get("/friends/incoming");
      set({ incomingRequests: res.data });
    } catch (err) {
      toast.error("Failed to load requests");
    } finally {
      set({ isLoadingRequests: false });
    }
  },

  respondToRequest: async (requestId, action) => {
    try {
      await axiosInstance.put(`/friends/respond/${requestId}`, { action });
      set((state) => ({
        incomingRequests: state.incomingRequests.filter((r) => r._id !== requestId),
      }));
      if (action === "accepted") toast.success("Request accepted");
      else toast.success("Request rejected");
    } catch (err) {
      toast.error("Failed to respond");
    }
  },

  getMyFriends: async () => {
    set({ isLoadingFriends: true });
    try {
      const res = await axiosInstance.get("/friends/friends");
      set({ friends: res.data });
    } catch (err) {
      toast.error("Failed to load friends");
    } finally {
      set({ isLoadingFriends: false });
    }
  },
}));