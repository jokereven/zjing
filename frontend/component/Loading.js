import Script from 'next/script';

const Loading = function () {
	return (
		<>
			<Script src='/source/js/Loading.js'></Script>
			<div id='loading-container'>
				<p className='loading-text'>You gotta win once in your life.</p>
				<div className='loading-image'>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</>
	);
};

export default Loading;
