import React from 'react'
import { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import listApi from '../../api/list'

const UpdateWrapper = ({ listName, listId, listCategory, onHide, onClick }) => {

    const userId = localStorage.getItem("USER_ID");
    const [list, setList] = useState({ userId: userId, listId: listId, listName: listName, listCategory: listCategory })

    const updateList = (event) => {
        event.preventDefault();
        listApi
            .put(`/toDoList/update`, {
                userId: list.userId,
                listId: list.listId,
                listName: list.listName,
                listCategory: list.listCategory,
            })
            .then((res) => {
                if (res.data.data) {
                    setList(res.data.data);
                    console.log(res.data.data);
                    onHide();
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
            <Modal show onHide={onHide} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Update List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Update list</Form.Label>
                        <Form.Control type='text' value={list.listName} onChange={(e) => {
                            setList({...list, listName: e.target.value});
                        }} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='outline-primary' onClick={(event) => updateList(event) }>Update</Button>
                    <Button variant='outline-danger' onClick={onClick}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateWrapper