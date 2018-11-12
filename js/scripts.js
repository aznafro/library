// Book Object 
function Book(title, author, pages, read, synopsis) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.synopsis = synopsis;
}

let books = [
	new Book("The Hobbit", "J.R.R. Tolkien", 259, "read", "A hobbit goes on an adventure and come back after finding out something terrible has happened."),
	new Book("The Hobbit", "J.R.R. Tolkien", 259, "read", "A hobbit goes on an adventure and come back after finding out something terrible has happened."),
	new Book("The Hobbit", "J.R.R. Tolkien", 259, "read", "A hobbit goes on an adventure and come back after finding out something terrible has happened."),
	new Book("The Hobbit", "J.R.R. Tolkien", 259, "read", "A hobbit goes on an adventure and come back after finding out something terrible has happened."),
	new Book("The Hobbit", "J.R.R. Tolkien", 259, "read", "A hobbit goes on an adventure and come back after finding out something terrible has happened.")
];

// Add Event Listener for Adding a Book
let addButton = document.querySelector(".btn-add");
let addBookContainer = document.querySelector(".container-add-book");
let booksContainer = document.querySelector(".container-books");
let screen = document.querySelector(".screen");
addButton.addEventListener("click", function() {
	showAddNewBook();
});

let x = document.querySelector(".x");
x.addEventListener("click", function() {
	hideShowAddNewBook();
});

// Add Book
let addBook = document.querySelector(".add-book");
let inputTitle = document.querySelector("[name=\"title\"]");
let inputAuthor = document.querySelector("[name=\"author\"]");
let inputPages = document.querySelector("[name=\"pages\"]");
let inputRead = document.querySelector("[name=\"read\"]");
let inputSynopsis = document.querySelector("[name=\"synopsis\"]");
addBook.addEventListener("click", function() {
	let newBook = new Book(inputTitle.value, 
						inputAuthor.value, 
						inputPages.value,
						inputRead.value,
						inputSynopsis.value);
	books.push(newBook);
	renderHelper(newBook);
	hideShowAddNewBook();
});

// Render Books into list
let booksList = document.querySelector(".books .row");
function render() {
	books.forEach(function(book) {
		renderHelper(book);
	});
}

/**
	
	HELPER FUNCTIONS

**/
function renderHelper(book) {
	booksList.innerHTML += "<div class=\"track-sm-1-2 track-md-1-3 track-lg-1-4\">" +
								"<article class=\"book\">" +
									"<h3 class=\"title\">" + book.title + "</h3>" +
									"<p class=\"pages\">" + book.pages + " pgs</p>" +
									"<p class=\"author\">" + book.author + "</p>" +
									"<p class=\"read\">" + book.read + "</p>" +
									"<p class=\"synopsis\">" + book.synopsis + "</p>" +
					            "</article>" +
					        "</div>";
}

function showAddNewBook() {
	addBookContainer.classList.remove("hidden");
	screen.classList.remove("hidden");

	booksContainer.classList.add("blur");
	this.classList.add("blur");
}

function hideShowAddNewBook() {
	addBookContainer.classList.add("hidden");
	screen.classList.add("hidden");

	booksContainer.classList.remove("blur");
	addButton.classList.remove("blur");
}

render();