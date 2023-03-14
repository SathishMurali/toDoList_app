import React from 'react'
import { Navbar, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faClipboard } from '@fortawesome/free-regular-svg-icons'

const NavbarWrapper = () => {
    const foundUser = JSON.parse(localStorage.getItem("USERNAME"));
    const navigate = useNavigate();

    return (
        <Navbar bg='warning' className='rounded-pill'>
            <Link to='/' className='ms-4'>
                <FontAwesomeIcon icon={faClipboard} size='2x' className='text-white fa-fade' />
            </Link>
            <div className='ms-auto me-3 d-flex'>
                <h5 className='me-3 mt-1'>Welcome, {foundUser}</h5>
                <Button onClick={() => { localStorage.removeItem("USERNAME"); localStorage.removeItem("USER_ID"); localStorage.removeItem("ISLOGGEDIN"); navigate('/login') }} className='rounded-pill' variant='outline-danger' title='Sign out'><FontAwesomeIcon icon={faPowerOff} className='fa-spin' /></Button>
            </div>
        </Navbar>
    )
}

export default NavbarWrapper