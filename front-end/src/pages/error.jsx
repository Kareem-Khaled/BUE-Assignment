import React from 'react';
function ErrorPage() {
	return (
		<>
			<h1 className='display-5' style={{color: '#ff5a5f'}}>Oops! The page you're looking for doesn't exist.</h1>
			<p className='h4 my-3'>We're sorry, but the page you requested cannot be found.</p>
			<p className='h4 my-3'>Please check the URL and try again.</p>
		</>
	  );
}

export default ErrorPage;
