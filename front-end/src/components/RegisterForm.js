import React from 'react';
import { Form, Button } from 'react-bootstrap';

function RegisterForm() {

  const handleSubmit = async (event) => {
    event.preventDefault();
	const data = new FormData(event.target);
	const payload = Object.fromEntries(data);
	const age = Number(payload.Age);
	payload.Age = (isNaN(age) ? 0 : age);
	console.log(payload);
	const response = await fetch('https://localhost:7215/api/Users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});
	const responseJson = await response.json();
	console.log(responseJson);
}

  return (
    <>
	  <form onSubmit={handleSubmit}>
		<h2 className="mb-4 display-5">User Registration Form</h2>
		<div className='row'>
			<Form.Group className="mb-3 col-5">
				<Form.Label className="h6">Name</Form.Label>
				<Form.Control type="text" name='Name' placeholder='Enter Your Name'/>
			</Form.Group>

			<Form.Group className="mb-3 col-5">
				<Form.Label className="h6">Email</Form.Label>
				<Form.Control type="text" name='Email' placeholder='Enter Your Email'/>
			</Form.Group>

			<Form.Group className="mb-3 col-5">
				<Form.Label className="h6">Phone Number</Form.Label>
				<Form.Control type="text" name='Phone' placeholder='Enter Your Phone Number'/>
			</Form.Group>

			<Form.Group className="mb-3 col-5">
				<Form.Label className="h6">Age</Form.Label>
				<Form.Control type="number" name='Age' placeholder='Enter Your Age'/>
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
