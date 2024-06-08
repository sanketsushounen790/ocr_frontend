import { create } from 'zustand'

const useImageStore = create((set) => ({
  imageUrl: "",
  setImageUrl: (newImageUrl) => set((state) => ({imageUrl: newImageUrl })),
  clear: () => set({ imageUrl: "" }),
  language: "en",
  setLanguage: (value)=> set((state) => ({language: value}))
}))

export default useImageStore