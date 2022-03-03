import Head from 'next/head';

export default function Custom500() {
	return (
		<>
			<Head>
				<title>500 Server side error occurred</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<h1 style={{ textAlign: 'center', fontSize: '24px' }}>
				500 Server side error occurred
			</h1>
			;
		</>
	);
}
