import CartManager from "../utils/CartManager.js";
import LocalStorageService from "../Services/LocalStorageService";
import ApiService from "../Services/ApiService";


const changeQuantityListener = (quantitySelectors) => {
    for (let selector of quantitySelectors) {
        selector.addEventListener('change', (e) => {
            const item = CartManager.getCartItems()
                .find((x) => x._id === selector.id);
            CartManager.addToCart({...item, quantity: Number(e.target.value)});
            CartView.reRenderView();
        })
    }
}

const deleteButtonListener = (deleteButtons) => {
    for (let button of deleteButtons) {
        button.addEventListener('click', (e) => {
            CartManager.deleteItemById(e.target.id);
            CartView.reRenderView();
        })
    }
}

const payButtonListener = (payButton) => {
    payButton.addEventListener('click', async () => {
        const cartItems = CartManager.getCartItems();
        const orderData = {
            items: cartItems,
            price: cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
        };
        try {
            await ApiService.sendOrder(orderData);
            const userCredentials = LocalStorageService.getCredentials();
            const price = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
            userCredentials.tokens = userCredentials.tokens - price;
            LocalStorageService.setCredentials(userCredentials);
            CartManager.deleteAllItems();
            document.location.hash = '/';
        } catch (e) {
            alert(e.message);
        }

    })
}

const CartView = {
    reRenderView: async () => {
        document.getElementById('main-container').innerHTML = await CartView.render();
        await CartView.afterViewInit();
    },
    afterViewInit: () => {
        const quantitySelectors = document.getElementsByClassName("quantity");
        const deleteButtons = document.getElementsByClassName("cart-button");
        const payButton = document.getElementById("pay-button");
        changeQuantityListener(quantitySelectors);
        deleteButtonListener(deleteButtons);
        payButtonListener(payButton);

    },
    render: () => {
        if (Object.keys((LocalStorageService.getCredentials())).length === 0) {
            document.location.hash = '/login';
            alert("You have to log in before accessing the CART page");
            return '';
        }
        const cartItems = CartManager.getCartItems();
        return `
        <div class="cart">
            <div class="cart-list">
                <ul class="cart-list-container">
                    <li> 
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                  
                        ${cartItems.length === 0 ? `<div>Your cart is empty</div>` :
            cartItems.map(item =>
                `<li>
                    <div class="cart-image">
                        <img src="${item.image}" alt="${item.name}"/>
                    </div>   
                    <div class="cart-name"> 
                        <div>${item.name}</div> 
                            <div class="cart-quantity">
                                Quantity: <input class="quantity" id="${item._id}" type="number" min="1" max="${item.stock}" value="${item.quantity}">
                                <button type="button" class="cart-button" id="${item._id}">Delete</button>
                            </div>  
                        
                        <div class="cart-price">
                            $${item.price}
                        </div>
                    </div>   
                </li>`
            ).join('\n')}
                </ul>
            </div>
              <div class="pay-cart">
                <h3> Total (${cartItems.reduce((a, c) => a + c.quantity, 0)} items):
                 <i class="fa-solid fa-coins" style="margin-right:1rem"></i>${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h3>
                <button id="pay-button" class="cart-button">Pay</button>
            </div>
        </div>
       `;
    }
};

export default CartView;
