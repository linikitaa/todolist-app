import {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {TaskStatuses} from "../api/todolistss-api";

type SuperCheckboxProps = {
    callback:(status:TaskStatuses)=>void
}
export const SuperCheckbox = (props:SuperCheckboxProps) => {

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.callback(+e.currentTarget.checked)
    }

    return (
            <Checkbox
                size={'small'}
                onChange={onChangeHandler}

            />
    );
};

