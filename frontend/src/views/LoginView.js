import ApiService from "../Services/ApiService";
import LocalStorageService from "../Services/LocalStorageService";

const login = async ({username, password}) => {
    try {
        return await ApiService.login(username, password);
    } catch (e) {
        console.log("Inside login function: " + e);
        return e;
    }
};
const LoginView = {
    afterViewInit: () => {
        document.getElementById("login-form")
            .addEventListener("submit", async (e) => {
                e.preventDefault();
                const credentials = await login({
                    username: document.getElementById("username").value,
                    password: document.getElementById("password").value
                });
                if (credentials.message) {
                    alert(credentials.message);
                } else {
                    LocalStorageService.setCredentials(credentials);
                    document.location.hash = '/';
                }
            });
    },
    render: () => {
        if (Object.keys((LocalStorageService.getCredentials())).length !== 0) {
            document.location.hash = '/';
            return '';
        }
        return `
        <div class="form-container">
            <div class="form-content">
                <form id="login-form">
                    <ul class="form-items box">
                    <li>
                        <h1>Login</h1>
                    </li>
                    <li>
                        <input type="text" name="username" id="username" placeholder="username" required>
                    </li>
                    <li>
                        <input type="password" name="password" id="password" placeholder="password" required>
                    </li>
                    <li>
                        <button type="submit" class="submit">Login</button>
                    </li>
                    </ul>
                </form>
            </div>
        </div>`
    }
}
export default LoginView;
