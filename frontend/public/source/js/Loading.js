switch (document.readyState) {
	case 'loading':
		// 表示文档还在加载中,0即处于"正在加载"状态.
		break;
	case 'interactive':
		// 文档已经结束了"正在加载"状态,DOM元素可以被访问.
		// 但是像图像,样式表和框架等资源依然还在加载.
		var Loading = document.getElementById('loading-container');
		Loading.style.display = 'none';
		var Darkmode = document.getElementsByClassName('darkmode-toggle')[0];
		Darkmode.style.zIndex = '999';
		var BackToUp = document.getElementById('back-to-up');
		BackToUp.style.zIndex = '999';
		break;
	case 'complete':
		// 页面所有内容都已被完全加载.
		break;
}
