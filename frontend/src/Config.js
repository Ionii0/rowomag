const getApi = () => {
    const currentUrl = window.location.origin;
    if (currentUrl === 'http://localhost:8080') {
        return 'http://localhost:5000';
    } else {
        return currentUrl;
    }
}

const Config = {
    api: getApi()
}
export default Config;
