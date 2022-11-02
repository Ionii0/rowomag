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
    }
};

export default ApiService;
