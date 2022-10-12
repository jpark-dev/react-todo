import { atom, selector } from "recoil";

export interface ToDos {
  id: number;
  text: string;
  category: "TO_DO" | "IN_PROGRESS" | "DONE";
}

export const toDoState = atom<ToDos[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter((toDo) => toDo.category === "TO_DO"),
      toDos.filter((toDo) => toDo.category === "IN_PROGRESS"),
      toDos.filter((toDo) => toDo.category === "DONE"),
    ];
  },
});
