
const addBook = document.getElementById('newBookBtn')
const modal = document.getElementById('newBookModal')
const booksGrid = document.getElementById('booksGrid')
const form = document.getElementById('bookForm')
const submitButton = document.getElementById('submit')

modal.style.visibility = "hidden"
addBook.onclick = addBookModal
submitButton.onclick = createBookFromInput


function Book(author,title,pages,read){
        this.author = author
        this.title = title
        this.pages = pages
        this.read = read
    }

class Library{
    constructor(){
        this.books = []
    }
    addBook(newBook){
        if(!this.isInLibrary(newBook))
            this.books.push(newBook)
    }

    getBook(title){
        return this.books.find((book) => book.title !== title)
    }

    isInLibrary(newBook){
        return this.books.some((book) => book.title === newBook.title)
    }

    removeBook(newBook){
    this.books = this.books.filter((book) => book.title !== newBook.title)
    }
}

const myLibrary = new Library()

function displayLibrary(){
    myLibrary.books.forEach(book => {
        createCard(book)
        //console.log(book)
    });
}


function createCard(book){
    let bookCard = document.createElement('div')
    let title = document.createElement('h3')
    let author = document.createElement('h3')
    let pages = document.createElement('h3')
    let read = document.createElement('button')
    let remove = document.createElement('button')
    title.textContent = book.title
    author.textContent = book.author
    pages.textContent = book.pages
    console.log(book.read)
    if(book.read){
        read.textContent = "Mark as Unread"
        read.classList.add('btn-light-green')
    }
    else{
        read.textContent = "Mark as Read"
        read.classList.add('btn-light-red')
    }
    remove.textContent = "Remove From Library"

    bookCard.classList.add('bookCard')
    read.onclick = toggleRead
    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    bookCard.appendChild(read)
    bookCard.appendChild(remove)
    booksGrid.appendChild(bookCard)
}

function createBookFromInput(){
    const author = document.getElementById('author').value
    const title = document.getElementById('title').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked
    book = new Book(author,title,pages,read)
    myLibrary.addBook(book)
    createCard(book)
    closeModal()
    form.reset()
}

function addBookToLibrary(book)
{
    if(!myLibrary.getBook(book.title)){
        myLibrary.addBook(book)
        createCard(book)
    }

}

function removeBookFromLibrary(book)
{
    if(myLibrary.isInLibrary(book))
        myLibrary.removeBook(book.title)

}

function addBookModal(){
    modal.style.visibility = "visible"
    
}

function closeModal(){
    modal.style.visibility = "hidden"
}

function toggleRead(title){
    if (myLibrary.getBook(title).read)
        myLibrary.getBook(title).read = false
    else
        myLibrary.getBook(title).read
}


