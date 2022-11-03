const ApiService = {
    getProductById: async (id) => {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response || !response.ok) {
            console.log(response);
            return `<div> Error getting product with id{ ${id} } from server</div>`;
        }
        return await response.json();
    },
    login: async (username, password) => {
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        });
        if (!response || !response.ok) {
            console.error(response);
            throw new Error(response.statusText);
        }
        return await response.json();
    }
};

export default ApiService;
