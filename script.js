const myLibrary = [];
const addnew = document.getElementById("addnew");
const bookform = document.getElementById("bookform");
const dial = document.getElementById("dial");
const library = document.getElementById("library");
const submitBtn = document.getElementById("submitBtn");

//submitBtn.addEventListener('click',)

addnew.addEventListener('click', () => {
    dial.showModal();
});

dial.addEventListener('close', () => {
    addBook();
})

dial.addEventListener("click", (e) => {
  const dialogDimensions = dial.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dial.close();
  }
});

class Book {
    constructor(title, author, nbPages, readStatus, bookID) {
        this.title = title;
        this.author = author;
        this.nbPages = nbPages;
        this.status = readStatus;
        this.ID = bookID;
        this.getID = function () {
            return this.ID;
        };
        this.info = function () {
            return this.title + " by " + this.author + ", " + this.nbPages + " pages, " + this.status + ".";
        };
    }
}



function addBook() {

    if (dial.returnValue === "save") {
        const data = new FormData(bookform);

        const title = data.get('title');
        const author = data.get('author');
        const pages = data.get('pages');
        const read = data.get('read');
        const bookID = crypto.randomUUID();
        const book = new Book(title, author, pages, read, bookID);
        myLibrary.push(book);

        console.log(book.info());







        let bContainer = document.createElement("div");
        bContainer.classList.add("book");
        bContainer.id = bookID;

        let t = document.createElement("div");
        t.classList.add("title");
        t.innerText = book.title;

        let a = document.createElement("div");
        a.classList.add("author");
        a.innerText = book.author;

        let p = document.createElement("div");
        p.classList.add("pages");
        p.innerText = book.nbPages + " pages";

        let r = document.createElement("div");
        r.classList.add("read");
        r.innerText = book.status;

        let readBtn = document.createElement("button");
        readBtn.classList.add("readBtn");
        readBtn.innerText = book.status;
        if (book.status === "read") {
            readBtn.classList.add("readBook");
        } else {
            readBtn.classList.add("unreadBook");
        }
        readBtn.addEventListener('click', () => {
            statusChange(book, readBtn, r);
        });

        let remBtn = document.createElement("button");
        remBtn.classList.add("removeBtn");
        remBtn.innerText = "Remove";
        remBtn.addEventListener('click', () => {
            removeBook(bookID);
        });


        bContainer.append(t, a, p, r, readBtn, remBtn);

        library.append(bContainer);
    }
    bookform.reset();
    dial.returnValue = "";
}

function statusChange(book, button, text) {
    book.status = (book.status === "read") ? "unread" : "read";
    if (book.status === "read") {
        button.classList.add("readBook");
        button.classList.remove("unreadBook");
    } else {
        button.classList.remove("readBook");
        button.classList.add("unreadBook");
    }
    button.innerText = book.status;

    text.innerText = book.status;
}

function removeBook(bookID) {
    const book = document.getElementById(bookID);
    book.remove();

    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].getID() === bookID) {
            myLibrary.splice(i);
            return;
        }
    }
}




