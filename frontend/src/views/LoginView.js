const LoginView = {
    afterViewInit: ()=>{},
    render: ()=>{
        return `
        <div class="form-container">
            <div class="form-content">
                <form id="signin-form">
                    <ul class="form-items box">
                    <li>
                        <h1>Login</h1>
                    </li>
                    <li>
                        <input type="text" name="username" id="username" placeholder="username">
                    </li>
                    <li>
                        <input type="password" name="password" id="password" placeholder="password">
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
