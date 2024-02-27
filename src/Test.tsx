import { useTestQuery } from "./store/api/authentication/authApiSlice";

const Test = () => {
  const { data: test } = useTestQuery("test");

  console.log(test);

  return (
    <div>
      <p>hello</p>
    </div>
  );
};

export default Test;
