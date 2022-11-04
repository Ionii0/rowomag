import LocalStorageService from "../Services/LocalStorageService";

function getLoggedInUserNavbar(userCredentials) {
    return `
            <div class="right-navbar">
                <i class="fa-solid fa-coins"> <span style="padding:0.5rem">${userCredentials.tokens}</span></i>
                <a href="/#/cart" ><i class="fa-solid fa-cart-shopping"></i></a>
                <a href="/#/logout" style="margin-left:0.5rem"><i class="fa fa-sign-out"></i></a>
            </div>`
}

function getGuestUserNavbar () {
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
