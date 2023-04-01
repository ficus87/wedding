import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ConfirmInvitation, ContactUs, Homepage, LeaveAMessage, NotFound, WeddingBlog, Where } from './pages'

const Content = () => {
    return (
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/blog' element={<WeddingBlog />} />
            <Route path='/invitation' element={<ConfirmInvitation />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/message' element={<LeaveAMessage />} />
            <Route path='/where' element={<Where />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Content