import { create } from 'zustand'

const useRes = create((set) => ({
  res: 0,
  changeRess: (res: number) => set(() => ({ res })),
}))

export default useRes;