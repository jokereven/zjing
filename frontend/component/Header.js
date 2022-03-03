import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Home = function () {
	return (
		<>
			<div className={styles.header_container}>
				<Link href={'/'}>
					<img src='/source/logo.jpg'></img>
				</Link>
				<div className={styles.content_container}>
					<Link href={'/#'}>
						<div>主站</div>
					</Link>
					<Link href={'/blog/'}>
						<div>BLOG</div>
					</Link>
					<Link href={'/roadmap/'}>
						<div>ROADMAP</div>
					</Link>
					<Link href={'/github/'}>
						<div>GITHUB</div>
					</Link>
					<Link href='laboratory '>
						<div>产品实验室</div>
					</Link>
					<div>
						更多...
						<ul>
							<li>个人中心</li>
							<li>吐槽专区</li>
							<li>搞钱</li>
							<li>interview</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
