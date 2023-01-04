import { logout } from './api/users.js';
import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';

let root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);


page(decorateContext);
page('/', homeView);
page('/catalog',catalogView);
page('/create', createView);
page('/details/:id',detailsView);
page('/edit/:id',editView);
page('/login',loginView);
page('/register',registerView);

updateNavigation();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNavigation = updateNavigation;
    next();
}

function renderMain(content) {
    render(content, root);
}

function updateNavigation() {
    let userData = getUserData();

    if(userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    }else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

function onLogout() {
    logout();
    updateNavigation();
    page.redirect('/catalog');
}