import React, { useContext, useRef, useState } from 'react'
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

    const inputRefs = useRef([]);

    const handleKeyDown = (e, index) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const nextIndex = index + 1;
            if (nextIndex < inputRefs.current.length) {
                inputRefs.current[nextIndex].focus();
            } else {
                inputRefs.current[0].focus(); // Focus on the first input field
            }
        }
    };
    const handleInputName = (e, index) => {
        // Handle input change logic here
        setStudentName(e.target.value)
    };

    const handleInputEmail = (e, index) => {
        // Handle input change logic here
        setStudentEmail(e.target.value)
    };

    const addInputRef = (ref, index) => {
        if (ref && !inputRefs.current.includes(ref)) {
            inputRefs.current.push(ref);
            if (index === inputRefs.current.length - 1) {
                ref.onkeydown = (e) => handleKeyDown(e, index);
            }
        }
    };



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


    const onSignIn = async (studentName, studentEmail) => {
        !studentName ? setIsValidName(false) : setIsValidName(true)
        if (studentName && studentEmail) {
            if (!emailPattern.test(studentEmail)) { setIsValidEmail(false) }
            else {
                setStudentObject({ ...studentObject, "name": studentName, "email": studentEmail })
                // console.log({ studentObject });
                setIsValidEmail(true);
               
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
                        inputRef={(ref) => addInputRef(ref, 0)}
                        label='Name'
                        autoCapitalize='true'
                        onKeyDown={isInputLetter}
                        inputProps={{ style: { textTransform: 'capitalize' } }}
                        required
                        value={studentName}
                        onChange={(e) => handleInputName(e, 0)}
                        helperText={!studentName ? "Name is required" : "Please enter your Name"}
                        error={!isValidName}

                    />
                    <TextField
                        inputRef={(ref) => addInputRef(ref, 1)}
                        label='Email'
                        type='email'
                        required
                        value={studentEmail}
                        onChange={(e) => handleInputEmail(e, 1)}
                        helperText={!studentEmail ? "Email is required" : "Invalid Email"}
                        error={!isValidEmail}
                    />

                </Stack>
                <Stack direction='row' marginTop='1rem' justifyContent='center'>
                    <Button
                        variant='contained'
                        size='medium'
                        color='primary'
                        onClick={() => onSignIn(studentName, studentEmail)}>Sign In</Button>
                </Stack>
            </Box>
        </div>
    )
}
