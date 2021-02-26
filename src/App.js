import React, { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoItem from "./TodoItem";
import Alert from "./Alert";
import Loading from "./Loading";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [editID, setEditID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg: " ",
    type: "",
  });
  const [loading, setLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      // display alert
      showAlert(true, "danger", "please enter a value");
    } else if (name && isEditing) {
      //   deal w ith edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      //   show alert
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "clear list");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <div>
      <section className="main-container">
        <h3>todo app</h3>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <div className="flex">
          <TodoInput
            handleSubmit={handleSubmit}
            setName={setName}
            value={name}
            setList={setList}
            list={list}
          />
          <button type="button" className="submit-btn" onClick={handleSubmit}>
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
        <TodoList />
        <TodoItem
          items={list}
          setList={setList}
          removeItem={removeItem}
          editItem={editItem}
        />
        <button type="button" className="clear-btn" onClick={clearList}>
          clear list
        </button>
      </section>
    </div>
  );
}

export default App;
