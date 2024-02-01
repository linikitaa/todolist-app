import React, {ChangeEvent} from 'react';
import Checkbox from "@mui/material/Checkbox";

type SuperCheckboxProps = {
    callback:(checked:boolean)=>void
    checked:boolean
}
export const SuperCheckbox = (props:SuperCheckboxProps) => {

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        props.callback(e.currentTarget.checked)
    }

    return (
            <Checkbox
                size={'small'}
                onChange={onChangeHandler}
                checked={props.checked}
            />
    );
};

