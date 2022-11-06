import LocalStorageService from "../Services/LocalStorageService";
import ApiService from "../Services/ApiService";


const CreateUserView = {

    afterViewInit: () => {
        document.getElementById("create-user-form")
            .addEventListener("submit", async (e) => {
                e.preventDefault();
                try {
                    const newUserDetails = {
                        username: document.getElementById("username").value,
                        password: document.getElementById("password").value,
                        tokens: document.getElementById("tokens").value
                    };
                    const response = await ApiService.createUser(newUserDetails, LocalStorageService.getCredentials());
                    e.target.reset();
                    alert(response.message);
                } catch (e) {
                    alert(e.message);
                }
            });
    },
    render: () => {
        return `
        <div class="form-container">
            <div class="form-content">
                <form id="create-user-form">
                    <ul class="form-items box">
                    <li>
                        <h1>Create User</h1>
                    </li>
                    <li>
                        <input type="text" name="username" id="username" placeholder="username" required>
                    </li>
                    <li>
                        <input type="text" name="password" id="password" placeholder="password" required>
                    </li>
                     <li>
                        <input type="number" name="tokens" id="tokens" placeholder="tokens max 100" min="0" max="100" required>
                    </li>
                     <li>
                        <button type="submit" class="submit">Create</button>
                    </li>
                    </ul>
                </form>
            </div>
        </div>`
    }
}
export default CreateUserView;
