import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../Context'
import { getDocs } from 'firebase/firestore';

export default function StudentList() {

    const { studentsRef } = useContext(Context)
    const [studentList, setStudentList] = useState([])

    const getStudents = async () => {
        const querySnapshot = await getDocs(studentsRef);
        const studentsArray = [];
        querySnapshot.forEach(doc => {
            studentsArray.push(doc.data());
            setStudentList(studentsArray)
        })
    }
    useEffect(() => {
        getStudents()
    }, [])

    return (
        <div>
            {studentList.map((item) => (
                <p key={item.id}>{item.name}</p>
            ))}
        </div>
    )
}
