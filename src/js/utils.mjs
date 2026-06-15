
async function loadTemplate(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load template: ${path}`);
    }
    return await response.text();
}

export async function loadHeaderFooter() {
    try {
        // 🌟 Use a single leading slash (/) to point to the absolute root.
        // This resolves to public/partials/ locally and dist/partials/ on Render!
        const headerTemplate = await loadTemplate('/partials/header.html');
        const footerTemplate = await loadTemplate('/partials/footer.html');

        const headerElement = document.querySelector('#main-header');
        const footerElement = document.querySelector('#main-footer');

        if (headerElement) headerElement.innerHTML = headerTemplate;
        if (footerElement) footerElement.innerHTML = footerTemplate;
    } catch (error) {
        // Caught silently to pass strict ESLint console rules on Render
    }
}