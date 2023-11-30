import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Message from './components/layout/Message'
import Container from './components/layout/Container'

import Home from './components/pages/Home'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Profile from './components/pages/User/Profile'
import MyStudents from './components/pages/Student/MyStudents'
import RegisterStudents from './components/pages/Student/RegisterStudents'
import CareStudent from './components/pages/care/CareStudent'
import RecordFull from './components/pages/Record/RecordFull'
import RegisterRecords from './components/pages/Record/RegisterRecords'
import DetailsRecords from './components/pages/Record/DetailsRecords'
import EditStudents from './components/pages/Student/EditStudents'
import TeacherRecords from './components/pages/Teacher/TeacherRecords'
import RegisterTeacherRecords from './components/pages/Teacher/RegisterTeacherRecords'
import DetailsRegisterTeacherRecords from './components/pages/Teacher/DetailsRegisterTeacherRecords'
import GroupRecords from './components/pages/Group/GroupRecords'
import RegisterGroupRecords from './components/pages/Group/RegisterGroupRecords'
import DetailsGroupRecords from './components/pages/Group/DetailsGroupRecords'
import ResponsibleRecords from './components/pages/Responsible/ResponsibleRecords'
import RegisterResponsibleRecords from './components/pages/Responsible/RegisterResponsibleRecords'
import DetailsResponsibleRecords from './components/pages/Responsible/DetailsResponsibleRecords'
import StudentsStatistics from './components/pages/Student/StudentsStatistics'

import { UserProvider } from './context/UserContext'
function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/user/profile" element={<Profile />}/>
            <Route path="/student/all" element={<MyStudents />}/>
            <Route path="/student/create" element={<RegisterStudents />}/>
            <Route path="/student/treatment/:id" element={<CareStudent />}/>
            <Route path="/student/statistics" element={<StudentsStatistics />}/>
            <Route path="/record/create/:id" element={<RegisterRecords />}/>
            <Route path="/edit/treatment/:id" element={<DetailsRecords />}/>
            <Route path="/student/:id" element={<EditStudents />}/>
            <Route path="/student/:id/full" element={<RecordFull />}/>
            <Route path="/teacher/all" element={<TeacherRecords />}/>
            <Route path="/teacher/create" element={<RegisterTeacherRecords />}/>
            <Route path="/teacher/:id" element={<DetailsRegisterTeacherRecords />}/>
            <Route path="/group/all" element={<GroupRecords />}/>
            <Route path="/group/create" element={<RegisterGroupRecords />}/>
            <Route path="/group/:id" element={<DetailsGroupRecords />}/>
            <Route path="/responsible/treatment/:id" element={<ResponsibleRecords />}/>
            <Route path="/responsible/create/:id" element={<RegisterResponsibleRecords />}/>
            <Route path="/responsible/:id" element={<DetailsResponsibleRecords />}/>
            <Route path="/" element={<Home />}/>
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  )
}

export default App
