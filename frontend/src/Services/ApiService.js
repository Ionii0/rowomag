import LocalStorageService from "./LocalStorageService";
import Config from "../Config";

const ApiService = {

    getProductById: async (id, userCredentials) => {
        const response = await fetch(`${Config.api}/api/products/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userCredentials.jwt}`
            }
        });
        if (!response || !response.ok) {
            return `<div> Error getting product with id{ ${id} } from server</div>`;
        }
        return await response.json();
    },

    getPendingOrders: async (userCredentials) => {
        const response = await fetch(`${Config.api}/api/order/pending`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userCredentials.jwt}`
            }
        });
        if (!response || !response.ok) {
            const responseJson = await response.json();
            throw new Error(responseJson.message);
        }
        return await response.json();
    },

    getDeliveredOrders: async (userCredentials) => {
        const response = await fetch(`${Config.api}/api/order/delivered`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userCredentials.jwt}`
            }
        });
        if (!response || !response.ok) {
            const responseJson = await response.json();
            throw new Error(responseJson.message);
        }
        return await response.json();
    },

    login: async (username, password) => {
        const response = await fetch(`${Config.api}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        });
        if (!response || !response.ok || response.statusText !== 'OK') {
            const responseJson = await response.json();
            throw new Error(responseJson.message);
        }
        return response.json();
    },

    createUser: async (newUserData, userCredentials) => {
        const response = await fetch(`${Config.api}/api/user/create-user`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userCredentials.jwt}`
            },
            body: JSON.stringify({
                username: newUserData.username,
                password: newUserData.password,
                tokens: newUserData.tokens
            })
        });
        if (!response || response.statusText !== 'Created') {
            const responseJson = await response.json();
            throw new Error(responseJson.message);
        }
        return response.json();
    },

    sendOrder: async (orderData) => {
        const userCredentials = LocalStorageService.getCredentials();
        const response = await fetch(`${Config.api}/api/order/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userCredentials.jwt}`
            },
            body: JSON.stringify(orderData)
        });
        if (!response || response.statusText !== 'Created') {
            const responseJson = await response.json();
            throw new Error(responseJson.message);
        }
        return response.json();
    },

    deliverOrderById: async (id, userCredentials) => {
        const response = await fetch(`${Config.api}/api/order/deliver-order/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userCredentials.jwt}`
            }
        });
        if (!response || !response.ok) {
            const responseJson = await response.json();
            throw new Error(responseJson.message);
        }
        return await response.json();
    }

};

export default ApiService;
