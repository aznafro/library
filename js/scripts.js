
// init elements
let addContainer = document.querySelector(".add-container");
let addTitle = addContainer.querySelector("[name=\"title\"]");
let addAuthor = addContainer.querySelector("[name=\"author\"]");
let addPages = addContainer.querySelector("[name=\"pages\"]");
let addSynopsis = addContainer.querySelector("[name=\"synopsis\"]");
let form = addContainer.querySelector(".form");

let removeContainer = document.querySelector(".remove-container");
let removeText = removeContainer.querySelector(".action__text");
let removeConfirm = removeContainer.querySelector(".remove__confirm");
let removeNo = removeContainer.querySelector(".remove__cancel");
let currentBookEl = null;

let updateContainer = document.querySelector(".update-container");
let updateTitle = updateContainer.querySelector("[name=\"title\"]");
let updateAuthor = updateContainer.querySelector("[name=\"author\"]");
let updatePages = updateContainer.querySelector("[name=\"pages\"]");
let updateRead = updateContainer.querySelector("[name=\"read\"]");
let updateSynopsis = updateContainer.querySelector("[name=\"synopsis\"]");
let updateConfirm = updateContainer.querySelector(".update__confirm");

let booksContainer = document.querySelector(".books-container");
let booksList = document.querySelector(".books .row");
let addButton = document.querySelector(".btn-add");
let header = document.querySelector(".header");
let screen = document.querySelector(".screen");

let database = firebase.database();

/*********************************

		BOOK ELEMENT OBJECT

*********************************/
function BookElement() {

}

// static variable used for the animation delay
BookElement.delay = 0;

BookElement.prototype.create = (bookId, book) => {
	let bookEl = document.createElement("div");
	let article = document.createElement("article");
	let titleEl = document.createElement("h3");
	let pagesEl = document.createElement("p");
	let authorEl = document.createElement("p");
	let extraInfoBar = document.createElement("div");
	let readEl = document.createElement("p");
	let menuBox = document.createElement("div");
	let menuIcon = document.createElement("i");
	let menuEl = document.createElement("div");
	let list = document.createElement("ul");
	let updateEl = document.createElement("li");
	let updateLink = document.createElement("a");
	let removeEl = document.createElement("li");
	let removeLink = document.createElement("a");
	let synopsisEl = document.createElement("p");

	bookEl.classList.add("track-sm-1-2");
	bookEl.classList.add("track-md-1-3");
	bookEl.classList.add("track-lg-1-4");

	let dataIdAtt = document.createAttribute("data-id");
	dataIdAtt.value = bookId;
	bookEl.setAttributeNode(dataIdAtt);

	article.classList.add("book");
	article.style.animationDelay = BookElement.delay + "s";
	BookElement.delay += .1;

	titleEl.classList.add("title");
	titleEl.textContent = book.title;

	pagesEl.classList.add("pages");
	pagesEl.textContent = book.pages + " pgs";

	authorEl.classList.add("author");
	authorEl.textContent = book.author;

	extraInfoBar.classList.add("extra-info-bar");

	readEl.classList.add("read");
	readEl.textContent = book.read;

	menuBox.classList.add("menu-box");

	menuIcon.classList.add("fas");
	menuIcon.classList.add("fa-ellipsis-h");

	menuEl.classList.add("menu");

	updateEl.classList.add("nav-item");
	updateLink.classList.add("nav-link");
	updateLink.classList.add("update");
	updateLink.textContent = "Update";

	removeEl.classList.add("nav-item");
	removeLink.classList.add("nav-link");
	removeLink.classList.add("remove");
	removeLink.textContent = "Remove";

	synopsisEl.classList.add("synopsis");
	synopsisEl.textContent = book.synopsis;

	updateEl.appendChild(updateLink);
	removeEl.appendChild(removeLink);
	list.appendChild(updateEl);
	list.appendChild(removeEl);
	menuEl.appendChild(list);

	menuBox.appendChild(menuIcon);
	menuBox.appendChild(menuEl);

	extraInfoBar.appendChild(readEl);
	extraInfoBar.appendChild(menuBox);

	article.appendChild(titleEl);
	article.appendChild(pagesEl);
	article.appendChild(authorEl);
	article.appendChild(extraInfoBar);
	article.appendChild(synopsisEl);

	bookEl.appendChild(article);

	this.bookEl = bookEl;

	return bookEl;
}

/****************************************
	
		ALL OTHER EVENT LISTENERS

****************************************/
addButton.addEventListener("click", function() {
	showContainer(addContainer);
});

// if you click anywhere else on the screen, hide all the menus
document.body.addEventListener("click", function() {
	document.querySelectorAll(".menu-show").forEach(function(menu) {
		menu.classList.remove("menu-show");
	});
});

// all the cancel buttons
addContainer.querySelector(".x").addEventListener("click", function() {
	hideContainer(addContainer);
});

