import React, { useContext } from 'react'
import { Context } from '../Context'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import { useNavigate } from 'react-router-dom';


export default function Start() {

    const { studentName } = useContext(Context);
    const navigate = useNavigate();

    const onBack = () => {
        navigate(-1);
    }

    return (
        <div> <h3> Are you sure you want to Start exam of React? {studentName[0].toUpperCase() +
            studentName.slice(1)}</h3>
            <Stack direction='row' spacing={2}>
                <Button variant='contained' onClick={() => onBack()}>Back</Button>
                <Button variant='contained' onClick={() => navigate('/exam-page')}>Yes</Button>
            </Stack>
        </div>
    )
}
