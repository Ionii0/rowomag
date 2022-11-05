import LocalStorageService from "../Services/LocalStorageService.js";

const CartManager = {
    addToCart: (item) => {
        let cartItems = LocalStorageService.getCartItems();
        const existItem = cartItems.find(x => x._id === item._id);
        if (existItem) {
            cartItems = cartItems.map((x) => x._id === existItem._id ? item : x);
        } else {
            cartItems = [...cartItems, item];
        }
        LocalStorageService.setCartItems(cartItems);
    },
    getCartItems: () => {
        return LocalStorageService.getCartItems();
    },
    deleteItem: (item) => {
        const cartItems = LocalStorageService.getCartItems();
        LocalStorageService.setCartItems(cartItems.filter((x) => x !== item));
    },
    deleteItemById: (id) => {
        const cartItems = LocalStorageService.getCartItems();
        LocalStorageService.setCartItems(cartItems.filter((x) => x._id !== id));
    },
    deleteAllItems: () => {
        LocalStorageService.deleteAllCartItems();
    }
};
export default CartManager;
