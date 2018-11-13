// Book Object 
function Book(id, title, author, pages, read, synopsis) {
	this.id = id;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.synopsis = synopsis;
}

Book.prototype.toggleRead = function() {
	if(this.read == "Read") {
		this.read = "have not read";
	}
};

let id = 0;
let bookObjects = [
	new Book(id++, "The Hobbit 1", "J.R.R. Tolkien", 259, "Read", "A hobbit goes on an adventure and come back after finding out something terrible has happened."),
	new Book(id++, "The Hobbit 2", "J.R.R. Tolkien", 259, "Read", "A hobbit goes on an adventure and come back after finding out something terrible has happened."),
	new Book(id++, "The Hobbit 3", "J.R.R. Tolkien", 259, "Read", "A hobbit goes on an adventure and come back after finding out something terrible has happened."),
	new Book(id++, "The Hobbit 4", "J.R.R. Tolkien", 259, "Read", "A hobbit goes on an adventure and come back after finding out something terrible has happened."),
	new Book(id++, "The Hobbit 5", "J.R.R. Tolkien", 259, "Read", "A hobbit goes on an adventure and come back after finding out something terrible has happened.")
];

/**
	
	EVENT LISTENERS

**/
let addButton = document.querySelector(".btn-add");
let addBookContainer = document.querySelector(".add-container");
let booksContainer = document.querySelector(".books-container");
let header = document.querySelector(".header");
let screen = document.querySelector(".screen");
addButton.addEventListener("click", function() {
	showContainer(addBookContainer);
});

// all the cancel buttons
addBookContainer.querySelector(".x").addEventListener("click", function() {
	hideContainer(addBookContainer);
});

let removeContainer = document.querySelector(".remove-container");
removeContainer.querySelector(".x").addEventListener("click", function() {
	hideContainer(removeContainer);
});

let updateContainer = document.querySelector(".update-container");
updateContainer.querySelector(".x").addEventListener("click", function() {
	hideContainer(updateContainer);
});

let removeNo = document.querySelector(".remove__cancel");
removeNo.addEventListener("click", function() {
	hideContainer(removeContainer);
});

/*****************************

			ADD BOOK

*****************************/
let addBook = document.querySelector(".add-book");
let addTitle = document.querySelector("[name=\"title\"]");
let addAuthor = document.querySelector("[name=\"author\"]");
let addPages = document.querySelector("[name=\"pages\"]");
let addRead = document.querySelector("[name=\"read\"]");
let addSynopsis = document.querySelector("[name=\"synopsis\"]");
addBook.addEventListener("click", function() {
	let newBook = new Book(id++, 
							addTitle.value, 
							addAuthor.value, 
							addPages.value,
							addRead.value,
							addSynopsis.value);
	bookObjects.push(newBook);
	renderHelper(newBook, bookObjects.length - 1);
	hookUpBook(document.querySelector("[data-id=\"" + (id-1) + "\"]"));
	hideContainer(addBookContainer);
});

// prevent form from refreshing the page
let form = document.querySelector(".form");
form.addEventListener("submit", function(e) {
	e.preventDefault();
});

// Render Books into list
let booksList = document.querySelector(".books .row");
function render() {
	bookObjects.forEach(function(book, index) {
		renderHelper(book, index);
	});
}

/**
	
	HELPER FUNCTIONS

**/
function renderHelper(book, index) {
	let bookEl = document.createElement("div");
	booksList.innerHTML += "<div class=\"track-sm-1-2 track-md-1-3 track-lg-1-4\" data-id=\"" + book.id + "\">" +
								"<article class=\"book\">" +
									"<h3 class=\"title\">" + book.title + "</h3>" +
									"<p class=\"pages\">" + book.pages + " pgs</p>" +
									"<p class=\"author\">" + book.author + "</p>" +
									"<div class=\"extra-info-bar\">" +
										"<p class=\"read\">" + book.read + "</p>" +
										"<div class=\"menu-box\">" +
											"<i class=\"fas fa-ellipsis-h\"></i>" + 
											"<div class=\"menu\">" +
												"<ul>" +
													"<li class=\"nav-item\"><a class=\"nav-link mark-read\">Mark As Read</a></li>" +
													"<li class=\"nav-item\"><a class=\"nav-link remove\">Remove</a></li>" +
													"<li class=\"nav-item\"><a class=\"nav-link update\">Update</a></li>" +
												"</ul>" +
											"</div>" + 
										"</div>" +
									"</div>" +
									"<p class=\"synopsis\">" + book.synopsis + "</p>" +
					            "</article>" +
					        "</div>";
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

/************************

		REMOVE BOOK

************************/
let removeText = removeContainer.querySelector(".remove__text");
let removeConfirm = removeContainer.querySelector(".remove__confirm");

let currentBookEl = null;
function remove() {
	// update model
	let index = bookObjects.find(({ id }) => id == currentBookEl.getAttribute("data-id"));
	bookObjects.splice(index, 1);

	// update view
	currentBookEl.remove();

	hideContainer(removeContainer);
}
removeConfirm.addEventListener("click", remove);

/**************************

		UPDATE BOOK

***************************/
let updateTitle = updateContainer.querySelector("[name=\"title\"]");
let updateAuthor = updateContainer.querySelector("[name=\"author\"]");
let updatePages = updateContainer.querySelector("[name=\"pages\"]");
let updateRead = updateContainer.querySelector("[name=\"read\"]");
let updateSynopsis = updateContainer.querySelector("[name=\"synopsis\"]");
let updateConfirm = updateContainer.querySelector(".update__confirm");

function update() {
	let book = bookObjects.find(({ id }) => id == currentBookEl.getAttribute("data-id"));
	
	// update model
	book.title = updateTitle.value;
	book.author = updateAuthor.value;
	book.pages = updatePages.value;
	book.read = updateRead.value;
	book.synopsis = updateSynopsis.textContent;

	// update view
	currentBookEl.querySelector(".title").textContent = book.title;
	currentBookEl.querySelector(".author").textContent = book.author;
	currentBookEl.querySelector(".pages").textContent = book.pages + " pgs";
	currentBookEl.querySelector(".read").textContent = book.read;
	currentBookEl.querySelector(".synopsis").textContent = book.synopsis;

	hideContainer(updateContainer);
}

updateConfirm.addEventListener("click", update);

function hookUpBook(bookEl) {
	// toggle menu button
	bookEl.querySelector(".fa-ellipsis-h").addEventListener("click", function() {
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
		bookEl.querySelector(".menu").classList.toggle("menu-show");
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
		bookEl.querySelector(".menu").classList.toggle("menu-show");
	});

	// mark as read
	bookEl.querySelector(".mark-read").addEventListener("click", function() {
		console.log("MARK AS READ!");

		bookEl.querySelector(".menu").classList.toggle("menu-show");
	});
}

// render books on page
render();

// menu listener
let bookElements = document.querySelectorAll("[data-id]");
bookElements.forEach(function(bookEl) {
	hookUpBook(bookEl);
});