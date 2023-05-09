import React from 'react';
import { Form, Button } from 'react-bootstrap';

function RegisterForm() {

  const handleSubmit = (event) => {
    // event.preventDefault();
	const data = new FormData(event.target);
	const payload = Object.fromEntries(data);
	console.log(payload);
}

  return (
    <>
	  <form onSubmit={handleSubmit}>
		<h2 className="mb-4 display-5">User Registration Form</h2>
		<div className='row'>
			<Form.Group className="mb-3 col-5">
				<Form.Label className="h6">Name</Form.Label>
				<Form.Control type="text" name='name' placeholder='Enter Your Name'/>
			</Form.Group>

			<Form.Group className="mb-3 col-5">
				<Form.Label className="h6">Email</Form.Label>
				<Form.Control type="text" name='email' placeholder='Enter Your Email'/>
			</Form.Group>

			<Form.Group className="mb-3 col-5">
				<Form.Label className="h6">Phone Number</Form.Label>
				<Form.Control type="text" name='phone' placeholder='Enter Your Phone Number'/>
			</Form.Group>

			<Form.Group className="mb-3 col-5">
				<Form.Label className="h6">Age</Form.Label>
				<Form.Control type="number" name='age' placeholder='Enter Your Age'/>
			</Form.Group>

		</div>
		<Button variant="success" type="submit">
			Save Your Data
		</Button>
		<Button variant="primary" className="mx-2">
			Show Full Data
		</Button>
	  </form>
	</>
  );
}

export default RegisterForm;
