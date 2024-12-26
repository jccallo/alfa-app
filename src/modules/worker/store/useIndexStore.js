import { create } from 'zustand'
import { WorkerInterface } from '../../../interfaces'

export const useIndexStore = create((set) => ({
   // states
   currentWorkerId : 0,
   workerState     : WorkerInterface,
   occupationsState: [],
   worksitesState  : [],

     // setters
   setCurrentWorkerId: (id) => set({ currentWorkerId: id }),
   setWorkerState    : (worker) => set({ workerState: worker }),
   setOcupationsState: (occupations) => set({ occupationsState: occupations }),
   setWorksitesState : (worksites) => set({ worksitesState: worksites }),

     // resets
   resetState: () => set({ currentWorkerId: 0, workerState: WorkerInterface, occupationsState: [], worksitesState: [] }),
}))
