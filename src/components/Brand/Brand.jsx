import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Helmet } from 'react-helmet';


export default function Brand({ item }) {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Helmet>
        <title>Brand</title>
      </Helmet>
      <div className="col-md-3">
        <Link onClick={handleShow}>
          <div className="box cursor-pointer border border-1 rounded-2 text-center">
            <img src={item.image} alt={item.name} className='w-75'/>
          </div>
        </Link>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton ></Modal.Header>
        <Modal.Body className='d-flex justify-content-between align-items-center'>
          <div className="title">
            <h1 className='text-main fw-bold'>{item.name}</h1>
            <p>{item.slug}</p>
          </div>
          <img src={item.image} alt={item.name} className='w-50 text-end'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  className='bg-main' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
