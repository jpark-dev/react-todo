import { useForm } from "react-hook-form";

interface Form {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<Form>();
  const handleValid = (data: Form) => {
    console.log("add to do", data.toDo);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", { required: "Please fill in." })}
          placeholder="Create a ToDo"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
