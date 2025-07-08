import React, { useState } from "react";
import { Button, Checkbox, IconButton, ListItem, ListItemText, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import { TodoProps } from "../types/types";

function Todo({ el, completedTodo, deleteTodo, updateTodo }: TodoProps) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(el?.name);

    const handleUpdate = () => {
        setEditing(!editing);
        if (el && value) {
            updateTodo(el.id, value);
        }
    }

    return (
        <React.Fragment>
            { 
                editing ?
                    <div className="Todo">
                        <ListItem
                            secondaryAction={
                                <IconButton
                                    onClick={() => {
                                        setEditing(!editing);
                                        setValue(el?.name)
                                    }}
                                >
                                </IconButton>
                            }
                        >
                            <TextField
                                variant="filled"
                                id="EditTodo"
                                data-testid="EditTodo"
                                size="small"
                                type="text"
                                fullWidth
                                value={value || ''}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setValue(event.target.value)}
                                }
                            />
                        </ListItem>
                        <Button size="large" variant="contained" aria-label="editing" onClick={handleUpdate}>Save</Button>
                    </div>
                    :
                    <div className="Todo">
                        <ListItem>
                            <Checkbox
                                checked={el?.completed}
                                role="checkbox"
                                aria-label="checkbox"
                                tabIndex={-1}
                                disableRipple
                                icon={<CircleUnchecked />}
                                checkedIcon={<CircleCheckedFilled />}
                                onClick={() => completedTodo(el?.id, !el.completed)}
                            />
                            <ListItemText 
                                data-testid="list-item"
                                primary={el?.name}
                                style={el?.completed ? { textDecoration: "line-through" } : {}}
                                sx={{ fontSize: "20px", color: "#b58463", fontWeight: "500" }}
                                disableTypography
                            />
                        </ListItem>
                        <div className="Todo-button">
                            <ListItem
                                secondaryAction={
                                    <IconButton
                                        aria-label="Edit"
                                        onClick={() => {
                                            setEditing(!editing);
                                            setValue(el?.name)
                                        }}
                                    >
                                        <EditIcon fontSize="large" />
                                    </IconButton>
                                }
                            />
                            <ListItem
                                secondaryAction={
                                    <IconButton
                                        aria-label="Delete"
                                        onClick={() => {
                                            deleteTodo(el);
                                        }}
                                    >
                                        <DeleteIcon fontSize="large" />
                                    </IconButton>
                                }
                            />
                        </div>
                    </div>
            }
        </React.Fragment>
    )
}

export default Todo;