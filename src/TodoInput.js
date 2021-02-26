import React from "react";

const TodoInput = ({ newItem, handleSubmit, setName }) => {
  return (
    <div>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            className="todo"
            placeholder="add an item"
            onChange={(e) => setName(e.target.value)}
            newItem={newItem}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default TodoInput;
