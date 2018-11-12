// Book Object 
function Book(id, title, author, pages, read, synopsis) {
	this.id = id;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.synopsis = synopsis;
}

let id = 0;
let bookObjects = [
	new Book(id++, "The Hobbit", "J.R.R. Tolkien", 259, "read", "A hobbit goes on an adventure and come back after finding out something terrible has happened."),
	new Book(id++, "The Hobbit", "J.R.R. Tolkien", 259, "read", "A hobbit goes on an adventure and come back after finding out something terrible has happened."),
	new Book(id++, "The Hobbit", "J.R.R. Tolkien", 259, "read", "A hobbit goes on an adventure and come back after finding out something terrible has happened."),
	new Book(id++, "The Hobbit", "J.R.R. Tolkien", 259, "read", "A hobbit goes on an adventure and come back after finding out something terrible has happened."),
	new Book(id++, "The Hobbit", "J.R.R. Tolkien", 259, "read", "A hobbit goes on an adventure and come back after finding out something terrible has happened.")
];

/**
	
	EVENT LISTENERS

**/
let addButton = document.querySelector(".btn-add");
let addBookContainer = document.querySelector(".container-add-book");
let booksContainer = document.querySelector(".container-books");
let header = document.querySelector(".header");
let screen = document.querySelector(".screen");
addButton.addEventListener("click", function() {
	showContainer(addBookContainer);
});

// all the cancel buttons
document.querySelector(".container-add-book .x").addEventListener("click", function() {
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
													"<li class=\"nav-item\"><a class=\"nav-link edit\">Edit</a></li>" +
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

function hookUpBook(bookEl) {
	// toggle menu button
	bookEl.querySelector(".fa-ellipsis-h").addEventListener("click", function() {
		bookEl.querySelector(".menu").classList.toggle("menu-show");
	});

	// delete
	bookEl.querySelector(".remove").addEventListener("click", function() {
		let title = bookEl.querySelector(".title").textContent;
		removeContainer.querySelector(".remove__text").textContent += "'" + title + "'?";

		removeContainer.querySelector(".remove__confirm").addEventListener("click", function() {
			bookEl.remove();
			
			for(let i=0; i < bookObjects.length; i++) {
				if(bookObjects[i].id == bookEl.getAttribute("data-id")) {
					bookObjects.splice(i, 1);
					break;
				}
			}

			hideContainer(removeContainer);
		});

		showContainer(removeContainer);

		bookEl.querySelector(".menu").classList.toggle("menu-show");
	});



	// edit
	bookEl.querySelector(".edit").addEventListener("click", function() {
		console.log("EDIT!");

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