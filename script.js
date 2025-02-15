var addBtn = document.querySelector(".addBtn");
var favDialog = document.getElementById("favDialog");
var submitBtn = document.querySelector(".submitBtn");
addBtn.addEventListener("click", function onOpen() {
  if (typeof favDialog.showModal === "function") {
    favDialog.showModal();
  } else {
    alert("The <dialog> API is not supported by this browser");
  }
});
let container = document.querySelector(".container");
const Library = [];

class Book {
  constructor(bookName, authorName, pages, state) {
    this.bookName = bookName;
    this.authorName = authorName;
    this.pages = pages;
    this.state = state.checked ? "Read" : "Not Read";
  }
  addBook() {
    let div = document.createElement("div");
    div.classList.add("box");
    let changeState = document.createElement("input");
    changeState.setAttribute("type", "checkbox");
    changeState.checked = this.state === "Read";
    let button = document.createElement("button");
    button.innerHTML = "Delete";
    button.classList.add("deleteBtn");
    div.innerHTML = `
      <strong>Book:</strong> ${this.bookName} <br>
      <strong>Author:</strong> ${this.authorName} <br>
      <strong>Pages:</strong> ${this.pages} <br>
      <strong>Status:</strong> <span class="bookStatus">${this.state}</span> <br>
    `;
    changeState.addEventListener("change", function () {
      let statusText = div.querySelector(".bookStatus");
      if (changeState.checked) {
        statusText.textContent = "Read";
      } else {
        statusText.textContent = "Not Read";
      }
    });
    button.addEventListener("click", function () {
      let bookIndex = Library.findIndex(
        (book) => book.bookName === div.querySelector("strong").nextSibling.textContent.trim()
      );
      if (bookIndex !== -1) {
        Library.splice(bookIndex, 1);
      }
      div.remove();
    });
    div.appendChild(changeState);
    div.appendChild(button);
    container.appendChild(div);
  }
}
function addDefaultBook(){
    let book1 = new Book("Namste Bharat","Avi","150",true);
book1.addBook();
Library.push(book1);
}

addDefaultBook();
function addBookToLibrary() {
  var bookName = document.getElementById("bookName").value;
  var authorName = document.getElementById("authorName").value;
  var pages = document.getElementById("pages").value;
  var state = document.getElementById("state");
  if (!bookName || !authorName || !pages) {
    alert("You need to fill in all details");
    return; 
  }
  let book = new Book(bookName, authorName, pages, state);
  book.addBook();
  Library.push(book);
  document.getElementById("bookName").value = "";
  document.getElementById("authorName").value = "";
  document.getElementById("pages").value = "";
  state.checked = false;
  favDialog.close();
}

submitBtn.addEventListener("click", addBookToLibrary);
