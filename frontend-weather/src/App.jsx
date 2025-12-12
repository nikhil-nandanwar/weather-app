import { useState } from "react";
import CityNameInput from "./components/CityNameInput";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=" bg-[#e3e0f3] min-h-screen py-8">
      <CityNameInput />
    </div>
  );
}

export default App;
