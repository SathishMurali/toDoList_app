import React, { useContext } from 'react'
import { Button, Form, Card, Image } from 'react-bootstrap'
import CredentialsWrapper from './wrapper/CredentialsWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { faAt, faKey, faPersonWalkingArrowRight } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../context/UserContext'
import { useState } from 'react'

import listApi from '../api/list';

const LoginComponent = () => {
    const navigate = useNavigate();
    const { setLoggedInUser } = useContext(UserContext);
    const [login, setLogin] = useState({ userEmail: "", password: "" });

    const loginApi = (event) => {
        event.preventDefault();

        listApi
            .post(`/auth/login`, {
                userEmail: login.userEmail,
                password: login.password,
            })
            .then((res) => {
                if (res.data.data) {
                    // console.log(res.data.data);
                    localStorage.setItem("ISLOGGEDIN", true);
                    const isLogged = Boolean(localStorage.getItem("ISLOGGEDIN"));
                    let loggedInUser = res.data.data;
                    loggedInUser.isLoggedIn = isLogged;
                    localStorage.setItem("USERNAME", JSON.stringify(loggedInUser.firstName));
                    localStorage.setItem("USER_ID", JSON.stringify(loggedInUser.userId));
                    setLoggedInUser(loggedInUser);
                    navigate('/');
                } else if (res.data.error) {
                    console.log(res.data.error.message);
                } else {
                    console.log("Something went wrong");
                }
            })
            .catch((error) => {
                console.log(`Error -> ${error} `);
            });
    }
    return (
        <div>
            <Image src={require('../assets/images/TodoList.jpg')} className='w-100 h-100' style={{ position: "absolute", top: "0px", left: "0px" }} />
            <div className='w-75 mx-auto mt-5'>
                <Card className='w-sm-75 w-md-50 mx-auto border-warning shadow' bg='transparent' style={{ backdropFilter: "blur(15px)", WebkitBackdropFilter: "blur(15px)" }}>
                    <Form>
                        <Form.Group>
                            <h2 className='p-3 text-center'>Sign In</h2>
                            <div className='pb-4'>
                                <CredentialsWrapper
                                    cp1='w-75 m-auto pb-4'
                                    cp2='bg-transparent border-top-0 border-bottom-0 border-start-0 border-end-0'
                                    cp3='border-top-0 border-start-0 border-end-0 shadow-none border-dark bg-transparent'
                                    icon={faAt}
                                    placeholder='Email'
                                    type='email'
                                    value={login.userEmail}
                                    onChange={(event) => {
                                        setLogin({ ...login, userEmail: event.target.value });
                                    }}
                                />
                                <CredentialsWrapper
                                    cp1='w-75 m-auto pb-4'
                                    cp2='bg-transparent border-top-0 border-bottom-0 border-start-0 border-end-0'
                                    cp3='border-top-0 border-start-0 border-end-0 shadow-none border-dark bg-transparent'
                                    icon={faKey}
                                    placeholder='Password'
                                    type='password'
                                    value={login.password}
                                    onChange={(event) => {
                                        setLogin({ ...login, password: event.target.value });
                                    }}
                                />
                                <p className='fs-6 text-silver text-muted text-center'>Don't have an account? <Link to='/register' className='text-warning text-decoration-none'>Sign Up</Link></p>

                                <div className='text-center'>
                                    <Button className='rounded-pill p-2' variant='warning' onClick={(event) => loginApi(event)}> <FontAwesomeIcon icon={faPersonWalkingArrowRight} /> Login</Button>
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default LoginComponent