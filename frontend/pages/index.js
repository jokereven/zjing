import Head from 'next/head';
import Script from 'next/script';
import React from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
	return (
		<div className={styles.container}>
			{/* Head */}
			<Head>
				<title>ZJING | ROADMAP</title>
				{/* keywords */}
				<meta
					name='keywords'
					content='HTML, CSS ,JavaScript, frontend, Java, Python, c, c++, c#, Node, Go, php, Ruby, Jupyter Notebook, backend, React, Vue, TypeScript, Gin, Roadmap, ...'
				/>
				{/* description */}
				<meta name='description' content='You gotta win once in your life.' />
				{/* author */}
				<meta
					name='author'
					content='Gihub/Gitee/知乎 @jokereven && 推特 @cnzjing125'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1>ZJING | ROADMAP</h1>
				<a
					href='https://github.com/Alikhll/golang-developer-roadmap'
					target='_new'>
					<img
						style={{ width: '100%', height: '100%' }}
						src='/source/images/golang-developer-roadmap.png'></img>
				</a>
			</main>

			{/* footer */}
			<footer className={styles.footer}>
				{/* 不蒜子懒加载特效 */}
				<link
					rel='stylesheet'
					href='//cdn.bootcss.com/font-awesome/4.3.0/css/font-awesome.min.css'></link>
				{/* 不蒜子 */}
				<Script
					async
					src='//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'></Script>
				{/* 看板娘 */}
				<Script src='http://publicjs.supmiao.com/live2dcubismcore.min.js'></Script>
				{/* 网站运行时间 */}
				<Script src='/source/js/siteTime.js'></Script>
				{/* left */}
				<div className={styles.footer_left}>
					{/*  ClustrMaps.com */}
					<a href='https://clustrmaps.com/site/1bmy7' title='Visit tracker'>
						<img
							style={{ opacity: '0.8' }}
							src='//clustrmaps.com/map_v2.png?cl=080808&w=256&t=n&d=Wpsw3UwLLfOQ3cAgSFloslrFitN5bqKCLYnkd8PW2Qg&co=ffffff&ct=808080'
						/>
					</a>
				</div>
				{/* center */}
				<div className={styles.footer_center}>
					Copyright <span className='iconfont'>&#xe608;</span> 2022 - 2023{' '}
					<a
						href='https://github.com/jokereven'
						className={styles.a}
						target='_new'>
						周靖
					</a>
					| <span className='iconfont'>&#xe6d6;</span> Powered by{' '}
					<a
						className={styles.a}
						href='https://vercel.com'
						target='_new'
						rel='noopener noreferrer'>
						NEXT
					</a>
					<br />
					<span className='iconfont'>&#xe6ce;</span>{' '}
					<span>
						总浏览量:{' '}
						<span id='busuanzi_value_site_uv'>
							<i className='fa fa-spinner fa-spin'></i>
						</span>
					</span>{' '}
					| <span className='iconfont'>&#xe6ce;</span> 总访问人数:{' '}
					<span id='busuanzi_value_page_pv'>
						<i className='fa fa-spinner fa-spin'></i>
					</span>{' '}
					人
					<br />
					site has been running for <span id='sitetime'></span>
					<br />
					<a
						href='https://beian.miit.gov.cn'
						target={'_new'}
						className={styles.a}>
						<span>ICP 鄂ICP备2021004865号</span>
					</a>
				</div>
				{/* right */}
				<div className={styles.footer_right}>
					You gotta win once in your life.
					<br />
					ここで世界に痛みを感じる」.
				</div>
			</footer>
		</div>
	);
};

export default Home;
