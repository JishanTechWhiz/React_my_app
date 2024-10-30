// AddItem.js
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const AddItem = ({ showModal, handleClose, addTodo }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && desc) {
      addTodo({ title, desc });
      setTitle(''); // Reset title
      setDesc(''); // Reset description
      handleClose(); // Close the modal
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter todo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter todo description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Todo
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddItem;
