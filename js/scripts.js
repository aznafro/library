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

let removeNo = document.querySelector(".remove__cancel");
removeNo.addEventListener("click", function() {
	hideContainer(removeContainer);
});

// Add Book
let addBook = document.querySelector(".add-book");
let inputTitle = document.querySelector("[name=\"title\"]");
let inputAuthor = document.querySelector("[name=\"author\"]");
let inputPages = document.querySelector("[name=\"pages\"]");
let inputRead = document.querySelector("[name=\"read\"]");
let inputSynopsis = document.querySelector("[name=\"synopsis\"]");
addBook.addEventListener("click", function() {
	let newBook = new Book(id++, 
							inputTitle.value, 
							inputAuthor.value, 
							inputPages.value,
							inputRead.value,
							inputSynopsis.value);
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

// attach remove confirm event listener
removeConfirm.addEventListener("click", remove);

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

		showContainer(removeContainer);

		bookEl.querySelector(".menu").classList.toggle("menu-show");
	});

	// update
	bookEl.querySelector(".update").addEventListener("click", function() {
		let bookTitle = bookEl.querySelector(".title");
		let bookAuthor = bookEl.querySelector(".author");
		let bookPages = bookEl.querySelector(".pages");
		let bookRead = bookEl.querySelector(".read");
		let bookSynopsis = bookEl.querySelector(".synopsis");

		document.body.innerHTML += "<div class=\"update-container\">" + 
										"<span class=\"x\">" +
											"X" +
										"</span>" +
		 								"<h3 class=\"update__header\">Update Book</h3>" +
										"<form class=\"update__form\" action=\"\">" +
											"<div class=\"track-1-2 input-box\">" +
												"<input class=\"form-input\" type=\"text\" name=\"title\" placeholder=\"Title\" value=\"" + bookTitle.textContent + "\" required>" +
											"</div>" +
											"<div class=\"track-1-2 input-box\">" +
												"<input class=\"form-input\" type=\"text\" name=\"author\" placeholder=\"Author\" value=\"" + bookAuthor.textContent + "\" required>" +
											"</div>" +
											"<div class=\"row\">" +
												"<div class=\"track-1-2 input-box\">" +
													"<input class=\"form-input\" type=\"number\" name=\"pages\" value=\"" + bookPages.textContent.split(" ")[0] + "\" placeholder=\"Pages\">" +
												"</div>" +
												"<div class=\"track-1-2 input-box\">" +
													"<input class=\"form-input\" type=\"text\" name=\"read\" value=\"" + bookRead.textContent + "\" placeholder=\"Read?\">" +
												"</div>" +
											"</div>" +
											"<div class=\"input-box\">" +
												"<textarea class=\"form-input\" name=\"synopsis\" placeholder=\"Synopsis\" required>" + bookSynopsis.textContent + "</textarea>" +
												"<button class=\"btn btn-form update__confirm\">Update</button>" +
											"</div>" +
										"</form>" +
									"</div>";

		// prevent form from updating page
		let updateContainer = document.querySelector(".update-container");
		let form = updateContainer.querySelector(".update__form");
		form.addEventListener("submit", function(e) {
			e.preventDefault();

			let book;
			for(let i=0; i < bookObjects.length; i++) {
				book = bookObjects[i];
				if(book.id == bookEl.getAttribute("data-id")) {
					break;
				}
			};

			// save values in our data structure
			book.title = updateContainer.querySelector("[name=\"title\"]").value;
			book.author = updateContainer.querySelector("[name=\"author\"]").value;
			book.pages = updateContainer.querySelector("[name=\"pages\"]").value;
			book.read = updateContainer.querySelector("[name=\"read\"]").value;
			book.synopsis = updateContainer.querySelector("[name=\"synopsis\"]").value;

			// update our view from our data structure
			bookTitle.textContent = book.title;
			bookAuthor.textContent = book.author;
			bookPages.textContent = book.pages + "pgs";
			bookRead.textContent = book.read;
			bookSynopsis.textContent = book.synopsis;

			updateContainer.remove();
			unblur();
		});

		// add event listeners to the buttons in the update container
		updateContainer.querySelector(".x").addEventListener("click", function() {
			updateContainer.remove();
			unblur();
		});

		blur();
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