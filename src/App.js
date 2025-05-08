import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({ name: '', description: '', date: '', time: '' });
  const [errors, setErrors] = useState({});
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = { ...form };
    const newErrors = {};
    Object.entries(requiredFields).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = 'Please fill this field';
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = form;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, form]);
    }

    setForm({ name: '', description: '', date: '', time: '' });
  };

  const handleEdit = (index) => {
    setForm(items[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = items.filter((_, i) => i !== index);
    setItems(filtered);
  };

  return (
    <div className='container pt-4 d-flex flex-column align-items-center'>
      <h2 className='mb-4 fw-bold'>Task Update Table</h2>
      <form onSubmit={handleSubmit} className='d-flex gap-5 flex-wrap justify-content-center'>
      

        <div className='input-field'>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          {errors.date && <span className='error-message'>{errors.date}</span>}
        </div>

        <div className='input-field'>
          <input
            name="name"
            placeholder="Tasks"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className='error-message'>{errors.name}</span>}
        </div>

        <div className='input-field'>
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          {errors.description && <span className='error-message'>{errors.description}</span>}
        </div>

        <div className='input-field'>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
          />
          {errors.time && <span className='error-message'>{errors.time}</span>}
        </div>


        <button type="submit" className='d-flex justify-content-center align-items-center text-white submit-button'>
          {editIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      <hr className='mw-100' />

      <table className='w-100'>
        <thead>
          <tr className='table-header'>
            <th>S.No</th>
            <th>Date</th>
            <th>Task</th>
            <th>Status</th>
            <th>Working Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No tasks yet.</td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={index} className='table-data'>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.name}</td>
                <td className='task-description'>{item.description}</td>
                <td>{item.time}</td>
                <td>
                  <span className='d-flex justify-content-between action-buttons'>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;