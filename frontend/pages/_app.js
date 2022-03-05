// 白天黑夜模式切换
import Darkmode from 'darkmode-js';
import Script from 'next/script';
// Header
import Header from '../component/Header';
// Loading
import Loading from '../component/Loading';
// 引入iconfont
import '../public/iconfont/iconfont.css';
// Global
import '../styles/Global.css';
// Loading css
import '../styles/Loading.css';
// Reset css
import '../styles/Reset.css';
// ScrollBar
import '../styles/ScrollBar.css';

const options = {
	bottom: '100px', // default: '32px'
	right: '15px', // default: '32px'
	left: 'unset', // default: 'unset'
	time: '0.5s', // default: '0.3s'
	mixColor: '#fff', // default: '#fff'
	backgroundColor: '#fff', // default: '#fff'
	buttonColorDark: '#100f2c', // default: '#100f2c'
	buttonColorLight: '#fff', // default: '#fff'
	saveInCookies: false, // default: true,
	label: '🌓', // default: ''
	autoMatchOsTheme: true, // default: true
};

const darkmode = new Darkmode(options);
darkmode.showWidget();

function MyApp({ Component, pageProps }) {
	return (
		<>
			{/* 看板娘 */}
			<link
				rel='stylesheet'
				href='https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css'></link>
			<Script src='/live2d/autoload.js'></Script>

			{/* 代码高亮 */}
			<link
				href='https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css'
				rel='stylesheet'
			/>
			<Script src='https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css'></Script>

			<Script src='source/js/back-to-up.js'></Script>
			<div id='top'></div>
			<Header></Header>
			<a href='#top' id='back-to-up'>
				🔝
			</a>
			<Loading></Loading>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
