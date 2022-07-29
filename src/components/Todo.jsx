import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {todos.length &&
        todos.map((x, i) => (
          <div key={x.id}>
            <h2>{x.title}</h2>
            <div>isCompleted ? {x.isCompleted}</div>
          </div>
        ))}
    </div>
  );
};

export default Todo;
