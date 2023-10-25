import React, { useState, useRef, useEffect, useContext } from 'react'

import { Context } from '../Context';
export default function CountDownTimer() {
    const { onFinish } = useContext(Context)

    const [countnDown, setCountDown] = useState(3600);
    const timerId = useRef();
    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60)

        if (minutes <= 0) {
            minutes = '0' + minutes;
        }
        if (seconds <= 0) {
            seconds = '0' + seconds
        }

        return minutes + ':' + seconds
    }


    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountDown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [])

    useEffect(() => {
        if (countnDown <= 0) {
            onFinish();
            clearInterval(timerId.current);

        }
    }, [countnDown])

    return (
        <h2>Count Down: {formatTime(countnDown)} </h2>
    )
}
