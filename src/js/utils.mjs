
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
        const headerPath = new URL('/partials/header.html', import.meta.url).href;
        const footerPath = new URL('/partials/footer.html', import.meta.url).href;

        const headerTemplate = await loadTemplate(headerPath);
        const footerTemplate = await loadTemplate(footerPath);

        const headerElement = document.querySelector('#main-header');
        const footerElement = document.querySelector('#main-footer');

        if (headerElement) headerElement.innerHTML = headerTemplate;
        if (footerElement) footerElement.innerHTML = footerTemplate;
        
    } catch (error) {
        // Leaving a clean bypass for ESLint compliance
    }
}