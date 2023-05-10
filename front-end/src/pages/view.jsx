import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';

function DataTable() {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState([]);
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
		console.log(data);
	})
	.catch(error => console.error(error));
  }, [timestamp]);

  const handleEditClick = (item) => {
    setFormData(item);
	setIsEditing(item.id);
  };

  const handleSaveClick = async () => {
	const age = Number(formData.age);
	formData.age = (isNaN(age) ? 0 : age);
	console.log(formData);
	const response = await fetch(`https://localhost:7215/api/Users/${formData.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	});
	console.log(response);
	if(response.status === 204){
		setTimestamp(Date.now());
		setIsEditing(false);
	}
	// const responseJson = await response.json();
	// console.log(responseJson);

}

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = (id) => {
    console.log('Delete clicked for id:', id);
    // Replace this with your custom delete handler logic
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
	<div style={{width : '85%'}}>
	<h2 className="mb-4 display-5">Users Data</h2>
	  <Table striped bordered hover variant='light'>
		<thead>
		  <tr>
			<th className='h5'>#</th>
			<th className='h5'>name</th>
			<th className='h5'>age</th>
			<th className='h5'>email</th>
			<th className='h5'>phone</th>
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
					  <a href="#" onClick={(e) => { e.preventDefault(); handleSaveClick(item); }}>Save</a>{' '}
					  <a href="#" onClick={(e) => { e.preventDefault(); handleCancelClick(); }}>Cancel</a>
					</>
				  ) : (
					<>
					  {isItemHovered && (
						<>
						  <a href="#" onClick={(e) => {e.preventDefault(); handleEditClick(item);}}>Edit</a>{' '}
						  <a href="#" onClick={(e) => {e.preventDefault(); handleDeleteClick(item.id);}}>Delete</a>{' '}
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
  );
}
export default DataTable;
