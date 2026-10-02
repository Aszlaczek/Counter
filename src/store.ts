import { create } from "zustand";
import type { User } from "./type";

type UserStoreSchema = {
  user: User;
  editUser: (option: string, state: string) => void;
  removeInfo: () => void;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStoreSchema>((set, get) => ({
  user: { id: null, name: "", surname: "", hours: "", date: "" },
  editUser: (option, state) =>
    set({ user: { ...get().user, [option]: state } }),
  removeInfo: () =>
    set({ user: { id: null, name: "", surname: "", hours: "", date: "" } }),
  setUser: (user) => set({ user: user }),
}));

type HoursStoreSchema = {
  min: number;
  hours: number;
  allHours: string;
  setMin: (minutes: number) => void;
  convert: () => void;
};

export const useHoursStore = create<HoursStoreSchema>((set, get) => ({
  min: 0,
  hours: 0,
  setMin: (minutes: number) => set({ min: minutes }),
  convert: () => {
    const { min } = get();
    const hours = Math.floor(min / 60);
    const remainingMin = min % 60;
    const allHours = `${hours}h ${remainingMin}min`;
    set({ hours, allHours });
  },
  allHours: "",
}));

type UserListSchema = {
  list: User[];
  nextId: number;
  addToList: (user: User) => void;
  removeUser: (id: number) => void;
  getSpecificUser: (id: number) => User | undefined;
  setSpecificUser: (id: number, user: User) => void;
};

export const useUserListStore = create<UserListSchema>((set, get) => ({
  list: [],
  nextId: 0,
  addToList: (user) => {
    const id = get().nextId;
    set({
      list: [...get().list, { ...user, id }],
      nextId: id + 1,
    });
  },
  removeUser: (id) =>
    set({ list: [...get().list.filter((user) => user.id !== id)] }),
  getSpecificUser: (id) => {
    return get().list.find((user) => user.id === id);
  },
  setSpecificUser: (id, user) =>
    set({ list: get().list.map((e) => (e.id === id ? (e = user) : e)) }),
}));

type StateSchema = {
  isDone: boolean;
  setStateFalse: () => void;
  setStateTrue: () => void;
};

export const useStateStore = create<StateSchema>((set) => ({
  isDone: true,
  setStateFalse: () => set({ isDone: false }),
  setStateTrue: () => set({ isDone: true }),
}));

type EditFormSchema = {
  visible: boolean;
  show: () => void;
  hide: () => void;
};

export const usePopUpStore = create<EditFormSchema>((set) => ({
  visible: false,
  show: () => {
    set({ visible: true });
  },
  hide: () => set({ visible: false }),
}));
