import React from 'react';
import { Form, Button } from 'react-bootstrap';

function RegisterForm() {

  const handleSubmit = async (event) => {
    event.preventDefault();
	const data = new FormData(event.target);
	const payload = Object.fromEntries(data);
	const age = Number(payload.age);
	payload.age = (isNaN(age) ? 0 : age);
	fetch('https://localhost:7215/api/Users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
	.then(async (response) => {
		if(response.status === 201){
			alert('User Created Successfully!');
			window.location.reload();
		}
		else{
			const jsonData = await response.json();
			let errorMessage = "Oops! Something went wrong.\n";
			for (const [key, value] of Object.entries(jsonData.errors)) {
			  errorMessage += `\n${key}: ${value.join('\n')}\n-----------------------------------------`;
			}
			alert(errorMessage);
		}
	})
	.catch(error => {
		console.log(error);
		alert('Oops! Something went wrong.');
	});
}

  return (
	<div style={{width : '70%'}}>
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
			Save Data
		</Button>
		<span>
			<a href="/view">
				<Button variant="primary" className="mx-2">
					Show Data Table
				</Button>
			</a>
		</span>
	  </form>
	</div>
  );
}

export default RegisterForm;
