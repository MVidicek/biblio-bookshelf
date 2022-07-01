export async function loadBooks(startIndex = 0, maxResults = 8) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=Hobbit&startIndex=${startIndex}&maxResults=${maxResults}`
  );
  const data = await res.json();

  return data;
}