removeContainer.querySelector(".x").addEventListener("click", function() {
	hideContainer(removeContainer);
});

updateContainer.querySelector(".x").addEventListener("click", function() {
	hideContainer(updateContainer);
});

removeNo.addEventListener("click", function() {
	hideContainer(removeContainer);
});

/*****************************

			ADD BOOK

*****************************/

// model listener for add
let booksRef = database.ref("books/");
booksRef.on('child_added', function(book) {
	renderHelper(book.key, book.val());
});

function writeBook(title, author, pages, read, synopsis) {
	let id = database.ref().push().key;

 	database.ref("books/" + id).set({
	    title: title,
	    author: author,
	    pages: pages,
	    read: read,
	    synopsis: synopsis
  	});
}

// prevent form from refreshing the page
form.addEventListener("submit", function(e) {
	e.preventDefault();

	let addRead = addContainer.querySelector("[type=\"radio\"]:checked");

	// update model
	writeBook(addTitle.value, addAuthor.value, addPages.value, addRead.value, addSynopsis.value);

	// reset
	addTitle.value = "";
	addAuthor.value = "";
	addPages.value = "";
	document.querySelector(".add-container [value=\"Not Read\"]").checked = true;
	addSynopsis.value = "";

	hideContainer(addContainer);
});

// Render Books into list
function renderHelper(bookId, book) {
	let bookEl = new BookElement().create(bookId, book);
	attachMenuEventListeners(bookEl);
	booksList.appendChild(bookEl);
}

/************************

		REMOVE BOOK

************************/

// model listener for remove
booksRef.on('child_removed', function(book) {
	// update ui
  	currentBookEl.remove();
});

function removeBook(id) {
	database.ref("books/" + id).remove();
}

function remove() {
	// update model
	removeBook(currentBookEl.getAttribute("data-id"));
	hideContainer(removeContainer);
}
removeConfirm.addEventListener("click", remove);

/**************************

		UPDATE BOOK

***************************/

// model listener for update
booksRef.on('child_changed', function(book) {
	// update view
	currentBookEl.querySelector(".title").textContent = book.title;
	currentBookEl.querySelector(".author").textContent = book.author;
	currentBookEl.querySelector(".pages").textContent = book.pages + " pgs";
	currentBookEl.querySelector(".read").textContent = book.read;
	currentBookEl.querySelector(".synopsis").textContent = book.synopsis;
});

function updateBook(id, title, author, pages, read, synopsis) {
 	database.ref("books/" + id).update({
	    title: title,
	    author: author,
	    pages: pages,
	    read: read,
	    synopsis: synopsis
  	});
}

function update() {
	let id = currentBookEl.getAttribute("data-id");
	
	// update model, listener will update view
	updateBook(id, updateTitle.value, updateAuthor.value, updatePages.value, updateRead.value, updateSynopsis.textContent);
	hideContainer(updateContainer);
}
updateConfirm.addEventListener("click", update);

/**************************
	
	HELPER FUNCTIONS

***************************/
function attachMenuEventListeners(bookEl) {
	// toggle menu button
	bookEl.querySelector(".fa-ellipsis-h").addEventListener("click", function(e) {
		e.stopPropagation();
		bookEl.querySelector(".menu").classList.toggle("menu-show");
	});

	// delete
	bookEl.querySelector(".remove").addEventListener("click", function() {
		let title = bookEl.querySelector(".title").textContent;
		removeText.textContent = "Are you sure you want to remove '" + title + "'?";

		// set the book to be deleted
		currentBookEl = bookEl;

		// show remove container
		showContainer(removeContainer);
		bookEl.querySelector(".menu").classList.remove("menu-show");
	});

	// update
	bookEl.querySelector(".update").addEventListener("click", function() {

		// set bookelement to be updated
		currentBookEl = bookEl;
		
		// initialize container input values
		updateTitle.value = bookEl.querySelector(".title").textContent;
		updateAuthor.value = bookEl.querySelector(".author").textContent;

		let pages = bookEl.querySelector(".pages").textContent;
		if(pages) {
			updatePages.value = pages.split(" ")[0];
		}		

		updateRead.value = bookEl.querySelector(".read").textContent;
		updateSynopsis.textContent = bookEl.querySelector(".synopsis").textContent;

		// show update container
		showContainer(updateContainer);
		bookEl.querySelector(".menu").classList.remove("menu-show");
	});
}

function showContainer(container) {
	container.classList.remove("hidden");
	blur();
}

function hideContainer(container) {
	container.classList.add("hidden");
	unblur();
}

function blur() {
	screen.classList.remove("hidden");

	booksContainer.classList.add("blur");
	addButton.classList.add("blur");
	header.classList.add("blur");
}

function unblur() {
	screen.classList.add("hidden");

	booksContainer.classList.remove("blur");
	addButton.classList.remove("blur");
	header.classList.remove("blur");
}