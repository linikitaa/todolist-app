import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanProps = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanProps) {
    let [editMode, setEditMode] = useState(false)
    let [newTitle, setNewTitle] = useState('')

    const activeEditMode = () => {
        setEditMode(true)
        setNewTitle(props.title)
    }

    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(newTitle)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (editMode
            ? <TextField
                variant={'standard'}
                value={newTitle}
                onBlur={activeViewMode}
                autoFocus
                onChange={onChangeTitleHandler}
            />
            : <span onDoubleClick={activeEditMode}>{props.title}</span>
    )
}

// ? <input value={newTitle}
//          onBlur={activeViewMode}
//          autoFocus
//          onChange={onChangeTitleHandler}
// />
// : <span onDoubleClick={activeEditMode}>{props.title}</span>