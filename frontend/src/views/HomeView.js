import ApiService from "../Services/ApiService";
import CartManager from "../utils/CartManager";
import LocalStorageService from "../Services/LocalStorageService";
import Config from "../Config";

const addToCartButtonListener = (buttonDivs) => {
    for (let button of buttonDivs) {
        button.addEventListener("click", async (e) => {
            const product = await ApiService.getProductById(e.currentTarget.id, LocalStorageService.getCredentials());
            CartManager.addToCart({...product, quantity: Number(1)});
            alert(`You have added ** ${product.name} ** to the cart!`);
        });
    }
}

const HomeView = {
    afterViewInit: () => {
        const buttonDivs = document.getElementsByClassName('button-div');
        addToCartButtonListener(buttonDivs);
    },
    render: async () => {
        if (Object.keys((LocalStorageService.getCredentials())).length === 0) {
            document.location.hash = '/login';
            return '';
        }
        const response = await fetch(`${Config.api}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${LocalStorageService.getCredentials().jwt}`
            }
        });
        if (!response || !response.ok) {
            console.log(response);
            return `<div> Error getting products from server</div>`;
        }
        const products = await response.json();
        return `
        <ul class="products">
            ${products.map(product =>
            `<li>
             <div class="product">
                <a href="/#/product/${product._id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>
                <div class="product-name">
                    <a href="/#/product/${product._id}">
                        ${product.name}
                    </a>
                </div>
                <div class="product-price">
                   <i class="fa-solid fa-coins"></i> ${product.price}
                   ${product.stock <= 0 ?
                     `<span id="${product._id}"> Item out of stocks</span>`
                                        :
                     `<button class="button-div" id="${product._id}">Add to <i class="fa-solid fa-cart-shopping"></i></button>`
                  }
                </div>
              </div>
            </li>`)}
        </ul>`
    }
};
export default HomeView;
