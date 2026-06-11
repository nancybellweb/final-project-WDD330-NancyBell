// /src/js/ExternalServices.mjs

export default class ExternalServices {
    constructor() {
        // Your specific Firebase Project ID from your console
        this.firestoreBaseUrl = "https://firestore.googleapis.com/v1/projects/YOUR_FIREBASE_PROJECT_ID/databases/(default)/documents";
    }

    // Generic, clean fetch handler for any standard API
    async convertToJson(res) {
        const jsonResponse = await res.json();
        if (res.ok) {
        return jsonResponse;
        } else {
        throw { name: 'servicesError', message: jsonResponse };
        }
    }

    // 1. ZenQuotes API Fetcher (No API Key required for basic usage)
    async getRandomQuote() {
        // Using a CORS proxy if running into localhost browser blocking restrictions
        const url = `https://corsproxy.io/?https://zenquotes.io/api/random`;
        const response = await fetch(url);
        const data = await this.convertToJson(response);
        return data[0]; // ZenQuotes returns an array containing the quote object
    }

    // 2. Vanilla Firebase Firestore GET (Retrieve Goals/Agenda)
    async getDocuments(collectionName) {
        const response = await fetch(`${this.firestoreBaseUrl}/${collectionName}`);
        return await this.convertToJson(response);
    }

    // 3. Vanilla Firebase Firestore POST (Save Goals/Agenda)
    async createDocument(collectionName, data) {
        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: data // Firestore REST API expects a "fields" map descriptor object
        })
        };
        const response = await fetch(`${this.firestoreBaseUrl}/${collectionName}`, options);
        return await this.convertToJson(response);
    }
}