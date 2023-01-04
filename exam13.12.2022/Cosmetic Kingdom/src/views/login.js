import { login } from '../api/users.js';
import { html } from '../lib.js';

let loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="form">
      <h2>Login</h2>
      <form @submit=${onSubmit} class="login-form">
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">
          Not registered? <a href="/register">Create an account</a>
        </p>
      </form>
    </div>
  </section>`;

export function loginView(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        let formData = new FormData(event.target);

        let email = formData.get('email');
        let password = formData.get('password');

        if(email == '' || password == '') {
            return alert('All fields are required!');
        }

        await login(email, password);
        ctx.updateNavigation();
        ctx.page.redirect('/catalog');
    }
}