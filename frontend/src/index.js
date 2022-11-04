import HomeView from "./views/HomeView.js";
import ProductView from "./views/ProductView.js";
import {parseRequestUrl} from "./utils/UrlParser.js";
import ErrorView from "./views/ErrorView.js";
import CartView from "./views/CartView.js";
import LoginView from "./views/LoginView.js";
import LogoutView from "./views/LogoutView";
import HeaderRenderer from "./utils/HeaderRenderer";

const routes = {
    '/': HomeView,
    '/login': LoginView,
    '/product/:id': ProductView,
    '/cart/:id': CartView,
    '/cart': CartView,
    '/logout': LogoutView
}

const router = async () => {
    const request = parseRequestUrl();
    const resource = request.resource ? `/${request.resource}` : '/';
    const id = request.id ? `/:id` : '';
    const action = request.action ? `/${request.action}` : '';
    const parseUrl = resource + id + action;
    const view = routes[parseUrl] ? routes[parseUrl] : ErrorView;
    const main = document.getElementById("main-container");
    const header = document.getElementById("header-container");
    header.innerHTML = await HeaderRenderer.render();
    main.innerHTML = await view.render();
    await view.afterViewInit();
}
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
