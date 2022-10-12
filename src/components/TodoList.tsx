import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface Form {
  toDo: string;
}

interface ToDos {
  id: number;
  text: string;
  category: "TO_DO" | "IN_PROGRESS" | "DONE";
}

const toDoState = atom<ToDos[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const [toDos, setTodos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<Form>();
  const handleValid = ({ toDo }: Form) => {
    console.log("add to do", toDo);
    setTodos((oldToDos) => [
      { id: Date.now(), text: toDo, category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", { required: "Please fill in." })}
          placeholder="Create a ToDo"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
