import { useState } from "react";

export default function Player() {
  const [name, setName] = useState("");
  const [prevName, setPrevName] = useState("unknown entity");

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleClick() {
    const curName = name;
    setPrevName(curName);
  }

  return (
    <section id="player">
      <h2>Welcome {prevName}</h2>
      <p>
        <input type="text" onChange={handleChange} value={name} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
