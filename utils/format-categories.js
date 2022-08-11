export default function formatCategories(categories) {
  return categories
    .replace(",", "")
    .replace(")", "")
    .replace("(", "")
    .split(" ")
    .filter((c) => c.length > 2);
}
