export function qs(selector, parent = document) {
    return parent.querySelector(selector);
    }

    // Ensure your other utility functions are exported too:
    export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
    }

    export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    }

    // Your async template loaders...
    async function loadTemplate(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load template: ${path}`);
    }
    return await response.text();
    }

    export async function loadHeaderFooter() {
    try {
        const headerTemplate = await loadTemplate('/src/partials/header.html');
        const footerTemplate = await loadTemplate('/src/partials/footer.html');

        const headerElement = document.querySelector('#main-header');
        const footerElement = document.querySelector('#main-footer');

        if (headerElement) headerElement.innerHTML = headerTemplate;
        if (footerElement) footerElement.innerHTML = footerTemplate;
    } catch (error) {
        console.error('Layout dynamic rendering error:', error);
    }
}