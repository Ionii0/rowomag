import HomeView from "./views/HomeView.js";
import {parseRequestUrl} from "./utils/UrlParser.js";
import ErrorView from "./views/ErrorView.js";
import CartView from "./views/CartView.js";
import LoginView from "./views/LoginView.js";
import LogoutView from "./views/LogoutView";
import AdminView from "./views/AdminView";

const routes = {
    '/': HomeView,
    '/admin': AdminView,
    '/cart': CartView,
    '/login': LoginView,
    '/logout': LogoutView
}

const Router = {
    getCurrentView:() => {
        const request = parseRequestUrl();
        const resource = request.resource ? `/${request.resource}` : '/';
        const id = request.id ? `/:id` : '';
        const action = request.action ? `/${request.action}` : '';
        const parseUrl = resource + id + action;
        return routes[parseUrl] ? routes[parseUrl] : ErrorView;
    }
}

export default Router
