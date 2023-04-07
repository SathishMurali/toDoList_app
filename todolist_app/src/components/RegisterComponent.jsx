import React, { useState } from 'react'
import { Button, Form, Card, Image } from 'react-bootstrap'
import CredentialsWrapper from './wrapper/CredentialsWrapper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faKey, faPersonWalkingArrowRight, faA, faZ } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import listApi from '../api/list'

const RegisterComponent = () => {
    // const [error, setError] = useState('d-none');
    // const validFirstName = new RegExp('[a-z]{3,}');
    // const validlastName = new RegExp('[a-z]{3,}');
    const navigate = useNavigate();
    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        userEmail: "",
        password: "",
    });
    const registerApi = (event) => {
        event.preventDefault();

        listApi
            .post(`/auth/register`, {
                firstName: register.firstName,
                lastName: register.lastName,
                userEmail: register.userEmail,
                password: register.password,
            })
            .then((res) => {
                if (res.data.data) {
                    console.log(res.data.data);
                    navigate('/login')
                } else if (res.data.error) {
                    console.log(res.data.error.message);
                } else {
                    console.log("Something went wrong");
                }
            })
            .catch((error) => {
                console.log(`Error -> ${error}`);
            })
    }
    return (
        <div>
            <Image src={require('../assets/images/TodoList.jpg')} className='w-100 h-100' style={{ position: "absolute", top: "0px", left: "0px" }} />
            <div className='w-75 mx-auto mt-5'>
                <Card className='w-sm-75 w-md-50 mx-auto border-warning shadow' bg='transparent' style={{ backdropFilter: "blur(15px)", WebkitBackdropFilter: "blur(15px)" }}>
                    <Form>
                        <Form.Group>
                            <h2 className='p-3 text-center'>Sign Up</h2>
                            <div className='pb-4'>
                                <CredentialsWrapper
                                    cp1='w-75 m-auto pb-4'
                                    cp2='bg-transparent border-0'
                                    cp3='border-top-0 border-start-0 border-end-0 shadow-none border-dark bg-transparent'
                                    icon={faA}
                                    placeholder='First Name'
                                    type='text'
                                    value={register.firstName}
                                    onChange={(event) => {
                                        // console.log(register.firstName.length);
                                        setRegister({ ...register, firstName: event.target.value });
                                    }}
                                />
                                <CredentialsWrapper
                                    cp1='w-75 m-auto pb-4'
                                    cp2='bg-transparent border-0'
                                    cp3='border-top-0 border-start-0 border-end-0 shadow-none border-dark bg-transparent'
                                    icon={faZ}
                                    placeholder='Last Name'
                                    type='text'
                                    value={register.lastName}
                                    onChange={(event) => {
                                        setRegister({ ...register, lastName: event.target.value });
                                    }}
                                />
                                <CredentialsWrapper
                                    cp1='w-75 m-auto pb-4'
                                    cp2='bg-transparent border-0'
                                    cp3='border-top-0 border-start-0 border-end-0 shadow-none border-dark bg-transparent'
                                    icon={faAt}
                                    placeholder='Email'
                                    type='email'
                                    value={register.userEmail}
                                    onChange={(event) => {
                                        setRegister({ ...register, userEmail: event.target.value });
                                    }}
                                />
                                <CredentialsWrapper
                                    cp1='w-75 m-auto pb-4'
                                    cp2='bg-transparent border-0'
                                    cp3='border-top-0 border-start-0 border-end-0 shadow-none border-dark bg-transparent'
                                    icon={faKey}
                                    placeholder='Password'
                                    type='password'
                                    value={register.password}
                                    onChange={(event) => {
                                        setRegister({ ...register, password: event.target.value });
                                    }}
                                />
                                <CredentialsWrapper
                                    cp1='w-75 m-auto pb-4'
                                    cp2='bg-transparent border-0'
                                    cp3='border-top-0 border-start-0 border-end-0 shadow-none border-dark bg-transparent'
                                    icon={faKey}
                                    placeholder='Confirm Password'
                                    type='password'
                                />
                                <p className='fs-6 text-silver text-muted text-center'>Already have an account? <Link to='/login' className='text-warning text-decoration-none'>Sign in</Link></p>

                                <div className='text-center'>
                                    <Button type='submit' className='rounded-pill p-2' variant='warning' onClick={(event) => registerApi(event)}> <FontAwesomeIcon icon={faPersonWalkingArrowRight} /> Register</Button>
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default RegisterComponent