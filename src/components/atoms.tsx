import { atom } from "recoil";

export interface ToDos {
  id: number;
  text: string;
  category: "TO_DO" | "IN_PROGRESS" | "DONE";
}

export const toDoState = atom<ToDos[]>({
  key: "toDo",
  default: [],
});
