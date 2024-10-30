// UpdateTodo.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateTodo = ({ showModal, handleClose, todo, updateTodo }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDesc(todo.desc);
    }
  }, [todo]);

  const handleUpdate = () => {
    const updatedTodo = { title, desc };
    updateTodo(todo.sno, updatedTodo);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </Form.Group>
          <Form.Group controlId="formDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter description" 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateTodo;
