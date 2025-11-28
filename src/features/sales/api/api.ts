class ApiService {
    private token: string | null = null;

    setToken(token: string): void {
        this.token = token;
    }

    getToken() {
        this.token = localStorage.getItem("token");
        return this.token;
    }

    private getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`
        }
    }

    private async getFetchByMethod(method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', url: string, body?: object): Promise<any> {
        try {
            const payload: RequestInit = {
                method: method,
                headers: this.getHeaders()
            };

            if (body) {
                payload.body = JSON.stringify(body);
            }

            const response = await fetch(url, payload);

            if (response.status === 204) {
                return;
            }

            const data = await response.json();
            if (!response.ok) {
                const apiMessage = data.detail || data.message || `Http status ${response.status}`
                throw new Error(`Api error ${apiMessage}`);
            }

            return data;

        }
        catch (error) {
            throw error
        }
    }

    async get(url: string): Promise<any> {
        return await this.getFetchByMethod('GET', url);
    }

    async post(url: string, body: object): Promise<any> {
        return await this.getFetchByMethod('POST', url, body);
    }

    async put(url: string, body: object): Promise<any> {
        return await this.getFetchByMethod('PUT', url, body);
    }

    async patch(url: string, body: object): Promise<any> {
        return await this.getFetchByMethod('PATCH', url, body);
    }

    async delete(url: string): Promise<any> {
        return await this.getFetchByMethod('DELETE', url);
    }

}

export const apiService = new ApiService();