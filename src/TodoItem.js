import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TodoItem = ({ items, removeItem, editItem }) => {
  return (
    <section className="todo-container">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <li className="todo-item" key={id}>
            <h6 className="title">{title}</h6>
            <div className="todo-icon">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        );
      })}
    </section>
  );
};

export default TodoItem;
