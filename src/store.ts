import { create } from "zustand";
import type { User } from "./type";

type UserStoreSchema = {
    user: User,
    editUser: (option: string, state: string) => void,
    removeInfo: () => void,
}

export const useUserStore = create<UserStoreSchema>((set, get) => ({
    user: { name: '', surname: '', hours: '', date: '' },
    editUser: (option, state) => set({ user: { ...get().user, [option]: state } }),
    removeInfo: () => set({ user: { name: '', surname: '', hours: '', date: '' } })
}))

type HoursStoreSchema = {
    min: number,
    hours: number,
    allHours: string,
    setMin: (minutes: number) => void,
    convert: () => void
}

export const useHoursStore = create<HoursStoreSchema>((set, get) => ({
    min: 0,
    hours: 0,
    setMin: (minutes: number) =>
        set({ min: minutes }),
    convert: () => {
        const { min } = get();
        const hours = Math.floor(min / 60);
        const remainingMin = min % 60;
        const allHours = `${hours}h ${remainingMin}min`;
        set({ hours, allHours })
    },
    allHours: '',
}))

type UserListSchema = {
    list: User[],
    addToList: (user: User) => void,
    removeUser: (id: number) => void,
    getSpecificUser: (id: number) => void
}

export const useUserListStore = create<UserListSchema>((set, get) => ({
    list: [],
    addToList: (user) => set({ list: [user, ...get().list,] }),
    removeUser: (id) => set({ list: [...get().list.filter((_, i) => id !== i)] }),
    getSpecificUser: (id) => get().list[id]
}))

type StateSchema = {
    isDone: boolean,
    setStateFalse: () => void,
    setStateTrue: () => void
}

export const useStateStore = create<StateSchema>((set) => ({
    isDone: true,
    setStateFalse: () => set({ isDone: false }),
    setStateTrue: () => set({ isDone: true })
}))