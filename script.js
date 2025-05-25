// Supabase config
const supabaseUrl = 'https://YOUR_PROJECT.supabase.co';
const supabaseKey = 'YOUR_PUBLIC_ANON_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// State
let books = [];
let currentBookIndex = 0;
let currentImageIndex = 0;

// Elements
const booknameEl = document.getElementById('bookname');
const authorEl = document.getElementById('author');
const publisherEl = document.getElementById('publisher');
const bookidEl = document.getElementById('bookid');
const bookImageEl = document.getElementById('book-image');

document.getElementById('prev-book').onclick = () => changeBook(-1);
document.getElementById('next-book').onclick = () => changeBook(1);
document.getElementById('prev-image').onclick = () => changeImage(-1);
document.getElementById('next-image').onclick = () => changeImage(1);

async function fetchBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('bookid, bookname, author, publisher, images');

  if (error) {
    console.error('Error fetching books:', error);
    return;
  }

  books = data;
  if (books.length > 0) displayBook(0);
}

function displayBook(index) {
  const book = books[index];
  currentBookIndex = index;
  currentImageIndex = 0;

  booknameEl.textContent = book.bookname;
  authorEl.textContent = book.author;
  publisherEl.textContent = book.publisher;
  bookidEl.textContent = book.bookid;

  updateImage(book.images);
}

function updateImage(images) {
  if (!images || images.length === 0) {
    bookImageEl.src = '';
    return;
  }
  bookImageEl.src = images[currentImageIndex];
}

function changeBook(direction) {
  const newIndex = currentBookIndex + direction;
  if (newIndex >= 0 && newIndex < books.length) {
    displayBook(newIndex);
  }
}

function changeImage(direction) {
  const images = books[currentBookIndex].images;
  if (!images) return;
  const newIndex = currentImageIndex + direction;
  if (newIndex >= 0 && newIndex < images.length) {
    currentImageIndex = newIndex;
    updateImage(images);
  }
}

// Initialize
fetchBooks();
