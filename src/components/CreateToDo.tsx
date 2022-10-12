import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "./atoms";

interface Form {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<Form>();
  const handleValid = ({ toDo }: Form) => {
    console.log("add to do", toDo);
    setToDos((oldToDos) => [
      { id: Date.now(), text: toDo, category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", { required: "Please fill in." })}
        placeholder="Create a ToDo"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
