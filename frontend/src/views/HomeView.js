import ApiService from "../Services/ApiService";
import CartManager from "../utils/CartManager";
import LocalStorageService from "../Services/LocalStorageService";

const addToCartButtonListener =  (buttonDivs) => {
    for (let button of buttonDivs) {
       button.addEventListener("click", async (e) => {
            const product = await ApiService.getProductById(e.currentTarget.id);
            await  CartManager.addToCart({...product, quantity: Number(1)});
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
        const response = await fetch("http://localhost:5000/api/products", {
            headers: {
                'Content-Type': 'application/json'
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
                   <button class="button-div" id="${product._id}">Add to <i class="fa-solid fa-cart-shopping"></i></button>                   
                </div>
              </div>
            </li>`)}
        </ul>`
    }
};
export default HomeView;
