import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import { Context } from '../Context';


export default function AuthPage() {

    const {
        // onStart,
        studentEmail,
        studentName,
        studentObject, setStudentObject,
        setStudentEmail,
        setStudentName,
        uploadAndNavigate,
    } = useContext(Context);

    // const [fields, setFields] = useState({ name: "", email: "" })
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidName, setIsValidName] = useState(true);


    function isInputLetter(evt) {
        let ch = String.fromCharCode(evt.which);
        if (!(/[a-zA-Z]/.test(ch) || evt.keyCode === 8)) {
            evt.preventDefault();
        }
    }


    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;


    const onStart = async (studentName, studentEmail) => {
        !studentName? setIsValidName(false):setIsValidName(true)
        if (studentName && studentEmail) {
            if (!emailPattern.test(studentEmail)) { setIsValidEmail(false) }
            else {
                // const student = {
                //     name: studentName,
                //     email: studentEmail
                // }
                setStudentObject({ ...studentObject, "name": studentName, "email": studentEmail })
                setIsValidEmail(true);
                // setStudentObject(studentObject.email = studentEmail)

                // console.log({ student });
                // await addDoc(studentsRef, student);
                // // getStudents();

                // console.log({ studentObject });
                // navigate('/start')
                uploadAndNavigate();
            }
        }
        else {
            setIsValidEmail(false);

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
                        inputProps={{ style: { textTransform: 'capitalize' } }}
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        helperText={!studentName ? "Name is required" : "Please enter your Name"}
                        error={!isValidName}

                    />
                    <TextField
                        label='Email'
                        type='email'
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        helperText={!studentEmail ? "Email is required" : "Invalid Email"}
                        error={!isValidEmail}
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
