import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/404.module.css';

export default function Custom404() {
	return (
		<>
			<Head>
				<title>404 Not Found</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.body}>
				<div className={styles.error}>
					<div className={styles.container}>
						<div className={styles.icon}></div>
						<Link href='/'>
							<div className={styles.GoBack}>返回首页</div>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
