import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const Category_Form = ({ onSubmit,}) => {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
    setAddSuccess(false); 
  };

  const handleCloseModal = () => setShowModal(false);

  const input_change = (e) => {
    setCategory(e.target.value);
  };

  const form_submit = (e) => {
    e.preventDefault();

    if (category) {
      onSubmit(category);
      setAddSuccess(true); 
    }
    setCategory('');
    setTimeout(() => {
      setShowModal(false);
    }, 500);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Add Category</Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={form_submit}>
            <input
              type="text"
              name="category"
              value={category}
              onChange={input_change}
              required
              class='mb-2'
            />
        <Button  type="submit">Add</Button>
          {addSuccess && <p className="mt-1">Added successfully!</p>}
        </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Category_Form;

