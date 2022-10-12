import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoriesState, categoryState } from "./atoms";

interface NewCategory {
  newCategory: string;
}

function AddCategory() {
  const setCategories = useSetRecoilState(categoriesState);
  const setCategory = useSetRecoilState(categoryState);
  const { register, handleSubmit } = useForm();
  const handleValid = ({ newCategory }: any) => {
    setCategories((prev) => [...prev, newCategory]);
    setCategory(newCategory);
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("newCategory", { required: "Please fill in." })}
        placeholder="Add a new Category"
      />
      <button>Add</button>
    </form>
  );
}

export default AddCategory;
