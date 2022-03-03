// document.body.scrollTop = document.documentElement.scrollTop = 0;

window.onscroll = function () {
	var Top = document.getElementById('back-to-up');
	if (document.documentElement.scrollTop === 0) {
		Top.style.display = 'none';
	} else if (document.documentElement.scrollTop > 0) {
		Top.style.display = 'block';
	}
};
