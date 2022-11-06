import LocalStorageService from "../Services/LocalStorageService";

function getLoggedInUserNavbar(userCredentials) {
    const ordersIconandCreateUserIcon = `<a href="/#/create-user" style="margin-right:1rem"><i class="fa-solid fa-user-plus"></i></a>
                                         <a href="/#/orders" style="margin-right:0.5rem"><i class="fa-solid fa-truck-fast"></i></a>`;
    return `
            <div class="right-navbar">
                ${userCredentials.isAdmin ? ordersIconandCreateUserIcon : ''}
                <span style="padding:0.5rem">${userCredentials.tokens}</span><i class="fa-solid fa-coins"></i>
                <a href="/#/cart" style="margin-left:0.5rem"><i class="fa-solid fa-cart-shopping"></i></a>
                <a href="/#/logout" style="margin-left:0.5rem"><i class="fa fa-sign-out"></i></a>
            </div>`
}

function getGuestUserNavbar() {
    return `
      
    `
}

const HeaderRenderer = {
    afterViewInit: () => {

    },
    render: () => {
        const userCredentials = LocalStorageService.getCredentials();
        return `
      <div class="brand">
            <a href="/#/">RowoMag</a>
        </div>
        ${userCredentials.username ? getLoggedInUserNavbar(userCredentials) : getGuestUserNavbar()}
      `
    }
}

export default HeaderRenderer;
