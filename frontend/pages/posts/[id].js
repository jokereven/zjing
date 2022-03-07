import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';
import Head from 'next/head';
import Script from 'next/script';
import Date from '../../component/date';
import Layout from '../../component/layout';
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect.ts';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

function randomString(e) {
	e = e || 32;
	var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678',
		a = t.length,
		n = '';
	for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n;
}

export default function Post({ postData }) {
	useIsomorphicLayoutEffect(() => {
		var gitalk = new Gitalk({
			clientID: 'c89d22e7707f5120befa',
			clientSecret: '92d18237ec0a6e8cecf6b77c61c225adfe61c308',
			repo: 'zjing',
			owner: 'cnzjing125',
			admin: ['jokereven'],
			id: `${randomString(50)}`, // Ensure uniqueness and length less than 50
			distractionFreeMode: false, // Facebook-like distraction free mode
		});
		gitalk.render('gitalk-container');
	});
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			{/* 代码高亮 */}
			<link href='/source/css/prism.css' rel='stylesheet' />
			<Script src='/source/js/prism.js'></Script>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div
					className={utilStyles.content}
					dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
				/>
				<div id='gitalk-container' />
			</article>
		</Layout>
	);
}

export async function getStaticPaths() {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
}
