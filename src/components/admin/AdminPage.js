import React from 'react'
import StudentList from './StudentList'
import './adminPage.scss'

export default function AdminPage() {

  return (
    <div className='main'>

      <div className='studentList'>
        <StudentList />
      </div>
      <div className='content'></div>
    </div>
  )
}
