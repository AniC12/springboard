document.addEventListener("DOMContentLoaded", function () {
	const input = document.querySelector('#fruit');
	const suggestions = document.querySelector('.suggestions ul');

	const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

	function search(str) {
		let results = [];
		let lowerStr = str.toLowerCase();

		if (str === "") {
			return results;
		}

		/*for (let element of fruit) {
			let lowElement = element.toLowerCase();
			if (lowElement.includes(lowerStr)) {
				results.push(element);
			}
		}*/
		results = fruit.filter(element => element.toLocaleLowerCase().includes(lowerStr));
		return results;
	}

	function searchHandler(e) {
		let inputString = input.value;
		let results = search(inputString);
		showSuggestions(results, inputString);
	}

	function showSuggestions(results, inputVal) {
		suggestions.innerHTML = "";
		/*for (let i = 0; i < results.length; i++) {
			const element = results[i];
			const li = document.createElement("li");
			let index = element.toLowerCase().indexOf(inputVal.toLowerCase());
			li.innerHTML = element.substring(0, index) + "<b>" + element.substring(index, index + inputVal.length) + "</b>" + element.substring(index + inputVal.length);
			suggestions.appendChild(li);
		}*/
		results.forEach(element => {
			const li = document.createElement("li");
			let index = element.toLowerCase().indexOf(inputVal.toLowerCase());
			li.innerHTML = element.substring(0, index) + "<b>" + element.substring(index, index + inputVal.length) + "</b>" + element.substring(index + inputVal.length);
			suggestions.appendChild(li);
		});
	}

	function useSuggestion(e) {
		input.value = e.target.textContent;
		suggestions.innerHTML = "";
	}

	input.addEventListener('keyup', searchHandler);
	suggestions.addEventListener('click', useSuggestion);
});
