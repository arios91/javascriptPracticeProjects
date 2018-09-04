//ui components
const container = document.querySelector('.container');
const bookForm = document.querySelector('#bookForm');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const isbnInput = document.querySelector('#isbn');
const bookList = document.querySelector('#bookList');

//book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//ui constructor
function UI(){}

//create addBook prototype method
UI.prototype.addBookToList = function(book){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`;
    bookList.appendChild(row);
    console.log()
}

//create clear fields prototype method
UI.prototype.clearFields = function(){
    titleInput.value = '';
    authorInput.value = '';
    isbnInput.value = '';
}

//create show message prototype method
UI.prototype.showMessage = function(msg, className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    //create textNode for div
    div.appendChild(document.createTextNode(msg));
    container.insertBefore(div, bookForm);
    //timeout after 3 secs
    setTimeout(function(){document.querySelector('.alert').remove();},3000);
}

//delete book prototype
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

initializeEventListeners();

function initializeEventListeners(){
    bookForm.addEventListener('submit', formSubmit);
    //event listener for delete
    bookList.addEventListener('click', deleteBook);
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

        ui.showMessage('Successfully added new book', 'success');
    
        ui.clearFields();
    }

    e.preventDefault();
}

function deleteBook(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showMessage('Successfully removed book', 'success');
    e.preventDefault();
}