function split(html, loc, start, end, out) {
	const words = html.slice(loc, start).split(" ");
	out.push(
		words
			.map((word) => {
				const len = Math.floor(word.length / 2);

				return `<strong>${word.slice(0, len)}</strong>${word.slice(
					len,
					word.length
				)}`;
			})
			.join(" ")
	);

	out.push(html.slice(start, end));
}

function boldify() {
	const re = /<[^>]+>/dgim;
	const articles = [
		...document.getElementsByTagName("article"),
		...document.getElementsByClassName("article"),
		...document.getElementsByClassName("post"),
	];

	for (const article of articles) {
		const paragraphs = article.getElementsByTagName("p");
		for (const paragraph of paragraphs) {
			const html = paragraph.innerHTML;

			let match;
			let loc = 0;
			const out = [];

			while ((match = re.exec(html)) != null) {
				for (const [start, end] of match.indices) {
					if (start <= 0) {
						continue;
					}

					split(html, loc, start, end, out);
					loc = end;
				}
			}

			split(html, loc, html.length, html.length, out);
			paragraph.innerHTML = out.join("");
		}
	}
}

boldify();
