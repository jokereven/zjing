import GitalkComponent from 'gitalk/dist/gitalk-component';
import 'gitalk/dist/gitalk.css';
import Head from 'next/head';
import Script from 'next/script';
import Date from '../../component/date';
import Layout from '../../component/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

var gitalk = new Gitalk({
	clientID: 'ed231404cd5f43063891', // GitHub Application Client ID
	clientSecret: '5e503126016b1830d93a9921d642bcb5f4691e63', // GitHub Application Client Secret
	repo: 'zjing', // 存放评论的仓库
	owner: 'jokereven', // 仓库的创建者，
	admin: ['jokereven'], // 如果仓库有多个人可以操作，那么在这里以数组形式写出
	id: ufhakdhf78y78r32, // 用于标记评论是哪个页面的，确保唯一，并且长度小于50
});

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
			<GitalkComponent
				options={{
					clientID: 'ed231404cd5f43063891',
					clientSecret: '5e503126016b1830d93a9921d642bcb5f4691e63',
					repo: 'zjing',
					owner: 'cnzjing125',
					admin: ['jokereven'],
					id: "I don't mind being alone. I just don't want to be insignificant.", // Ensure uniqueness and length less than 50
					distractionFreeMode: false, // Facebook-like distraction free mode
				}}
			/>
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
