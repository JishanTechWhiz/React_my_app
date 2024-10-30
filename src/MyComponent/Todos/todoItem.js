// TodoItem.js
import React from 'react';
import { Button } from 'react-bootstrap';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  return (
    <tr>
      <td>{todo.sno}</td>
      <td>{todo.title}</td>
      <td>{todo.desc}</td>
      <td>
        <Button variant="primary" size="sm" className="me-2" onClick={() => onUpdate(todo)}>Update</Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(todo.sno)}>Delete</Button>
      </td>
    </tr>
  );
};

export default TodoItem;
