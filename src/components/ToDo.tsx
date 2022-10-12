import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, ToDos, toDoState } from "./atoms";

function ToDo({ text, category, id }: ToDos) {
  console.log("todo cat prop", category);
  const categories = useRecoilValue(categoriesState);
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {categories.map(
        (cat) =>
          cat !== category && (
            <button key={cat} name={cat} onClick={onClick}>
              {cat}
            </button>
          )
      )}
    </li>
  );
}

export default ToDo;
