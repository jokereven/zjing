import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';

var gitalk = new Gitalk({
	clientID: '0ea82e516525cbd4f6ab',
	clientSecret: 'c10645f00aa26d97c87dd91d61116a74f775b4c1',
	repo: 'zjing',
	owner: 'gnorev',
	admin: ['jokereven'],
	id: '1d2f70f4e24490b14ed25cd6428106332ceb0a06', // Ensure uniqueness and length less than 50
	distractionFreeMode: false, // Facebook-like distraction free mode
});

gitalk.render('gitalk-container');

export default Gitlak = () => {
	return <div id='gitalk-container'></div>;
};
