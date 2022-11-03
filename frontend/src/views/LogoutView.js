import LocalStorageService from "../Services/LocalStorageService";

const LogoutView = {
    render: () => {
        LocalStorageService.deleteCredentials();
        document.location.hash = "/login";
        return '';
    }
}

export default LogoutView;
