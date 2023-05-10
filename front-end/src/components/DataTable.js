import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import ErrorMessage from '../pages/error';

function DataTable() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    fetch('https://localhost:7215/api/Users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(data => {
		setData(data)
		setIsLoading(false);
	})
	.catch(error => {
		console.error(error);
		alert('Oops! Something went wrong.');
	});
  }, [timestamp]);

  const handleEditClick = (item) => {
    setFormData(item);
	setIsEditing(item.id);
  };

  const handleSaveClick = async () => {
	const age = Number(formData.age);
	formData.age = (isNaN(age) ? 0 : age);
	console.log(formData);
	fetch(`https://localhost:7215/api/Users/${formData.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	})
	.then(async (response) => {
		if(response.status === 204){
			setTimestamp(Date.now());
			setIsEditing(false);
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

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = async (id) => {
	const response = await fetch(`https://localhost:7215/api/Users/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
	});
	console.log(response);
	if(response.status === 204){
		setTimestamp(Date.now());
	}
  };

  const [formData, setFormData] = useState({
	id: '',
    name: '',
    email: '',
    phone: '',
    age: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	console.log(formData);
  };

return (
	<>
	{!isLoading && data.length === 0 && (
		<>
		<ErrorMessage messages={[
			"Oops! We couldn't load the data at this time.",
			'Try to add some data from the link below.',
			<a style={{ color: 'green',  textDecoration: 'none' }} href='http://localhost:3000/'>User Registration Form</a>
		]} />
		</>
	  )}
	  {isLoading && ( <div className='display-4'>Loading...</div> )}
		  {!isLoading && data.length !== 0 && (
		  <div style={{width : '85%'}}>
			<div className="d-flex d-flex-row justify-content-between">
				<h2 className="mb-2 display-6">Users Data</h2>
				<h2 className="mb-2 h4 mt-auto">
				<a style={{ color: 'green', textDecoration: 'none' }} href='http://localhost:3000/'>+Add New User</a>
				</h2>
			</div>
		  <Table striped bordered hover variant='light'>
			  <thead>
			  <tr>
				  <th className='h5'>#</th>
				  <th className='h5'>Name</th>
				  <th className='h5'>Age</th>
				  <th className='h5'>Email</th>
				  <th className='h5'>Phone Number</th>
			  </tr>
			  </thead>
			  <tbody>
			  {data.map((item) => {
				  const isItemHovered = isHovered === item.id;

				  return (
				  <tr
					  key={item.id}
					  id={item.id}
					  onMouseEnter={() => setIsHovered(item.id)}
					  onMouseLeave={() => setIsHovered(null)}
				  >
					  <td style={{ width: '120px', height: '55px' }}>
					  {isEditing === item.id ? (
						  <>
						  <a style={{ color: 'green' }} href="#" onClick={(e) => { e.preventDefault(); handleSaveClick(item); }}>Save</a>{' '}
						  <a style={{ color: 'red' }} href="#" onClick={(e) => { e.preventDefault(); handleCancelClick(); }}>Cancel</a>
						  </>
					  ) : (
						  <>
						  {isItemHovered && (
							  <>
							  <a href="#" onClick={(e) => {e.preventDefault(); handleEditClick(item);}}>Edit</a>{' '}
							  <a href="#" style={{ color: 'red' }} onClick={(e) => {e.preventDefault(); handleDeleteClick(item.id);}}>Delete</a>{' '}
							  </>
						  )}
						  {!isItemHovered && <div className='h6'> {item.id} </div>}
						  </>
					  )}
					  </td>
					  <td>
					  {isEditing === item.id ? (
						  <Form.Control type='text' name='name' value={formData.name} onChange={handleInputChange}/>
					  ) : (
						  <div className='h6'> {item.name} </div>
					  )}
					  </td>
					  <td>
					  {isEditing === item.id ? (
						  <Form.Control type='number' name='age' value={formData.age} onChange={handleInputChange}/>
					  ) : (
						  <div className='h6'> {item.age} </div>
					  )}
					  </td>
					  <td>
					  {isEditing === item.id ? (
						  <Form.Control type='email' name='email' value={formData.email} onChange={handleInputChange} />
					  ) : (
						  <div className='h6'>{item.email} </div>
					  )}
					  </td>
					  <td>
					  {isEditing === item.id ? (
						  <Form.Control type='text' name='phone' value={formData.phone} onChange={handleInputChange}/>
					  ) : (
						  <div className='h6'> {item.phone} </div>
					  )}
					  </td>
				  </tr>
				  );
			  })}
			  </tbody>
		  </Table>
		</div>
	  )}
	</>
  );
}
export default DataTable;
