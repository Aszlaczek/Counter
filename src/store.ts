import { create } from "zustand";
import type { User } from "./type";

type UserStore = {
    user: User,
    addUser: Function,
    editUser: Function
}

export const useUserStore = create<UserStore>((createState) => ({
    user: { name: '', surname: '', hours: '', date: '' },
    addUser: (state: User) => ({ user: state }),
    editUser: (option: string, state: string) => ({ user: { ...createState, [option]: state } }),
}))

type HoursStore = {
    min: number,
    hours: number,
    allHours: string,
    setMin: (minutes: number) => void,
    convert: () => void
}

export const useHoursStore = create<HoursStore>((set, get) => ({
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
