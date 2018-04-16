import '../scss/style.scss';

import { $, $$ } from './modules/bling';

import typeAhead from './modules/typeAhead';

{
	// Teams Search
	function searchResultsHTML(teams) {
		return teams.map(team => {
			return `
				<a href="/teams/${team.slug}" class="search__result">
					<strong>${team.name}</strong>
				</a>
			`;
		}).join('');
	}
	typeAhead($('.search.teams'), searchResultsHTML);
}


console.log('javascripts indexzzz...');