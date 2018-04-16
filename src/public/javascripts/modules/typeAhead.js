import axios from 'axios';
import dompurify from 'dompurify';

function searchResultsHTML(teams) {
	return teams.map(team => {
		return `
			<a href="/teams/${team.slug}" class="search__result">
				<strong>${team.name}</strong>
			</a>
		`;
	}).join('');
}

function typeAhead(search) {
	if (!search) {
		return;
	}


	const endpoint = search.querySelector('form').action;

	const searchInput = search.querySelector('input[name="search"]');
	const searchResults = search.querySelector('.search__results');

	let controller;
	let signal;

	searchInput.on('input', function() {
		if (!this.value) {
			searchResults.styles.display = 'none';

			return;
		}

		// show results
		searchResults.style.display = 'block';
		searchResults.innerHTML = '';

		if (controller !== undefined) {
			// Abort the previous promise
			controller.abort();
		}

		if ("AbortController" in window) {
			controller = new AbortController();
			signal = controller.signal;
		}

		axios.get(`${endpoint}?q=${this.value}`, { signal })
			.then(res => {
				if (res.data.length) {
					searchResults.innerHTML = dompurify.sanitize(searchResultsHTML(res.data));
					return;
				}

				// Tell them nothing came back
				searchResults.innerHTML = dompurify.sanitize(`<div class="search__result">No results for ${this.value} found</div>`);
			})
			.catch(err => {
				console.error(err);
			});
	});

	// Handle keyboard input
	searchInput.on('keyup', (e) => {
		if (![38, 40, 13].includes(e.keyCode)) {
			return;
		}

		const activeClass = 'search__result--active';
		const current = search.querySelector(`.${activeClass}`);
		const items = search.querySelectorAll('.search__result');
		let next;

		if (e.keyCode === 40 && current) {
			next = current.nextElementSibling || items[0];
		} else if (e.keyCode === 40) {
			next = items[0];
		} else if (e.keyCode === 38 && current) {
			next = current.previousElementSibling || items[items.length - 1]
		} else if (e.keyCode === 38) {
			next = items[items.length - 1];
		} else if (e.keyCode === 13 && current.href) {
			window.location = current.href;

			return;
		}

		if (current) {
			current.classList.remove(activeClass);
		}

		next.classList.add(activeClass);

	});
}

export default typeAhead;