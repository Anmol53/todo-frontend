import React, { useState, Fragment } from "react";

export default function Task(props) {
  const [editable, setEditable] = useState(false);
  const [editedText, setNewText] = useState("");

  //Keep Track of edit task input
  const updateText = ({ target }) => {
    setNewText(target.value);
  };

  //Callback edittext & reset states if updated text is not empty.
  const editText = () => {
    if (editedText !== "") {
      props.editCallback(props.index, editedText);
      setEditable(false);
      setNewText("");
    }
  };

  return (
    <li>
      <button
        className={`btn left-circular-border ${props.isDone && "green"}`}
        onClick={() => {
          props.toggleCompletion(props.index);
        }}
      >
        <i className="fas fa-check"></i>
      </button>
      <p className={`task-text left-divider ${props.isDone && "done"}`}>
        {props.text}
      </p>
      {editable ? (
        <>
          <input
            type="text"
            onChange={updateText}
            placeholder="Edit item here"
            autoFocus
            autoComplete="off"
          />
          <button className="btn right-circular-border" onClick={editText}>
            Save
          </button>
        </>
      ) : (
        <>
          <button
            className="btn left-divider"
            onClick={() => setEditable(true)}
          >
            Edit
          </button>
          <button
            className="btn left-divider right-circular-border"
            onClick={() => props.deleteCallback(props.index)}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}
