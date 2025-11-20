import { useState, useRef } from "react";

function ListInput({ handleAddButton }) {
  const [inputValue, setInputValue] = useState("starting vlaue");

  const contactRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    console.log(contactRef.current);
    const contactNumber = contactRef.current.value;

    handleAddButton({
      id: crypto.randomUUID(),
      name: inputValue,
      contactNumber,
    });
    setInputValue("");
  };
  const myInputStyles = {
    backgroundColor: "red",
    fontSize: "2rem",
  };

  return (
    <>
      {/* A controlled component is an input where React state controls the value, making React the single source of truth. */}
      {/* 
      Controlled Component:
      React fully manages the input’s value through state.
      Provides real-time validation, conditional UI updates, and predictable behavior.
      Every keystroke triggers state updates → component re-renders.
      Best choice when you need form validation, dynamic error messages, or tight UI control.
      */}
      <input
        // style={{
        //   backgroundColor: "red",
        //   fontSize: "2rem",
        // }}

        className="my-input"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your name"
      />

      {/*

      Uncontrolled Component

      This input uses `defaultValue`, so the browser (DOM) controls the text shown.
      There is NO onChange handler and NO state update.
      The component does NOT re-render on every keystroke.
  
      Limitations:
      Real-time error validation is not possible because React is not receiving updates.
      React does not know the value until we manually read it.

      Benefits:
      Better performance for large or complex forms.
      Using useRef gives direct access to the actual DOM element to read/update the value when needed.

      */}

      <input
        style={myInputStyles}
        id="contact"
        ref={contactRef}
        defaultValue={"00000"}
        placeholder="Enter your contact"
      />

      {/*
      Hybrid Input (Uncontrolled visually + Controlled logically)

      Uses `defaultValue`, so the browser controls the visible text.
      React does NOT control or update the displayed value.

      Still uses `onChange` to update React state.
      Component re-renders on every keystroke, even though React is not
      the source of truth for the input's value.

      Why this pattern is problematic:
      Two sources of truth (DOM shows the value, state stores a copy).
      Resetting state will NOT reset the input visually.
      Real-time validation becomes inconsistent or unreliable.

      When this pattern is acceptable:
      Rare cases where the DOM/input must fully control its own behavior
      (formatting, auto-correct, custom widgets), but you still want
      React to receive the value for side-effects or analytics.

      Summary:
      Technically an uncontrolled input, but with unnecessary re-renders.
      Avoid unless you have a specific reason to mix both behaviors.
  */}

      {/*  <input
        defaultValue={"abcdef"}
        onChange={handleInputChange}
        placeholder="Enter your contact"
      /> */}

      <button onClick={handleAddClick}>Add</button>
    </>
  );
}

export default ListInput;
