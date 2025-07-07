import React, { useState } from "react";
import { TextField } from "@mui/material";
import { SaveTodoProps } from "../types/types";

const TodoForm = ({ saveTodo }: SaveTodoProps) => {
  const [value, setValue] = useState("");

  return (
    <form
      aria-label="Form"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        saveTodo(value);
        setValue("");
      }}
    >
      <TextField
        variant="outlined"
        margin="normal"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value)
        }}
        value={value}
      />
    </form>
  )
}

export default TodoForm;