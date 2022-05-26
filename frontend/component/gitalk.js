import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';

var gitalk = new Gitalk({
	clientID: 'c89d22e7707f5120befa',
	clientSecret: '92d18237ec0a6e8cecf6b77c61c225adfe61c308',
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
