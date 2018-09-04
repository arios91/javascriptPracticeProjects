//ui components
const container = document.querySelector('.container');
const bookForm = document.querySelector('#bookForm');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const isbnInput = document.querySelector('#isbn');
const bookList = document.querySelector('#bookList');

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBookToList(book){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>`;
        bookList.appendChild(row);
    }

    showMessage(msg, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        //create textNode for div
        div.appendChild(document.createTextNode(msg));
        container.insertBefore(div, bookForm);
        //timeout after 3 secs
        setTimeout(function(){document.querySelector('.alert').remove();},3000);
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        titleInput.value = '';
        authorInput.value = '';
        isbnInput.value = '';
    }
}

class Storage{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books')); 
        }
        return books;
    }

    static displayBooks(){
        const books = Storage.getBooks();
        const ui = new UI();
        books.forEach(book => {
            ui.addBookToList(book);
        })
    }
  
    static addBook(book){
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    
    static removeBook(isbn){
        const books = Storage.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

initializeEventListeners();

function initializeEventListeners(){
    bookForm.addEventListener('submit', formSubmit);
    //event listener for delete
    bookList.addEventListener('click', deleteBook);
    document.addEventListener('DOMContentLoaded', Storage.displayBooks());
}

function formSubmit(e){
    let title = titleInput.value,
        author = authorInput.value,
        isbn = isbnInput.value;

    //instantiate book object
    const book = new Book(title, author, isbn);

    //instantiate UI 
    const ui = new UI();

    //validate entry
    if(title === '' || author === '' || isbn === ''){
        ui.showMessage('Please fill in all fields', 'error');
    }else{
        ui.addBookToList(book);

        //add book to local storage
        Storage.addBook(book);

        ui.showMessage('Successfully added new book', 'success');
    
        ui.clearFields();
    }

    e.preventDefault();
}

function deleteBook(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    //remove from local storage
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showMessage('Successfully removed book', 'success');
    e.preventDefault();
}

