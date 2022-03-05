import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts.js';
import styles from '../../styles/Blog.module.css';

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}

export default function Blog({ allPostsData }) {
	return (
		<div className={styles.blog_container}>
			<Link href={'https://github.com/jokereven'} target='_new'>
				<h2>@jokereven</h2>
			</Link>
			<ul className={styles.blog_articles_container}>
				{allPostsData.map(({ id, date, title, tag }) => (
					<Link href={`/posts/${id}`} key={id}>
						<li key={id} className={styles.blog_container_list}>
							<img src='/source/images/blog/hacker.jpg'></img>
							<h3>{title}</h3>
							<br />
							<span className={styles.time}>{date}</span>
							<div className={styles.tag}>{tag}</div>
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
}
