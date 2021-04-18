let countriesList = [];

fetch("https://restcountries.eu/rest/v2")
	.then((response) => {
		return response.json();
	})
	.then((countries) => {
		displayList(countries, listElement, rows, currentPage);
		setupPagination(countries, paginationElement, rows);
	});

const listElement = document.getElementById("list");
const paginationElement = document.getElementById("pagination");
let currentPage = 1;
let rows = 10;
function displayList(items, wrapper, rowsperPage, page) {
	wrapper.innerHTML = "";
	page--;
	let start = rowsperPage * page;
	let end = start + rowsperPage;
	let paginatedItems = items.slice(start, end);
	paginatedItems.map((item) => {
		let itemElement = document.createElement("div");
		itemElement.classList.add("item");
		itemElement.innerText = item.name;
		wrapper.appendChild(itemElement);
	});
}

function setupPagination(items, wrapper, rowsperPage) {
	wrapper.innerHTML = "";
	let pageCount = Math.ceil(items.length / rowsperPage);
	for (let i = 1; i <= pageCount; i++) {
		wrapper.appendChild(paginationButton(i, items));
	}
	let next = document.getElementById("next");
	next.addEventListener("click", function () {
		if (currentPage < pageCount) {
			currentPage = currentPage + 1;
			displayList(items, listElement, rows, currentPage);
		} else {
			alert("No More Countries");
		}
	});
	let previous = document.getElementById("previous");
	previous.addEventListener("click", function () {
		if (currentPage > 1) {
			currentPage = currentPage - 1;
			displayList(items, listElement, rows, currentPage);
		} else {
			alert("No More Countries");
		}
	});
}

function paginationButton(page, items) {
	let button = document.createElement("button");
	button.innerText = page;
	if (currentPage == page) {
		button.classList.add("active");
	}
	button.addEventListener("click", function () {
		currentPage = page;
		displayList(items, listElement, rows, currentPage);
		let currentButton = document.querySelector(".pagenumbers button.active");
		currentButton.classList.remove("active");
		button.classList.add("active");
	});
	return button;
}
