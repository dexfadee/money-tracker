import { create } from 'zustand'

const useRes = create((set) => ({
  res: '',
  changeRess: (res: string) => set(() => ({ res })),
}))

const useLoad = create((set) => ({
  load: { addTransaction: false, balance: false, incomeExpense: false, transactionList: false },
  changeLoad: (load: { addTransaction: boolean, balance: boolean, incomeExpense: boolean, transactionList: boolean }) => set(() => ({ load })),
}))

export default useRes;