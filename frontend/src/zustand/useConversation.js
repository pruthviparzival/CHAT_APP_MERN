import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  searchedConversations: [],
  setSearchedConversations: (searchedConversations) =>
    set({ searchedConversations }),
}));

export default useConversation;
