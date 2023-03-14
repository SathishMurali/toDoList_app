import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import listApi from '../api/list'

const Popup = ({ show, handleClose, listTitle, listLabel, listCategory }) => {

    const userId = localStorage.getItem("USER_ID");

    const [list, setList] = useState({ userId: userId, listName: "", listCategory: listCategory })

    const addList = (event) => {
        listApi
            .post(`/toDoList/add`, {
                userId: list.userId,
                listName: list.listName,
                listCategory: list.listCategory,
            })
            .then((res) => {
                if (res.data.data) {
                    console.log(res.data.data);
                    handleClose();
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
        <div>
            <Modal show={show} onHide={handleClose} backdrop='static' >
                <Modal.Header closeButton>
                    <Modal.Title>{listTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>{listLabel}</Form.Label>
                        <Form.Control className='shadow' type='text' placeholder='Enter list' value={list.listName} onChange={(event) => {
                            setList({ ...list, listName: event.target.value })
                        }} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='outline-warning' onClick={(event) => addList(event)}>Add</Button>
                    <Button variant='outline-danger' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal></div>
    )
}

export default Popup