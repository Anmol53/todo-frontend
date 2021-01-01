import React, { useState, useEffect } from "react";
import Task from "./Task";

export default function Todos(props) {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const serverURL = "http://localhost:9999/todo/";
  // Add Item to List
  const add = () => {
    if (newTask !== "") {
      fetch(serverURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((result) => {
          const temp = [...tasks];
          temp.push(result.task);
          setTasks(temp);
          setNewTask("");
        });
    }
  };

  // Delete ith item from List
  const deleteItem = (i) => {
    const id = tasks[i]._id;
    fetch(`${serverURL}${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.text())
      .then((result) => {
        const temp = [...tasks];
        temp.splice(i, 1);
        setTasks(temp);
      });
  };

  // Edit ith item to updatedText.
  const editItem = (i, updatedText) => {
    const id = tasks[i]._id;
    fetch(`${serverURL}${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: updatedText }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...tasks];
        temp[i] = result.task;
        setTasks(temp);
      });
  };

  // Toggle Completion of ith item.
  const toggleCompletion = (i) => {
    const id = tasks[i]._id;
    fetch(`${serverURL}${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone: !tasks[i].isDone }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        const temp = [...tasks];
        temp[i] = result.task;
        setTasks(temp);
      });
  };

  //Keep Track of new task input
  const updateNewTask = ({ target }) => {
    setNewTask(target.value);
  };

  useEffect(() => {
    fetch(serverURL, { credentials: "include" })
      .then((response) => response.json())
      .then((res) => {
        const sortedArr = res.todos.sort((a, b) => {
          const aDate = new Date(a.creationTime).valueOf();
          const bDate = new Date(b.creationTime).valueOf();
          return aDate - bDate;
        });
        setTasks(sortedArr);
      });
  }, []);

  return (
    <>
      <h1 className="heading">{`${props.user.user_name}'s To Do List`}</h1>
      {
        <ul className="list-enclosure">
          {tasks.map((val, index) => {
            return (
              <Task
                key={`${val._id}_${val.__v}`}
                text={val.task}
                index={index}
                isDone={val.isDone}
                toggleCompletion={toggleCompletion}
                deleteCallback={deleteItem}
                editCallback={editItem}
              />
            );
          })}
        </ul>
      }
      <div className="new-todo">
        <input
          type="text"
          id="task"
          onChange={updateNewTask}
          placeholder="Enter new item here"
          autoComplete="off"
          autoFocus
          value={newTask}
        />
        <button id="btn" onClick={add}>
          Add
        </button>
      </div>
    </>
  );
}
