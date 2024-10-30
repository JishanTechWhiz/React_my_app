import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import TodoItem from './Todos/todoItem'; // Import the TodoItem component
import AddItem from './Todos/addItem'; // Import the AddItem component
import UpdateTodo from './Todos/updateItem'; // Import the UpdateTodo component
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios'; // Import axios for sending emails
import { Navigate } from 'react-router-dom';

import { useAuth } from '../Auth/AuthContext'; // Import useAuth

export const Todos = () => {

  const [todoList, setTodoList] = useState([
    { sno: 1, title: 'Buy groceries', desc: 'Purchase vegetables, fruits, and milk' },
    { sno: 2, title: 'Attend meeting', desc: 'Project status update with the team' },
    { sno: 3, title: 'Workout', desc: 'Gym session for 1 hour' },
    { sno: 4, title: 'Read a book', desc: 'Read 20 pages of a book' },
    { sno: 5, title: 'Complete React project', desc: 'Finish the todo list feature' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false); // State for add modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for update modal
  const [todoToDelete, setTodoToDelete] = useState(null); // State for the todo to be deleted
  const [todoToUpdate, setTodoToUpdate] = useState(null); // State for the todo to be updated
  const [email, setEmail] = useState(''); // State for email input

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/LoginPage" />; // Redirect to login if not authenticated
}

 

  const deleteTodo = () => {
    if (todoToDelete !== null) {
      const newTodoList = todoList.filter(todo => todo.sno !== todoToDelete);
      setTodoList(newTodoList);
      setTodoToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleShowDelete = (sno) => {
    setTodoToDelete(sno);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    setShowDeleteModal(false);
  };

  const addTodo = (newTodo) => {
    const sno = todoList.length ? todoList[todoList.length - 1].sno + 1 : 1; // Generate sno
    setTodoList([...todoList, { sno, ...newTodo }]);
    setShowAddModal(false);
  };

  const updateTodo = (sno, updatedTodo) => {
    const newTodoList = todoList.map(todo =>
      todo.sno === sno ? { ...todo, ...updatedTodo } : todo
    );
    setTodoList(newTodoList);
    setTodoToUpdate(null);
    setShowUpdateModal(false);
  };

  const handleShowUpdate = (todo) => {
    setTodoToUpdate(todo);
    setShowUpdateModal(true);
  };

  const handleCloseUpdate = () => {
    setShowUpdateModal(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Todo List', 14, 16); // Title

    const tableColumn = ['S.No', 'Title', 'Description']; // Table headers
    const tableRows = [];

    todoList.forEach(todo => {
      const todoData = [todo.sno, todo.title, todo.desc]; // Row data
      tableRows.push(todoData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // Start position
    });

    const pdfData = doc.output('datauristring'); // Get PDF data as base64
    return pdfData;
  };

  const sendEmail = async () => {
    const pdfData = generatePDF();

    try {
      const response = await axios.post('http://localhost:5000/email/send-pdf', {
        email: email,
        pdfData: pdfData.split(',')[1], // Extract only base64 part
      });

      alert(response.data);
      setEmail(''); // Clear email input after sending
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Todo List', 14, 16); // Title

    const tableColumn = ['S.No', 'Title', 'Description']; // Table headers
    const tableRows = [];

    todoList.forEach(todo => {
      const todoData = [todo.sno, todo.title, todo.desc]; // Row data
      tableRows.push(todoData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // Start position
    });

    doc.save('todo_list.pdf'); // Download PDF
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', marginTop: '20px' }}>My Todo List</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Button variant="success" size="sm" onClick={() => setShowAddModal(true)}>Add Todo</Button>
      </div>
      {todoList.length === 0 ? (
        <h3 style={{ textAlign: 'center' }}>No todo list found</h3>
      ) : (
        <>
        <Table striped bordered hover style={{ margin: 'auto', width: '60%' }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map(todo => (
              <TodoItem key={todo.sno} todo={todo} onDelete={handleShowDelete} onUpdate={handleShowUpdate} />
            ))}
          </tbody>
        </Table>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="info" onClick={handleDownloadPDF}>Download PDF</Button>
            <div style={{ marginTop: '10px' }}>
              <input
              className='myEmailInput'
                type="email"
                placeholder="Enter email to send PDF"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginRight: '10px'}}
              />
              <Button variant="info" onClick={sendEmail}>Send</Button>
            </div>
          </div>
        </>
      )}

      <AddItem showModal={showAddModal} handleClose={() => setShowAddModal(false)} addTodo={addTodo} />
      <UpdateTodo showModal={showUpdateModal} handleClose={handleCloseUpdate} todo={todoToUpdate} updateTodo={updateTodo} />

      {/* Confirmation Modal for Deletion */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this todo item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteTodo}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
