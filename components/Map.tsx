import React from 'react';

const Map = () => {
	return (
		<div className='mt-5'>
			<div className='main-container'>
				<iframe
					width='100%'
					height='400'
					src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Ranchi,%20Jharkhand,%20India+(DEV-THREADS)&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
				></iframe>
			</div>
		</div>
	);
};

export default Map;
