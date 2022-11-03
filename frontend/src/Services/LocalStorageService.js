const LocalStorageService = {
    getCartItems: () => {
        const cartItems = localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')) :
            []; //Empty array
        return cartItems;
    },
    getCredentials: () => {
        const credentials = localStorage.getItem('credentials') ? JSON.parse(localStorage.getItem('credentials')) : {};
        return credentials;
    },
    setCartItems: (cartItems) => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    },
    setCredentials: (credentials) => {
        localStorage.setItem('credentials', JSON.stringify(credentials));
    },
    deleteCredentials: () => {
        localStorage.setItem('credentials', JSON.stringify({}));
    }
};

export default LocalStorageService;
