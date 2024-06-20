document.addEventListener('DOMContentLoaded', () => {
    // получаем нужные элементы со страницы
    const form = document.getElementById('book-form');
    const bookList = document.getElementById('books');

    // загружаем книги из локального хранилища
    loadBooks();

    // отправление формы
    form.addEventListener('submit', addBook);

    // функция добавления новой книги
    function addBook(e) {
        e.preventDefault();

        // получаем значения из полей ввода
        const titleInput = document.getElementById('title');
        const authorInput = document.getElementById('author');
        const imageInput = document.getElementById('image');

        const title = titleInput.value;
        const author = authorInput.value;
        const image = imageInput.value;

        // проверяем, что заполнены обязательные поля
        if (title && author) {
            const book = { title, author, image };
            
            // добавляем книгу в список на странице и в локальное хранилище
            addBookToList(book);
            addBookToStorage(book);

            // очищаем поля ввода
            titleInput.value = '';
            authorInput.value = '';
            imageInput.value = '';
        }
    }

    // функция для добавления книги в список на странице
    function addBookToList(book) {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        
        // Создаем HTML для книги
        bookItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Автор: ${book.author}</p>
            <button class="delete-btn">Удалить</button>
        `;

        bookList.appendChild(bookItem);

        // обработчик события для кнопки удаления
        bookItem.querySelector('.delete-btn').addEventListener('click', () => {
            removeBook(bookItem, book);
        });
    }

    // функция для добавления книги в локальное хранилище
    function addBookToStorage(book) {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    // функция для загрузки книг из локального хранилище
    function loadBooks() {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.forEach(book => addBookToList(book));
    }

    // функция для удаления книги
    function removeBook(bookItem, book) {
        // скрипт алерт, для подтверждения пользователем
        if (confirm(`Вы уверены, что хотите удалить книгу "${book.title}"?`)) {
            bookItem.remove();
            removeBookFromStorage(book);
            alert(`Книга "${book.title}" успешно удалена!`);
        }
    }

    // функция для удаления книги из локального хранилища
    function removeBookFromStorage(book) {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books = books.filter(b => b.title !== book.title || b.author !== book.author);
        localStorage.setItem('books', JSON.stringify(books));
    }
});
