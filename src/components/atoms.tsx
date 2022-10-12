import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  "TO_DO" = "TO_DO",
  "IN_PROGRESS" = "IN_PROGRESS",
  "DONE" = "DONE",
}
export interface ToDos {
  id: number;
  text: string;
  category: string;
}

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: [Categories.TO_DO, Categories.IN_PROGRESS, Categories.DONE],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<string>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<ToDos[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
