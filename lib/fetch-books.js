export async function loadBooks() {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=Hobbit`
  );
  const data = await res.json();

  return data;
}
