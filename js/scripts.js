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
	new Book(id++, "The Hobbit", "J.R.R. Tolkien", 259, "Read", "A hobbit goes on an adventure and comes back after finding out something terrible has happened."),
	new Book(id++, "Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 799, "Not Read", "Harry Potter finds out he's a wizard and goes to Hogwarts! There he meets new friends, enemies and the ultimate evil tied to his past!"),
	new Book(id++, "Fahrenheit 451", "Ray Bradbury", 198, "Read", "Citizen digs deep and finds out what the dystopian society is all about."),
	new Book(id++, "Brave New World", "Aldus Huxley", 240, "Not Read", "Another dystopian society, or is it?"),
	new Book(id++, "Animal House", "George Orwell", 190, "Read", "Not all is as it seems, as the weary farm animals seek to dismantle the tyranny of their farmers.")
];

/**
	
	EVENT LISTENERS

**/
let addButton = document.querySelector(".btn-add");
let addContainer = document.querySelector(".add-container");
let booksContainer = document.querySelector(".books-container");
let header = document.querySelector(".header");
let screen = document.querySelector(".screen");
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
let addTitle = addContainer.querySelector("[name=\"title\"]");
let addAuthor = addContainer.querySelector("[name=\"author\"]");
let addPages = addContainer.querySelector("[name=\"pages\"]");
let addSynopsis = addContainer.querySelector("[name=\"synopsis\"]");

// prevent form from refreshing the page
let form = addContainer.querySelector(".form");
form.addEventListener("submit", function(e) {
	e.preventDefault();

	let addRead = addContainer.querySelector("[type=\"radio\"]:checked");
	let newBook = new Book(id++, 
							addTitle.value, 
							addAuthor.value, 
							addPages.value,
							addRead.value,
							addSynopsis.value);

	addTitle.value = "";
	addAuthor.value = "";
	addPages.value = "";
	document.querySelector(".add-container [value=\"Not Read\"]").checked = true;
	addSynopsis.value = "";

	bookObjects.push(newBook);
	renderHelper(newBook, bookObjects.length - 1);
	hookUpBook(document.querySelector("[data-id=\"" + (id-1) + "\"]"));
	hideContainer(addContainer);
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
													"<li class=\"nav-item\"><a class=\"nav-link update\">Update</a></li>" +
													"<li class=\"nav-item\"><a class=\"nav-link remove\">Remove</a></li>" +
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
let removeText = removeContainer.querySelector(".action__text");
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

// render books on page
render();

// menu listener
let bookElements = document.querySelectorAll("[data-id]");
bookElements.forEach(function(bookEl) {
	hookUpBook(bookEl);
});