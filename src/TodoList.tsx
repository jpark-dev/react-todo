import { useForm } from "react-hook-form";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(toDo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} placeholder="Create a ToDo" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setError(
        "password",
        { message: "Passwords are not the same" },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: "Check if you are online." });
    console.log("data", data);
  };

  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("firstName", {
            required: "required",
            validate: {
              noJason: (v) =>
                v.toLowerCase().includes("jason")
                  ? "jason is a reserved name"
                  : true,
              noAmy: (v) =>
                v.toLowerCase().includes("amy")
                  ? "amy is a reserved name"
                  : true,
            },
            minLength: 6,
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register("lastName", {
            required: true,
            minLength: {
              value: 6,
              message: "Your last name is too short.",
            },
          })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only Naver emails",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("password", { required: true, minLength: 10 })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("confirmPassword", {
            required: "Please confirm your password.",
          })}
          placeholder="Confirm Password"
        />
        <span>{errors?.confirmPassword?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
