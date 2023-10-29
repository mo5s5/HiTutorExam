import { Button, TextField, Stack, Box } from '@mui/material'
import React, { useContext, useRef, useState } from 'react'
import { Context } from '../../Context';

export default function AdminLogin() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { navigate } = useContext(Context);

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
    const handleInputLogin = (e, index) => {
        // Handle input change logic here
        setLogin(e.target.value)
    };

    const handleInputPassword = (e, index) => {
        // Handle input change logic here
        setPassword(e.target.value)
    };

    const addInputRef = (ref, index) => {
        if (ref && !inputRefs.current.includes(ref)) {
            inputRefs.current.push(ref);
            if (index === inputRefs.current.length - 1) {
                ref.onkeydown = (e) => handleKeyDown(e, index);
            }
        }
    };
    //*** */

    const onLogin = () => {
        if (login === 'admin' && password === 'admin') {
            navigate('/admin-page')
        }
    }

    return (
        <div style={{marginLeft:300}}>
            <h2>Login as a teacher</h2>
            <Box
                sx={{
                    width: 600,
                    borderRadius: '5px',
                    border: '3px solid',
                    borderColor: '#32a1ce',
                    padding: '10px',

                }}>
                <Stack
                    spacing={2}
                    direction={'column'}>
                    <TextField
                        inputRef={(ref) => addInputRef(ref, 0)}
                        label='Login'
                        value={login}
                        onChange={(e) => handleInputLogin(e, 0)}
                        required></TextField>
                    <TextField
                        inputRef={(ref) => addInputRef(ref, 1)}
                        type='password'
                        label='Password'
                        value={password}
                        required
                        onChange={(e) => handleInputPassword(e, 1)}
                    ></TextField>

                </Stack>

                <Stack direction='row' marginTop='1rem' justifyContent='center'>
                    <Button
                        variant='contained'
                        size='medium'
                        color='primary'
                        onClick={() => onLogin()}
                    >Sign In</Button>
                </Stack>



            </Box>


        </div>
    )
}
