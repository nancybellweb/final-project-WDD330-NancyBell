
export default class ExternalServices {
    constructor() {
        this.firestoreBaseUrl = 'https://firestore.googleapis.com/v1/projects/YOUR_FIREBASE_PROJECT_ID/databases/(default)/documents';
    }

    async convertToJson(res) {
        if (res.ok) {
        return await res.json();
        } else {
        throw { name: 'servicesError', message: await res.json() };
        }
    }

    //  quote fetcher
    async getRandomQuote() {
        // We change this to a completely open API that permits localhost origins
        const url = 'https://dummyjson.com/quotes/random';
        
        const response = await fetch(url);
        const data = await this.convertToJson(response);
        
        return {
        q: data.quote,
        a: data.author
        };
    }
}
