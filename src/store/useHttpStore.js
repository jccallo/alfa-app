import { create } from 'zustand'

export const useHttpStore = create((set) => ({
   isFetching: false,
   startFetching: () => set({ isFetching: true }),
   stopFetching: () => set({ isFetching: false }),
}))

// const { count, increment, decrement, reset } = useCounterStore();
