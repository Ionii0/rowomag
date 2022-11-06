import ApiService from "../Services/ApiService";
import LocalStorageService from "../Services/LocalStorageService";

const deliverButtonsListener = (deliverButtons) => {
    for (let button of deliverButtons) {
        button.addEventListener('click', async (e) => {
            await ApiService.deliverOrderById(e.target.id, LocalStorageService.getCredentials());
            await AdminView.reRenderView();
        })
    }
};

const AdminView = {
    reRenderView: async () => {
        document.getElementById('main-container').innerHTML = await AdminView.render();
        await AdminView.afterViewInit();
    },
    afterViewInit: () => {
        const deliverButtons = document.getElementsByClassName("admin-button");
        deliverButtonsListener(deliverButtons);
    },
    render: async () => {
        const userCredentials = LocalStorageService.getCredentials();
        const pendingOrders = await ApiService.getPendingOrders(userCredentials);
        const deliveredOrders = await ApiService.getDeliveredOrders(userCredentials);
        return `
        <div class="admin">
            <div class="admin-list">
                <ul class="admin-list-container">
                    <li> 
                        <h3>Pending Orders</h3>
                        <div>Action</div>
                    </li>
                  
                        ${pendingOrders.length === 0 ? `<div>Your cart is empty</div>` :
            pendingOrders.map(item =>
                `<li>
                    <div class="admin-order"> 
                        ${item.username}: ${item.items.map(product => `&nbsp ${product.name} (${product.quantity}) `)}
                            <button id="${item._id}" class="admin-button">Deliver</button>
                    </div>   
                </li>`
            ).join('\n')}
                </ul>
            </div>
            <div class="admin-delivered-list">
                <ul class="admin-delivered-list-container" id="admin-delivered">
                    <li> 
                        <h3>Delivered Orders</h3>
                    </li>
                        ${deliveredOrders.length === 0 ? `<div>Your cart is empty</div>` :
            deliveredOrders.map(item =>
                `<li>
                    <div class="admin-order"> 
                        <div>${item.username}: ${item.items.map(product => `&nbsp ${product.name} (${product.quantity}) `)}</div>  
                    </div>   
                </li>`
            ).join('\n')}
                </ul>
            </div>
        </div>
       `;
    }

}

export default AdminView;
