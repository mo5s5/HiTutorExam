import React, { useState, useRef, useEffect, useContext } from 'react'

import { Context } from '../Context';
export default function CountDownTimer() {
    const { onFinish, countDown, setCountDown } = useContext(Context)


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

        //       checking the time difference
        // debugger
        let startTime = JSON.parse(localStorage.getItem('startTime'));
        // startTime = new Date().getTime()
        // console.log({ startTime });
        if (startTime === null) {
            startTime = new Date().getTime();
            localStorage.setItem('startTime', JSON.stringify(startTime))

            // setCountDown(3600)
        }
        else {
            // const currentTime = JSON.parse(JSON.stringify(new Date().toISOString()));
            const currentTime = new Date().getTime();
            // console.log({ currentTime });
            // console.log({ startTime });
            const difference = Math.floor((currentTime - startTime) / 1000);
            // console.log({ countDown });
            // console.log({ difference });
            let newTimer = Math.round(countDown - difference);
            setCountDown(newTimer);
        }


        timerId.current = setInterval(() => {
            setCountDown(prev => prev - 1)
        }, 1000)
        return () => {

            // localStorage.setItem('time', JSON.stringify(new Date()))
            clearInterval(timerId.current);
        }
    }, [])

    useEffect(() => {
        if (countDown <= 0) {
            onFinish();
            clearInterval(timerId.current);

        }
    }, [countDown])




    return (
        <h2>Count Down: {formatTime(countDown)} </h2>
    )
}
