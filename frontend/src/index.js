import Router from "./Router";
import HeaderRenderer from "./utils/HeaderRenderer";

const renderView = async () => {
    const view = Router.getCurrentView();

    const main = document.getElementById("main-container");
    const header = document.getElementById("header-container");

    header.innerHTML = await HeaderRenderer.render();
    main.innerHTML = await view.render();
    await view.afterViewInit();
}
window.addEventListener('load', renderView);
window.addEventListener('hashchange', renderView);
