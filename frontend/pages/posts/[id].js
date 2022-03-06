import Head from 'next/head';
import Script from 'next/script';
import Date from '../../component/date';
import Layout from '../../component/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
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
