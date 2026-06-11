// Append these functions to the bottom of your existing /src/js/utils.mjs file

// Helper to fetch an external raw text HTML snippet/partial
async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load template layout snippet from target path: ${path}`);
  }
  const text = await response.text();
  return text;
}

// Global utility to pull down layouts and load them into their respective headers/footers
export async function loadHeaderFooter() {
    try {
        // 1. Fetch template partial documents concurrently
        const headerTemplate = await loadTemplate("/partials/header.html");
        const footerTemplate = await loadTemplate("/partials/footer.html");

        // 2. Locate target element boxes in your main index document structure
        const headerElement = document.querySelector("#main-header");
        const footerElement = document.querySelector("#main-footer");

        // 3. Mount text configurations to page target items
        if (headerElement) headerElement.innerHTML = headerTemplate;
        if (footerElement) footerElement.innerHTML = footerTemplate;
    } catch (error) {
        console.error("Layout dynamic rendering sequence exception caught:", error);
    }
}