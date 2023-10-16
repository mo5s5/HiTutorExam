import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import { Context } from '../Context';


export default function AuthPage() {

    const {
        onStart,
        studentEmail,
        studentName,
        setStudentEmail,
        setStudentName
    } = useContext(Context);


    function isInputLetter(evt) {
        let ch = String.fromCharCode(evt.which);
        if (!(/[a-zA-Z]/.test(ch) || evt.keyCode === 8)) {
            evt.preventDefault();
        }
    }

    return (
        <div >
            <Box sx={{
                width: 600,
                borderRadius: '5px',
                border: '3px solid',
                borderColor: '#32a1ce',
                padding: '10px',

            }
            }>
                <Stack direction='column' spacing={2} >
                    <TextField
                        label='Name'
                        autoCapitalize='true'
                        onKeyDown={isInputLetter}
                        inputProps={{style: {textTransform: 'capitalize'}}} 
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                    />
                    <TextField
                        label='Email'

                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                    />
                </Stack>
                <Stack direction='row' marginTop='1rem' justifyContent='center'>
                    <Button
                        variant='contained'
                        size='medium'
                        color='primary'
                        onClick={() => onStart(studentName, studentEmail)}>Sign In</Button>
                </Stack>
            </Box>
        </div>
    )
}
