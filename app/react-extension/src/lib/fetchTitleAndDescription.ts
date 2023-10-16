async function fetchWithTimeout(url: string, timeout: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
async function fetchTitleAndDescription(url: string) {
  try {
    const response = await fetchWithTimeout(url, 10000); // Timeout after 10 seconds
    // console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const titleSelecter = doc.querySelector("title");
    const title = titleSelecter ? titleSelecter.textContent : "";
    const metaDescription = doc.querySelector('meta[name="description"]');
    const description = metaDescription
      ? metaDescription.getAttribute("content")
      : "";
    // console.log(title, description);
    return { title, description };
  } catch (error) {
    console.error("Error fetching or parsing content:", error);

    return { title: "", description: "" };
  }
}

export { fetchTitleAndDescription };
