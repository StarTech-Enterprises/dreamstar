
"use strict";

(function searchAandB() {

	// Declare & Assign Variables
	const topForm = document.querySelector('#top-form');
	const topInput = document.querySelector('#top-search');
	const resultList = document.querySelector('#search-results');
	const paginationElement = document.querySelector('#pagination');
	let items_per_page = 9;
	let current_Page = 1;
	let logicSwitch = document.querySelector('#logic-type');
	if(sessionStorage.getItem("logicSwitch") === 'false'){
		logicSwitch.checked = ""
		logicSwitch.parentElement.nextElementSibling.innerHTML ='<i>Search: <b>OR</b></i>';
	}else{
		logicSwitch.checked = "checked";
	}
    
	const filterOneItems = [...document.querySelectorAll(".filter-one")];
	const filterTwoItems = [...document.querySelectorAll(".filter-two")];
	const filterThreeItems = [...document.querySelectorAll(".filter-three")];
	const filterItemsContainer = document.querySelector("#filter-items-container");
	const filterClear = document.querySelector('#filter-clear');
	const filterClear2 = document.querySelector('#filter-clear-2');
	const filterClear3 = document.querySelector('#filter-clear-3');
	const filterClear4 = document.querySelector('#filter-clear-4');

	// put all FilterOne Items into a single Array
	let filterOneValues = [];
	let filterOneNames =[];
	for (let i = 0; i < filterOneItems.length; i++) {
		filterOneValues.push(filterOneItems[i].firstElementChild.firstElementChild.getAttribute('value'));
		filterOneNames.push(filterOneItems[i].firstElementChild.firstElementChild.getAttribute('name'));
	}
	let checkedItemArray = [];
	if (sessionStorage.getItem("tagArray")) {
		// Get checked items from Session Storage
		checkedItemArray = JSON.parse(sessionStorage.getItem("tagArray"));
	  }

	// put all FilterTwo Items into a single Array
	let filterTwoValues = [];
	let filterTwoNames =[];
	for (let i = 0; i < filterTwoItems.length; i++) {
		filterTwoValues.push(filterTwoItems[i].firstElementChild.firstElementChild.getAttribute('value'));
		filterTwoNames.push(filterTwoItems[i].firstElementChild.firstElementChild.getAttribute('name'));
	}
	let checkedItemArray2 = [];
	if (sessionStorage.getItem("tagArray2")) {
		// Get checked items from Session Storage
		checkedItemArray2 = JSON.parse(sessionStorage.getItem("tagArray2"));
	  }

	// put all FilterThree Items into a single Array
	let filterThreeValues = [];
	let filterThreeNames =[];
	for (let i = 0; i < filterThreeItems.length; i++) {
		filterThreeValues.push(filterThreeItems[i].firstElementChild.firstElementChild.getAttribute('value'));
		filterThreeNames.push(filterThreeItems[i].firstElementChild.firstElementChild.getAttribute('name'));
	}
	let checkedItemArray3 = [];
	if (sessionStorage.getItem("tagArray3")) {
		// Get checked items from Session Storage
		checkedItemArray3 = JSON.parse(sessionStorage.getItem("tagArray3"));
      }
      

	// Count total number of checked items
	var countTotalCheckedItems = function (){
		let count = 0;
		let count2 = 0;
		let count3 = 0;

		// Count FilterOne Items
		filterOneValues.forEach(function (filterOneValue, i) {
			if(filterOneItems[i].firstElementChild.firstElementChild.checked){
				// Count checked items
				count++;
			}
        });
        // Show Clear FilterOne Filter, if at least one item is checked
        if (count > 0) {
            document.querySelector('#clear-filters').classList.remove('is-hidden');
        } else{
            document.querySelector('#clear-filters').classList.add('is-hidden');
        }

		// Count FilterTwo Items
		filterTwoValues.forEach(function (filterTwoValue, i) {
			if(filterTwoItems[i].firstElementChild.firstElementChild.checked){
				// Count checked items
				count2++;
			}
        });
        // Show Clear FilterTwo Filter, if at least one item is checked
        if (count2 > 0) {
            document.querySelector('#clear-filters-2').classList.remove('is-hidden');
        } else{
            document.querySelector('#clear-filters-2').classList.add('is-hidden');
        }

		// Count FilterThree Items
		filterThreeValues.forEach(function (filterThreeValue, i) {
			if(filterThreeItems[i].firstElementChild.firstElementChild.checked){
				// Count checked items
				count3++;
			}
        });
        // Show Clear FilterThree Filter, if at least one item is checked
        if (count3 > 0) {
            document.querySelector('#clear-filters-3').classList.remove('is-hidden');
        } else{
            document.querySelector('#clear-filters-3').classList.add('is-hidden');
        }

		// Also, if at least one item is checked, show 'filter clear' button
		if(count > 0 || count2 >0 || count3 >0){
			filterClear.classList.remove('is-hidden');
		} else {
			filterClear.classList.add('is-hidden');
		}

	};


	// Count number of checked items and create Tags
	var countCheckedItems = function (){
		let count = 0;
		let count2 = 0;
		let count3 = 0;

		filterItemsContainer.innerHTML = "";
		while (checkedItemArray.length > 0) {
			checkedItemArray.shift();
		}
		while (checkedItemArray2.length > 0) {
			checkedItemArray2.shift();
		}
		while (checkedItemArray3.length > 0) {
			checkedItemArray3.shift();
		}

		// Also, create FilterOne Tags
		filterOneValues.forEach(function (filterOneValue, i) {
			if(filterOneItems[i].firstElementChild.firstElementChild.checked){
				// Count checked items
				count++;
				// Show Tags of Checked Items
				filterItemsContainer.innerHTML += 
				'<button class="tag-filterOne"' + ' id="'+ filterOneNames[i] + '"' + '>' + 
					'<span>' +
					filterOneValue +
					'</span>' +
					'<span class="delete">' +
                    '</span>' +
				'</button>';
				// Update checked item array
				checkedItemArray.push(filterOneValue);
			}
		});
		sessionStorage.setItem("tagArray", JSON.stringify(checkedItemArray));

		// Also, create FilterTwo Tags
		filterTwoValues.forEach(function (filterTwoValue, i) {
			if(filterTwoItems[i].firstElementChild.firstElementChild.checked){
				// Count checked items
				count2++;
				// Show Tags of Checked Items
				filterItemsContainer.innerHTML += 
				'<button class="tag-filterTwo"' + ' id="'+ filterTwoNames[i] + '"' + '>' + 
					'<span>' +
						filterTwoValue +
					'</span>' +
					'<span class="delete">' +
					'</span>' +
				'</button>';
				// Update checked item array
				checkedItemArray2.push(filterTwoValue);
			}
		});
		sessionStorage.setItem("tagArray2", JSON.stringify(checkedItemArray2));

		// Also, create FilterThree Tags
		filterThreeValues.forEach(function (filterThreeValue, i) {
			if(filterThreeItems[i].firstElementChild.firstElementChild.checked){
				// Count checked items
				count3++;
				// Show Tags of Checked Items
				filterItemsContainer.innerHTML += 
				'<button class="tag-filterThree"' + ' id="'+ filterThreeNames[i] + '"' + '>' + 
					'<span>' +
						filterThreeValue +
					'</span>' +
					'<span class="delete">' +
					'</span>' +
				'</button>';
				// Update checked item array
				checkedItemArray3.push(filterThreeValue);
			}
		});
		sessionStorage.setItem("tagArray3", JSON.stringify(checkedItemArray3));
		
		// Also, add Event Listeners to FilterOne Tags
		filterOneValues.forEach(function (filterOneValue, i) {
			if(filterOneItems[i].firstElementChild.firstElementChild.checked){
				// Avoid creating Duplicate Event Listeners
				filterItemsContainer.querySelector("#" + filterOneNames[i]).removeEventListener('click',()=>{});
				filterItemsContainer.querySelector("#" + filterOneNames[i]).addEventListener('click', TagClick(filterOneNames[i], i), false);
			}
		});

		// Also, add Event Listeners to FilterTwo Tags
		filterTwoValues.forEach(function (filterTwoValue, i) {
			if(filterTwoItems[i].firstElementChild.firstElementChild.checked){
				// Avoid creating Duplicate Event Listeners
				filterItemsContainer.querySelector("#" + filterTwoNames[i]).removeEventListener('click',()=>{});
				filterItemsContainer.querySelector("#" + filterTwoNames[i]).addEventListener('click', TagClick2(filterTwoNames[i], i), false);
			}
		});

		// Also, add Event Listeners to FilterThree Tags
		filterThreeValues.forEach(function (filterThreeValue, i) {
			if(filterThreeItems[i].firstElementChild.firstElementChild.checked){
				// Avoid creating Duplicate Event Listeners
				filterItemsContainer.querySelector("#" + filterThreeNames[i]).removeEventListener('click',()=>{});
				filterItemsContainer.querySelector("#" + filterThreeNames[i]).addEventListener('click', TagClick3(filterThreeNames[i], i), false);
			}
		});

		// Also, if at least one item is checked, show 'filter clear' button(s)
		countTotalCheckedItems();

		// Do search
		search(topInput.value, 1);
	}


	// Uncheck Checkboxes, and remove FilterOne Tag, when Tag is clicked
	var TagClick = function (tag, i){
		
		return function (){
			let count = 0;
			while (checkedItemArray.length > 0) {
				checkedItemArray.shift();
			}

			// Uncheck relevant CheckBox 
			filterOneItems[i].firstElementChild.firstElementChild.checked = false;

			// Remove Tag
			filterItemsContainer.querySelector("#" + tag).remove();

			// Recount Checked Items
			filterOneValues.forEach(function (filterOneValue, i) {
				if(filterOneItems[i].firstElementChild.firstElementChild.checked){
					count++;
				// Update checked item array
				checkedItemArray.push(filterOneValue);
				}
			});
			sessionStorage.setItem("tagArray", JSON.stringify(checkedItemArray));
			current_Page = 1;
			
			// Also, if at least one item is checked, show the 'filter clear' button
			countTotalCheckedItems();

			// Do search
			search(topInput.value, 1);
		}
	};

	// Uncheck Checkboxes, and remove FilterTwo Tag, when Tag is clicked
	var TagClick2 = function (tag, i){
	
		return function (){
			let count = 0;

			while (checkedItemArray2.length > 0) {
				checkedItemArray2.shift();
			}

			// Uncheck relevant CheckBox 
			filterTwoItems[i].firstElementChild.firstElementChild.checked = false;

			// Remove Tag
			filterItemsContainer.querySelector("#" + tag).remove();

			// Recount Checked Items

			filterTwoValues.forEach(function (filterTwoValue, i) {
				if(filterTwoItems[i].firstElementChild.firstElementChild.checked){
					count++;
				// Update checked item array
				checkedItemArray2.push(filterTwoValue);
				}
			});
			sessionStorage.setItem("tagArray2", JSON.stringify(checkedItemArray2));
			current_Page = 1;

			// Also, if at least one item is checked, show the 'filter clear' button
			countTotalCheckedItems();

			// Do search
			search(topInput.value, 1);
		}
	};

	// Uncheck Checkboxes, and remove FilterThree Tag, when Tag is clicked
	var TagClick3 = function (tag, i){
	
		return function (){
			let count = 0;

			while (checkedItemArray3.length > 0) {
				checkedItemArray3.shift();
			}

			// Uncheck relevant CheckBox 
			filterThreeItems[i].firstElementChild.firstElementChild.checked = false;

			// Remove Tag
			filterItemsContainer.querySelector("#" + tag).remove();

			// Recount Checked Items

			filterThreeValues.forEach(function (filterThreeValue, i) {
				if(filterThreeItems[i].firstElementChild.firstElementChild.checked){
					count++;
				// Update checked item array
				checkedItemArray3.push(filterThreeValue);
				}
			});
			sessionStorage.setItem("tagArray3", JSON.stringify(checkedItemArray3));
			current_Page = 1;

			// Also, if at least one item is checked, show the 'filter clear' button
			countTotalCheckedItems();

			// Do search
			search(topInput.value, 1);
		}
	};	


	// Clear all Filters
	var clearFilter = function (){
		filterOneValues.forEach(function (filterOneValue, i) {
			filterOneItems[i].classList.remove('is-hidden')
			filterOneItems[i].firstElementChild.firstElementChild.checked = false;
		});

		filterTwoValues.forEach(function (filterTwoValue, i) {
			filterTwoItems[i].classList.remove('is-hidden')
			filterTwoItems[i].firstElementChild.firstElementChild.checked = false;
		});

		filterThreeValues.forEach(function (filterThreeValue, i) {
			filterThreeItems[i].classList.remove('is-hidden')
			filterThreeItems[i].firstElementChild.firstElementChild.checked = false;
		});

        filterClear.classList.add('is-hidden');
        document.querySelector('#clear-filters').classList.add('is-hidden');
		document.querySelector('#clear-filters-2').classList.add('is-hidden');
		document.querySelector('#clear-filters-3').classList.add('is-hidden');

		filterItemsContainer.innerHTML = "";

		while (checkedItemArray.length > 0) {
			checkedItemArray.shift();
		  }
		
		while (checkedItemArray2.length > 0) {
		checkedItemArray2.shift();
		}

		while (checkedItemArray3.length > 0) {
		checkedItemArray3.shift();
		}

		sessionStorage.setItem("tagArray", JSON.stringify(checkedItemArray));
		sessionStorage.setItem("tagArray2", JSON.stringify(checkedItemArray2));
		sessionStorage.setItem("tagArray3", JSON.stringify(checkedItemArray3));
		sessionStorage.setItem("page", 1);
		topInput.value = '';
		sessionStorage.setItem("topInput", topInput.value);
		sessionStorage.setItem("logicSwitch", true);
		current_Page = 1;
		
		// Do search
		search(topInput.value, 1);
	}

	// Clear all FilterOne Filters
	var clearFilter2 = function (){
		filterOneValues.forEach(function (currentValue, i) {
			filterOneItems[i].classList.remove('is-hidden')
			filterOneItems[i].firstElementChild.firstElementChild.checked = false;
		});
		document.querySelector('#clear-filters').classList.add('is-hidden');

		// Remove FilterOne Tags
		let checkedItems = filterItemsContainer.getElementsByClassName('tag-filterOne')		
		for (let i = checkedItems.length - 1; i >= 0; i--){
			checkedItems[i].remove();
		};

		while (checkedItemArray.length > 0) {
			checkedItemArray.shift();
			}
		sessionStorage.setItem("tagArray", JSON.stringify(checkedItemArray));
		current_Page = 1;
		
		// Also, if at least one item is checked, show the 'filter clear' button
		countTotalCheckedItems();

		// Do search
		search(topInput.value, 1);
	}

	// Clear all FilterTwo Filters
	var clearFilter3 = function (){
		filterTwoValues.forEach(function (currentValue, i) {
			filterTwoItems[i].classList.remove('is-hidden')
			filterTwoItems[i].firstElementChild.firstElementChild.checked = false;
		});
		document.querySelector('#clear-filters-2').classList.add('is-hidden');

		// Remove FilterTwo Tags
		let checkedItems = filterItemsContainer.getElementsByClassName('tag-filterTwo')		
		for (let i = checkedItems.length - 1; i >= 0; i--){
			checkedItems[i].remove();
		};

		while (checkedItemArray2.length > 0) {
			checkedItemArray2.shift();
			}
		sessionStorage.setItem("tagArray2", JSON.stringify(checkedItemArray2));
		current_Page = 1;
		
		// Also, if at least one item is checked, show the 'filter clear' button
		countTotalCheckedItems();

		// Do search
		search(topInput.value, 1);
	}

	// Clear all FilterThree Filters
	var clearFilter4 = function (){
		filterThreeValues.forEach(function (currentValue, i) {
			filterThreeItems[i].classList.remove('is-hidden')
			filterThreeItems[i].firstElementChild.firstElementChild.checked = false;
		});
		document.querySelector('#clear-filters-3').classList.add('is-hidden');

		// Remove FilterThree Tags
		let checkedItems = filterItemsContainer.getElementsByClassName('tag-filterThree')		
		for (let i = checkedItems.length - 1; i >= 0; i--){
			checkedItems[i].remove();
		};

		while (checkedItemArray3.length > 0) {
			checkedItemArray3.shift();
			}
		sessionStorage.setItem("tagArray3", JSON.stringify(checkedItemArray3));
		current_Page = 1;
		
		// Also, if at least one item is checked, show the 'filter clear' button
		countTotalCheckedItems();

		// Do search
		search(topInput.value, 1);
	}	

    // Change logic switch
	var changeLogicSwitch= function () {
		logicSwitch.parentElement.nextElementSibling.innerText ="";
		if(logicSwitch.checked){
			logicSwitch.parentElement.nextElementSibling.innerHTML ='<i>Search: <b>AND</b></i>';
		} else{
			logicSwitch.parentElement.nextElementSibling.innerHTML ='<i>Search: <b>OR</b></i>';
		}
		sessionStorage.setItem("logicSwitch", logicSwitch.checked);
		current_Page = 1;

		// Do search
		search(topInput.value, 1);
	};

	// Remove site: from the input
	var clearInput = function () {
		topInput.value = topInput.value.replace(' StarBase Docs', '');
	};


	// Handle submit events
	var submitHandler = function (event) {
		event.preventDefault();
		search(topInput.value, 1);
	};


	// Search for matches
	var search = function (query, page) {

		// Variables
		current_Page = parseInt(page);
		sessionStorage.setItem("topInput", query.trim());
		var priority0 = []; // for search in FilterOne, FilterTwo, and FilterThree tag fields
		var priority1 = []; // for search in title & content fields
		var results = [];

		// Search FilterOne, FilterTwo, & FilterThree Tags
		if(checkedItemArray.length > 0 || checkedItemArray2.length > 0 || checkedItemArray3.length > 0){
			let tagArray = checkedItemArray;
			let tagArray2 = checkedItemArray2;
			let tagArray3 = checkedItemArray3;
			searchIndex.forEach(function (article) {
				let match1 = false;
				let match2 = false;
				let match3 = false;
				if(logicSwitch.checked){
					if (!Array.isArray(tagArray) || !tagArray.length) match1 = true;
					if (!Array.isArray(tagArray2) || !tagArray2.length) match2 = true;
					if (!Array.isArray(tagArray3) || !tagArray3.length) match3 = true;
					for (let i=0; i < article.tags_filterOne.length; i++) {
						tagArray.forEach(function (tag){
							if(article.tags_filterOne[i] == tag) match1 = true;
						});
					}
					for (let i=0; i < article.tags_filterTwo.length; i++) {
						tagArray2.forEach(function (tag){
							if(article.tags_filterTwo[i] == tag) match2 = true;
						});
					}
					for (let i=0; i < article.tags_filterThree.length; i++) {
						tagArray3.forEach(function (tag){
							if(article.tags_filterThree[i] == tag) match3 = true;
						});
					}
					if (match1 && match2 && match3) priority0.push(article);
				} else {
					for (let i=0; i < article.tags_filterOne.length; i++) {
						tagArray.forEach(function (tag){
							if(article.tags_filterOne[i] == tag) match1 = true;
						});
					}
					for (let i=0; i < article.tags_filterTwo.length; i++) {
						tagArray2.forEach(function (tag){
							if(article.tags_filterTwo[i] == tag) match2 = true;
						});
					}
					for (let i=0; i < article.tags_filterThree.length; i++) {
						tagArray3.forEach(function (tag){
							if(article.tags_filterThree[i] == tag) match3 = true;
						});
					}
					if (match1 || match2 || match3) priority0.push(article);
				}
			});
		} else {
			priority0 = searchIndex;
		}
		

		// Do Search, provided Query String is not Empty, or at least one Filter Item is checked. Otherwise, return All Results
		if(query.trim()){
			priority0.forEach(function (article) {
				// Convert Input String into Array of Words
				if(matchWordsPartial(article.title.concat(' ', article.content), query.match(/\b(\w+)\b/g)).length > 0) priority1.push(article);
			});
			results = priority1;
		} else {
			results = priority0;
		}


		// Add Article Counts by FilterOne to Page
			// Show FilterOne for all Matched Articles
			let filterOneArray = [];

			results.forEach(function (article) {
				for (let i=0; i < article.tags_filterOne.length; i++) {
					filterOneValues.forEach(function (filterOne){
						if(article.tags_filterOne[i] == filterOne) filterOneArray.push(article.tags_filterOne[i]);
					});
				}
			});

			// Show Article Count Grouped by FilterOne
			let filterOneObjectCount = filterOneArray.reduce((r,c) => (r[c] = (r[c] || 0) + 1, r), {});

			// Clear all Counts from FilterOne Items in HTML
			filterOneValues.forEach(function (currentValue, i) {
				filterOneItems[i].firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = "";
			});
			
			// Add Updated Counts for all FilterOne Items in HTML
			Object.keys(filterOneObjectCount).forEach(function(key) {
				let filterOneElementId = "filter-" + key.replace(/\s+/g, '-').toLowerCase() + "-filterOne";
				let filterOneElement = document.getElementById(filterOneElementId).nextElementSibling.nextElementSibling.nextElementSibling;
				filterOneElement.innerHTML = "&nbsp (" + filterOneObjectCount[key] + ")";
			});

		// Add Article Counts by FilterTwo to Page
			// Show FilterTwo for all Matched Articles
			let filterTwoArray = [];

			results.forEach(function (article) {
				for (let i=0; i < article.tags_filterTwo.length; i++) {
					filterTwoValues.forEach(function (filterTwo){
						if(article.tags_filterTwo[i] == filterTwo) filterTwoArray.push(article.tags_filterTwo[i]);
					});
				}
			});

			// Show Article Count Grouped by FilterTwo
			let filterTwoObjectCount = filterTwoArray.reduce((r,c) => (r[c] = (r[c] || 0) + 1, r), {});

			// Clear all Counts from FilterTwo Items in HTML
			filterTwoValues.forEach(function (currentValue, i) {
				filterTwoItems[i].firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = "";
			});
			
			// Add Updated Counts for all FilterTwo Items in HTML
			Object.keys(filterTwoObjectCount).forEach(function(key) {
				let filterTwoElementId = "filter-" + key.replace(/\s+/g, '-').toLowerCase() + "-filterTwo";
				let filterTwoElement = document.getElementById(filterTwoElementId).nextElementSibling.nextElementSibling.nextElementSibling;
				filterTwoElement.innerHTML = "&nbsp (" + filterTwoObjectCount[key] + ")";
			});

		// Add Article Counts by FilterThree to Page
			// Show FilterThree for all Matched Articles
			let filterThreeArray = [];

			results.forEach(function (article) {
				for (let i=0; i < article.tags_filterThree.length; i++) {
					filterThreeValues.forEach(function (filterThree){
						if(article.tags_filterThree[i] == filterThree) filterThreeArray.push(article.tags_filterThree[i]);
					});
				}
			});

			// Show Article Count Grouped by FilterThree
			let filterThreeObjectCount = filterThreeArray.reduce((r,c) => (r[c] = (r[c] || 0) + 1, r), {});

			// Clear all Counts from filterThree Items in HTML
			filterThreeValues.forEach(function (currentValue, i) {
				filterThreeItems[i].firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = "";
			});
			
			// Add Updated Counts for all FilterThree Items in HTML
			Object.keys(filterThreeObjectCount).forEach(function(key) {
				let filterThreeElementId = "filter-" + key.replace(/\s+/g, '-').toLowerCase() + "-filterThree";
				let filterThreeElement = document.getElementById(filterThreeElementId).nextElementSibling.nextElementSibling.nextElementSibling;
				filterThreeElement.innerHTML = "&nbsp (" + filterThreeObjectCount[key] + ")";
			});

		// Display the results
		displayList(results, resultList, items_per_page, current_Page);

	};

	// Display results
	var displayList = function(items, wrapper, items_per_page, page){
		sessionStorage.setItem("page", page);
		page--;

		let start = items_per_page * page;
		let end = start + items_per_page;
		let paginatedItems = items.slice(start, end);

		wrapper.innerHTML = "";
		wrapper.innerHTML = items.length < 1 ? createNoResultsHTML() : createResultsHTML(paginatedItems, items);

		// Display pagination buttons
		setupPagination(items, paginationElement, items_per_page)

	}

	// Create the markup when no results are found
	var createNoResultsHTML = function () {
		return '<div class="filter-search-grid-results-no-result">' +
					'<figure class="has-margin-bottom-medium">' +
						'<img src="images/no-results.svg">' +
					'</figure>' +
					'<h2>' +
					'No Results' +
					'</h2>' +
					'<p>' +
					'Sorry, we couldn\'t find a fit to your search. Please try another search.' +
					'</p>' +
				'</div>';
	};

	// Create the markup for results
	var createResultsHTML = function (paginatedResults, allResults) {
		var html = '<div class="filter-search-results__count-container">' +
						'<h2 class="filter-search-results__count">'
							+ allResults.length + ' result(s)' +
						'</h2>' +
					'</div>' +
					'<ul class="grid filter-search-grid-results">';
		html += paginatedResults.map(function (article, index) {
			return createHTML(article, index);
		}).join('');
		html += '</ul>';
		return html;
	};

	// Create the HTML for each result
	var createHTML = function (article, id) {
		var tags_filterOne = "";
		for (let i=0; i < article.tags_filterOne.length; i++) {
		tags_filterOne += '<li class="tag-filterOne">' + article.tags_filterOne[i] + '</li>';
		};

		var tags_filterTwo = "";
		for (let i=0; i < article.tags_filterTwo.length; i++) {
		tags_filterTwo += '<li class="tag-filterTwo">' + article.tags_filterTwo[i] + '</li>';
		};

		var tags_filterThree = "";
		for (let i=0; i < article.tags_filterThree.length; i++) {
		tags_filterThree += '<li class="tag-filterThree">' + article.tags_filterThree[i] + '</li>';
		};

		var html =
				'<li class="grid-item">' +
					'<article class="card">' +
						'<div class="card-content">' +
							'<a href="' + article.url + '">' +
								'<img src="' + article.image_url + '">' +
							'</a>' +
							'<a class="card-content-title" href="' + article.url + '">' +
								'<h3>' + article.title + '</h3>' +
							'</a>' +
							'<ul class="card-content-metadata">' +
								'<li>' +
									'<time>' +
										article.tags_filterThree +
									'</time>' +
								'</li>' +
							'</ul>' +
							'<p class="card-content-description">' + '<i>' + article.date + " - " + '</i>' + article.content + '</p>' +
							'<ul class="tags">' +
								tags_filterOne + tags_filterTwo + tags_filterThree +
							'</ul>' +
						'</div>' +
					'</article>' +
				'</li>'
		return html;
	};


	// Create HTML for Pagination Buttons
	var setupPagination = function (items, wrapper, items_per_page, ){
		wrapper.innerHTML = "";

		let page_count = Math.ceil(items.length / items_per_page);

		// Page buttons
		for (let i = Math.max(1, current_Page - 2); i <= Math.min(page_count, current_Page + 2); i++){
			let btns = PaginationButton(i, items);
			wrapper.appendChild(btns);
		}

		if(current_Page > 1){
			// First button
			let first_button = document.createElement('button');
			first_button.setAttribute("class","filter-search-pagenumbers-button");
			first_button.innerText = "First";
			first_button.removeEventListener('click', ()=>{});
			first_button.addEventListener('click', function (){
				current_Page = 1
				// Scroll to top
				document.body.scrollTop = 0; // For Safari
				document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
				displayList(items, resultList, items_per_page, current_Page);
				// Find button with active class
				let current_btn = document.querySelector('#pagination button.active');
				current_btn.classList.remove('active');
				document.querySelector('#pagination button[id="' + current_Page + '"]').classList.add('active')
			});
			wrapper.insertBefore(first_button, wrapper.firstChild);

			// Previous button
			let previous_button = document.createElement('button');
			previous_button.setAttribute("class","filter-search-pagenumbers-button");
			previous_button.innerText = "Prev";
			previous_button.removeEventListener('click', ()=>{});
			previous_button.addEventListener('click', function (){
				if (current_Page !=1){
				// Find button with active class, and go to previous page
				let current_btn = document.querySelector('#pagination button.active');
				current_Page = parseInt(current_btn.getAttribute('id')) - 1;
				// Scroll to top
				document.body.scrollTop = 0; // For Safari
				document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
				displayList(items, resultList, items_per_page, current_Page);
				current_btn.classList.remove('active');
				document.querySelector('#pagination button[id="' + current_Page + '"]').classList.add('active')
				}
			});
			wrapper.insertBefore(previous_button, wrapper.firstChild.nextSibling);
		}

		if(current_Page < page_count){
			// Next button
			let next_button = document.createElement('button');
			next_button.setAttribute("class","filter-search-pagenumbers-button");
			next_button.innerText = "Next";
			next_button.removeEventListener('click', ()=>{});
			next_button.addEventListener('click', function (){
				if (current_Page != page_count){
				// Find button with active class, and go to next page
				let current_btn = document.querySelector('#pagination button.active');
				current_Page = parseInt(current_btn.getAttribute('id')) + 1;
				// Scroll to top
				document.body.scrollTop = 0; // For Safari
				document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
				displayList(items, resultList, items_per_page, current_Page);
				current_btn.classList.remove('active');
				document.querySelector('#pagination button[id="' + current_Page + '"]').classList.add('active')
				}
			});
			wrapper.appendChild(next_button);

			// Last button
			let last_button = document.createElement('button');
			last_button.setAttribute("class","filter-search-pagenumbers-button");
			last_button.innerText = "Last";
			last_button.removeEventListener('click', ()=>{});
			last_button.addEventListener('click', function (){
				current_Page = page_count;
				// Scroll to top
				document.body.scrollTop = 0; // For Safari
				document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
				displayList(items, resultList, items_per_page, current_Page);
				// Find button with active class
				let current_btn = document.querySelector('#pagination button.active');
				current_btn.classList.remove('active');
				document.querySelector('#pagination button[id="' + current_Page + '"]').classList.add('active');
			});
			wrapper.appendChild(last_button);
		}
	}

	// Create Pagination Buttons
	var PaginationButton = function (page, items){
		let button = document.createElement('button');
		button.setAttribute("class","filter-search-pagenumbers-button");
		button.innerText = page;
		button.setAttribute("id", page);
		if(current_Page == page) button.classList.add('active');

		button.removeEventListener('click', ()=>{});
		button.addEventListener('click', function (){
			current_Page = page;
			// Scroll to top
			document.body.scrollTop = 0; // For Safari
			document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
			displayList(items, resultList, items_per_page, current_Page);
		});

		return button;
	}

	// Search Algorithms
	// Match Input Word Array to Search String (even Partial Word Mathes)
	var matchWordsPartial = function (searchstring, word_Array) {
		var regexMetachars = /[(){[*+?.\\^$|]/g;
		for (var i = 0; i < word_Array.length; i++) {
			word_Array[i] = '(?=.*' + word_Array[i].replace(regexMetachars, "\\$&") + '.*)';
		}
		var regex = new RegExp(word_Array.join(''), "gi");
		return searchstring.match(regex) || [];
	}

	// Load correct page state on new PageLoad
	var pageLoad = function (){
		let count = 0;
		let count2 = 0;
		let count3 = 0;
		filterItemsContainer.innerHTML = "";
		topInput.value = sessionStorage.getItem("topInput");

		// Check relevant items
		if (sessionStorage.getItem("tagArray")) {
			filterOneValues.forEach(function (filterOneValue, i) {
				if(JSON.parse(sessionStorage.getItem("tagArray")).includes(filterOneValue)){
					filterOneItems[i].firstElementChild.firstElementChild.checked = true;
				}
			});
		}
		if (sessionStorage.getItem("tagArray2")) {
			filterTwoValues.forEach(function (filterTwoValue, i) {
				if(JSON.parse(sessionStorage.getItem("tagArray2")).includes(filterTwoValue)){
					filterTwoItems[i].firstElementChild.firstElementChild.checked = true;
				}
			});
		}
		if (sessionStorage.getItem("tagArray3")) {
			filterThreeValues.forEach(function (filterThreeValue, i) {
				if(JSON.parse(sessionStorage.getItem("tagArray3")).includes(filterThreeValue)){
					filterThreeItems[i].firstElementChild.firstElementChild.checked = true;
				}
			});
		}
		// Also, create FilterOne Tags
		while (checkedItemArray.length > 0) {
			checkedItemArray.shift();
			}
		filterOneValues.forEach(function (filterOneValue, i) {
			if(filterOneItems[i].firstElementChild.firstElementChild.checked){
				// Count checked items
				count++;
				// Show Tags of Checked Items
				filterItemsContainer.innerHTML += 
				'<button class="tag-filterOne"' + ' id="'+ filterOneNames[i] + '"' + '>' + 
					'<span>' +
						filterOneValue +
					'</span>' +
					'<span class="delete">' +
					'</span>' +
				'</button>';
				// Update checked item array
				checkedItemArray.push(filterOneValue);
			}
		});

		// Also, create FilterTwo Tags
		while (checkedItemArray2.length > 0) {
			checkedItemArray2.shift();
			}
		filterTwoValues.forEach(function (filterTwoValue, i) {
			if(filterTwoItems[i].firstElementChild.firstElementChild.checked){
				// Count checked items
				count2++;
				// Show Tags of Checked Items
				filterItemsContainer.innerHTML += 
				'<button class="tag-filterTwo"' + ' id="'+ filterTwoNames[i] + '"' + '>' + 
					'<span>' +
						filterTwoValue +
					'</span>' +
					'<span class="delete">' +
					'</span>' +
				'</button>';
				// Update checked item array
				checkedItemArray2.push(filterTwoValue);
			}
		});

		// Also, create FilterThree Tags
		while (checkedItemArray3.length > 0) {
			checkedItemArray3.shift();
			}
		filterThreeValues.forEach(function (filterThreeValue, i) {
			if(filterThreeItems[i].firstElementChild.firstElementChild.checked){
				// Count checked items
				count3++;
				// Show Tags of Checked Items
				filterItemsContainer.innerHTML += 
				'<button class="tag-filterThree"' + ' id="'+ filterThreeNames[i] + '"' + '>' + 
					'<span>' +
						filterThreeValue +
					'</span>' +
					'<span class="delete">' +
					'</span>' +
				'</button>';
				// Update checked item array
				checkedItemArray3.push(filterThreeValue);
			}
		});
	
		// Also, add Event Listeners to FilterOne Tags
		filterOneValues.forEach(function (filterOneValue, i) {
			if(filterOneItems[i].firstElementChild.firstElementChild.checked){
				// Avoid creating Duplicate Event Listeners
				filterItemsContainer.querySelector("#" + filterOneNames[i]).removeEventListener('click',()=>{});
				filterItemsContainer.querySelector("#" + filterOneNames[i]).addEventListener('click', TagClick(filterOneNames[i], i), false);
			}
		});

		// Also, add Event Listeners to FilterTwo Tags
		filterTwoValues.forEach(function (filterTwoValue, i) {
			if(filterTwoItems[i].firstElementChild.firstElementChild.checked){
				// Avoid creating Duplicate Event Listeners
				filterItemsContainer.querySelector("#" + filterTwoNames[i]).removeEventListener('click',()=>{});
				filterItemsContainer.querySelector("#" + filterTwoNames[i]).addEventListener('click', TagClick2(filterTwoNames[i], i), false);
			}
		});

		// Also, add Event Listeners to FilterThree Tags
		filterThreeValues.forEach(function (filterThreeValue, i) {
			if(filterThreeItems[i].firstElementChild.firstElementChild.checked){
				// Avoid creating Duplicate Event Listeners
				filterItemsContainer.querySelector("#" + filterThreeNames[i]).removeEventListener('click',()=>{});
				filterItemsContainer.querySelector("#" + filterThreeNames[i]).addEventListener('click', TagClick3(filterThreeNames[i], i), false);
			}
		});

		// Also, if at least one item is checked, show 'filter clear' button(s)
		countTotalCheckedItems();

		// Do search
		if (sessionStorage.getItem("page")) {
			search(topInput.value, 	sessionStorage.getItem("page"));
		} else {
			search(topInput.value, 1);
		}

	}

	// Do the following on Page Load

	// Make sure required content exists
	if (!topForm || !topInput || !resultList || !searchIndex) return;

	// Remove site: from the input
	clearInput();

	// Display all session items on page load
	pageLoad();

	// Add Event Listerns
	eventListeners();

    function eventListeners() {
		// Run seach everytime Top 'Search' form is submitted
		topForm.addEventListener('submit', submitHandler, false);

		// Count number of FilterOne checked items, on each state change
		filterOneValues.forEach(function (filterOneValue, i) {
			filterOneItems[i].firstElementChild.firstElementChild.addEventListener('change', countCheckedItems);
		});

		// Count number of FilterTwo checked items, on each state change
		filterTwoValues.forEach(function (filterTwoValue, i) {
			filterTwoItems[i].firstElementChild.firstElementChild.addEventListener('change', countCheckedItems);
		});

		// Count number of FilterThree checked items, on each state change
		filterThreeValues.forEach(function (filterThreeValue, i) {
			filterThreeItems[i].firstElementChild.firstElementChild.addEventListener('change', countCheckedItems);
		});

		// Change logic switch
		logicSwitch.addEventListener('change', changeLogicSwitch);

		// Uncheck every checkbox if 'filter clear' button is clicked
		filterClear.addEventListener('click', clearFilter);
		filterClear2.addEventListener('click', clearFilter2);
		filterClear3.addEventListener('click', clearFilter3);
		filterClear4.addEventListener('click', clearFilter4);
	}

})();

// WAIT TILL DOCUMENT HAS LOADED BEFORE INITIATING FUNCTIONS
let searchAandB;
document.addEventListener('DOMContentLoaded', searchAandB);

