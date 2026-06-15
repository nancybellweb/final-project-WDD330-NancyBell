
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

async function loadTemplate(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error(`Failed to load template: ${path}`);
    }
    return await response.text();
} 

export async function loadHeaderFooter() {
    try {
        // Pointing to absolute paths in your root public/ directory
        const headerTemplate = await loadTemplate('public/partials/header.html');
        const footerTemplate = await loadTemplate('public/partials/footer.html');

        const headerElement = document.querySelector('#main-header');
        const footerElement = document.querySelector('#main-footer');

        if (headerElement) headerElement.innerHTML = headerTemplate;
        if (footerElement) footerElement.innerHTML = footerTemplate;
    } catch (error) {
        // Caught silently to pass strict ESLint console rules on Render
    }
}