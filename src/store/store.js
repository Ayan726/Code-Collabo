import { create } from "zustand";

const useClientStore = create((set) => ({
  clients: [],
  setClients: (clientList) => set({ clients: clientList }),
  removeClient: (socketId) =>
    set((state) => {
      const newClients = state.clients.filter(
        (client) => client.socketId !== socketId
      );
      return { clients: newClients };
    }),
}));

export default useClientStore;
