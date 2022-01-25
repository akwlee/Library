
const addBook = document.getElementById('newBookBtn')
const booksGrid = document.getElementById('booksGrid')
const forms = document.getElementById('bookForm')
const submitButton = document.getElementById('submit')
const titleError = document.getElementById('titleError')
const authorError = document.getElementById('authorError')
const pagesError = document.getElementById('pagesError')
const modal = document.getElementById('newBookModal')
const closeButton = document.getElementById('closeBtn')
const exists = document.getElementById('exists')
exists.setAttribute('visibility','hidden')

//Adding a completely unnecessary toast
var toastLiveExample = document.getElementById('liveToast')
var toastBody = document.getElementById('toastBody')
if (submitButton) {
    submitButton.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)
        createBookFromInput()
        toast.show()
    })
}



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
        if(!this.isInLibrary(newBook)){
            this.books.push(newBook)
            return true
        }
        else{
            return false
        }
    }

    getBook(title){
        return this.books.find((book) => book.title !== title)
    }

    isInLibrary(newBook){
        return this.books.some((book) => book.title == newBook.title)
    }

    removeBook(newBook){
    this.books = this.books.filter((book) => book.title == newBook.title)
    }
}

const myLibrary = new Library()


function displayLibrary(){
    myLibrary.books.forEach(book => {
        createCard(book)
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
    pages.textContent = book.pages + " pages"
    if(book.read){
        read.textContent = "Mark as Unread"
    }
    else{
        read.textContent = "Mark as Read"
    }
    remove.textContent = "Remove From Library"

  

    bookCard.classList.add('bookCard')
    read.classList.add('readButton')
    remove.classList.add('removeButton')
    title.setAttribute
    read.onclick = toggleRead
    remove.addEventListener('click', function(){
        bookCard.remove()
        myLibrary.removeBook(title);
    });
    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    bookCard.appendChild(read)
    bookCard.appendChild(remove)
    bookCard.style.backgroundColor = randomizeColor()
    booksGrid.appendChild(bookCard)
}

function createBookFromInput() {
    const author = document.getElementById('author').value
    const title = document.getElementById('title').value
    const pages = document.getElementById('pages').value
    const read = document.getElementById('read').checked
    if(author == '' || title == '' || !(pages >=1)){
        console.log('invalid form!')
        return
    }
    else{  
        book = new Book(author, title, pages, read)
        if (myLibrary.addBook(book)){
          //close the modal if successful
            closeBtn.click()
            createCard(book)
            forms.reset()
            exists.setAttribute('visibility','hidden')
            toastBody.textContent = book.title + " Added To Your Library!"
        }
        else{
            exists.textContent = 'Book Already Exists! Please Enter A Different Book'
            exists.setAttribute('visibility','visible')
        }
    }
}

function addBookToLibrary(book)
{
    if(!myLibrary.getBook(book.title)){
        myLibrary.addBook(book)
        createCard(book)
    }

}


function toggleRead(title){
    if (myLibrary.getBook(title).read){
        myLibrary.getBook(title).read = false
        read.textContent = "Mark as Unread"
    }
    else
        myLibrary.getBook(title).read
}

function randomizeColor (){
    var x = Math.floor(Math.random() * 256)
    var y = Math.floor(Math.random() * 256)
    var z = Math.floor(Math.random() * 256)
    var bgColor = "rgb("+x + "," + y + "," + z + ")"

    return bgColor
}


(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }
            form.classList.add('was-validated')
        })
        })
})()

