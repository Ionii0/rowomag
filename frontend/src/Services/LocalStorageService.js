const LocalStorageService = {
    getCartItems: () => {
        const cartItems = localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')) :
            []; //Empty array
        return cartItems;
    },
    setCartItems: (cartItems) => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
};

export default LocalStorageService;
