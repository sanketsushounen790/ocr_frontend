import { create } from 'zustand'

const useImageStore = create((set) => ({
  imageUrl: "",
  setImageUrl: (newImageUrl) => set((state) => ({imageUrl: newImageUrl })),
  clear: () => set({ imageUrl: "" }),
}))

export default useImageStore