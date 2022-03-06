import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import html from 'remark-html';
import remarkParse from 'remark-parse';
import prism from 'remark-prism';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map(fileName => {
		// Remove ".md" from file name to get id
		const id = fileName.replace(/\.md$/, '');

		// Read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// Use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);

		// Combine the data with the id
		return {
			id,
			...matterResult.data,
		};
	});
	// Sort posts by date
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
}

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);
	return fileNames.map(fileName => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ''),
			},
		};
	});
}

export async function getPostData(id) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);

	// Use remark to convert markdown into HTML string
	const processedContent = await remark()
		.use(html)
		.use(prism)
		.use(remarkParse)
		.use(remarkToc)
		.use(remarkRehype)
		.use(rehypeDocument, { title: 'Contents' })
		.use(rehypeFormat)
		.use(rehypeStringify)
		.process(matterResult.content);

	// const processedContent = await unified()
	// 	.use(remarkParse)
	// 	.use(remarkToc)
	// 	.use(remarkRehype)
	// 	.use(rehypeDocument, { title: 'Contents' })
	// 	.use(rehypeFormat)
	// 	.use(rehypeStringify)
	// 	.process(matterResult.content)
	// 	.then(file => {
	// 		console.log(file);
	// 	});

	const contentHtml = processedContent.toString();

	// Combine the data with the id and contentHtml
	return {
		id,
		contentHtml,
		...matterResult.data,
	};
}
