import React, { useState } from 'react'
import { Button, Card, InputGroup, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'
import listApi from '../api/list'
import BackgroundImage from '../assets/images/TodoList.jpg'
import Popup from './Popup'
import NavbarWrapper from './wrapper/Navbar'
import UpdateWrapper from './wrapper/UpdateWrapper'

const HomeComponent = () => {
    const [lists, setLists] = useState([]);
    const userId = localStorage.getItem("USER_ID");
    const [update, setUpdate] = useState({ listId: "", listName: "" });

    const [buttonOne, setButtonOne] = useState(false);
    const [buttonTwo, setButtonTwo] = useState(false);
    const [updateButtonOne, setUpdateButtonOne] = useState(false);
    const [updateButtonTwo, setUpdateButtonTwo] = useState(false);

    const updateButtonOneClose = () => setUpdateButtonOne(false);
    const updateButtonTwoClose = () => setUpdateButtonTwo(false);

    const buttonOneClose = () => setButtonOne(false);
    const buttonTwoClose = () => setButtonTwo(false);

    const handleSubmit = (event, index) => {
        console.log(index);
        console.log(event.target.checked);
    }

    useEffect(() => {
        listApi
            .get(`/toDoList/list/${userId}`)
            .then((res) => {
                if (res.data.data) {
                    setLists(res.data.data);
                } else if (res.data.error) {
                    console.log(res.data.error.message);
                } else {
                    console.log("Something went wrong");
                }
            })
            .catch((error) => {
                console.log(`Error -> ${error}`);
            })
    }, [userId]);

    const deleteList = (event, id) => {
        event.preventDefault();
        listApi
            .delete(`/toDoList/delete/${id}`)
            .then((res) => {
                if (res.data.data) {
                    console.log(res.data.data);
                } else if (res.data.error) {
                    console.log(res.data.error.message);
                } else {
                    console.log("Something went wrong");
                }
            })
            .catch((error) => {
                console.log(`Error -> ${error}`);
            });
    }

    return (
        <div style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover", minHeight: "850px" }}>
            <NavbarWrapper />
            <div className='d-flex justify-content-center'>
                <Button onClick={() => { setButtonOne(true) }} className='rounded-pill m-3' variant='outline-secondary' style={{ backdropFilter: "blur(15px)", WebkitBackdropFilter: "blur(15px)" }}><FontAwesomeIcon icon={faPlus} /> Add New List</Button>
                <Button onClick={() => { setButtonTwo(true) }} className='rounded-pill m-3' variant='outline-secondary' style={{ backdropFilter: "blur(15px)", WebkitBackdropFilter: "blur(15px)" }}><FontAwesomeIcon icon={faPlus} /> Add New Checklist</Button>
                {/* <h3>{localStorage.getItem("LOGGED_IN")}</h3> */}

                {buttonOne === true && <Popup show={buttonOne} handleClose={buttonOneClose} listCategory='List' listTitle='Add New List' listLabel='Add list' />}
                {buttonTwo === true && <Popup show={buttonTwo} handleClose={buttonTwoClose} listCategory='Checklist' listTitle='Add New Checklist' listLabel='Add checklist' />}
            </div>
            <Row className='w-100' xs={1} md={2}>
                <Col>
                    <div className='m-4 border rounded' style={{ backdropFilter: "blur(15px)", WebkitBackdropFilter: "blur(15px)" }}>
                        <h3 className='text-center m-3'>List</h3>
                        {lists
                            .filter(list => list.listCategory === 'List').length > 0 ?
                            lists
                                .filter(list => list.listCategory === 'List')
                                .map((list, index) => {
                                    return (
                                        <Card bg='light' className='m-3 shadow'>
                                            <p key={index} className='m-3 d-flex'>
                                                {list.listName}
                                                <div className='ms-auto'>
                                                    <Button variant='outline-danger' onClick={(event) => deleteList(event, list.listId)}><FontAwesomeIcon className='' icon={faTrashCan} /></Button>
                                                    <Button variant='outline-secondary' onClick={() => { setUpdate({ listId: list.listId, listName: list.listName }); setUpdateButtonOne(true) }}><FontAwesomeIcon className='' icon={faEdit} /></Button>

                                                    {updateButtonOne && <UpdateWrapper onClick={updateButtonOneClose} onHide={updateButtonOneClose} listId={update.listId} listName={update.listName} listCategory='List' />}
                                                </div>
                                            </p>
                                        </Card>
                                    )
                                })
                            : (<h3 className='text-center mt-5 text-secondary' >No list to show</h3>)
                        }
                    </div>
                </Col>
                <Col>
                    <div className='m-4 border rounded' style={{ backdropFilter: "blur(15px)", WebkitBackdropFilter: "blur(15px)" }}>
                        <h3 className='text-center m-3'>Checklist</h3>
                        {lists
                            .filter(list => list.listCategory === 'Checklist').length > 0 ?
                            lists
                                .filter(list => list.listCategory === 'Checklist')
                                .map((list, index) => {
                                    return (
                                        <Card bg='light' className='m-3 shadow'>
                                            <InputGroup.Checkbox className='bg-warning shadow-none border-0' onChange={(event) => handleSubmit(event, index)} />
                                            <p key={index} className='m-3 d-flex'>
                                                {list.listName}
                                                <div className='ms-auto'>
                                                    <Button variant='outline-danger' onClick={(event) => deleteList(event, list.listId)}><FontAwesomeIcon icon={faTrashCan} /></Button>
                                                    <Button variant='outline-secondary' onClick={() => { setUpdate({ listId: list.listId, listName: list.listName }); setUpdateButtonTwo(true) }} ><FontAwesomeIcon className='' icon={faEdit} /></Button>

                                                    {updateButtonTwo && <UpdateWrapper onClick={updateButtonTwoClose} onHide={updateButtonTwoClose} listId={update.listId} listName={update.listName} listCategory='Checklist' />}
                                                </div>
                                            </p>
                                        </Card>
                                    )
                                })
                            : (<h3 className='text-center mt-5 text-secondary' >No checklist to show</h3>)
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HomeComponent