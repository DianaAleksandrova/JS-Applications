import { login } from '../api/users.js';
import { html } from '../lib.js';

let loginTemplate = (onSubmit) => html`<section id="login-page" class="auth">
<form @submit=${onSubmit} id="login">

    <div class="container">
        <div class="brand-logo"></div>
        <h1>Login</h1>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

        <label for="login-pass">Password:</label>
        <input type="password" id="login-password" name="password">
        <input type="submit" class="btn submit" value="Login">
        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </div>
</form>
</section>`;

export function loginView(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        let formData = new FormData(event.target);

        let email = formData.get('email');
        let password = formData.get('password');

        if (password == '' || email == '') {
            return alert('All fields are required!');
        }

        await login(email, password);
        ctx.updateNavigation();
        ctx.page.redirect('/');
    }


}