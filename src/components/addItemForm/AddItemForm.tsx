import React from 'react';
import IconButton from '@mui/material/IconButton';
import {TextField} from "@mui/material";
import {AddCircleOutline} from '@mui/icons-material';
import {useAddItemForm} from "../../hooks/useAddItemForm";

export type AddItemFormProps = {
    callBack: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormProps> = React.memo((props) => {
        let {callBack,...rest} = props

        const {
            newTask,
            onChangeHandler,
            error,
            onKeyDownHandler,
            addTaskHandler
        } = useAddItemForm(callBack)

        return (
            <div>
                <TextField
                    size={"small"}
                    label={'Type value'}
                    value={newTask}
                    onChange={onChangeHandler}
                    error={!!error}
                    onKeyDown={onKeyDownHandler}
                    helperText={error}
                />
                <IconButton
                    color={"primary"}
                    size={'medium'}
                    onClick={addTaskHandler}
                ><AddCircleOutline/></IconButton>
                {/*{error && <div className={s.errorText}>{'Text is not valid'}</div>}*/}
            </div>
        );
    }
)
