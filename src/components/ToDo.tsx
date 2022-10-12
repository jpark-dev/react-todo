import { ToDos } from "./atoms";

function ToDo({ text }: ToDos) {
  return (
    <li>
      <span>{text}</span>
      <button>TO DO</button>
      <button>IN PROGRESS</button>
      <button>DONE</button>
    </li>
  );
}

export default ToDo;
