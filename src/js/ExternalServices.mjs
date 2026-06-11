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

    // 1. ZenQuotes API Fetcher with CORS Proxy
async getRandomQuote() {
    const url = "https://zenquotes.io/api/random";
    
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    // AllOrigins wraps the original response inside a "contents" stringified JSON object
    if (data && data.contents) {
        const parsedContents = JSON.parse(data.contents);
        return parsedContents[0]; 
        }
        
        return data[0];
    }

    // 2. Vanilla Firebase Firestore GET - Goals Agenda
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
            fields: data 
        })
        };
        const response = await fetch(`${this.firestoreBaseUrl}/${collectionName}`, options);
        return await this.convertToJson(response);
    }
}