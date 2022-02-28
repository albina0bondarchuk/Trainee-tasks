import todoListShow from './script.js';

const account = {
    login: 'v@sil',
    password: 'vasil23'
}

const loginContainer = document.createElement('div');
loginContainer.classList.add('login_container');

const loginHeading = document.createElement('h1');
loginHeading.classList.add('login_heading');
loginHeading.textContent = 'Sign in';

const loginInput = document.createElement('input');
loginInput.id = 'login';
loginInput.type = 'text';
loginInput.placeholder = 'Input your login';

const passwordInput = document.createElement('input');
passwordInput.id = 'password';
passwordInput.type = 'password';
passwordInput.placeholder = 'Input your password';

const messageBox = document.createElement('span');
messageBox.classList.add('message_box');

const submit = document.createElement('input');
submit.classList.add('login_submit');
submit.type = 'button';
submit.value = 'Continue'; 
submit.disabled = 'true'; 

loginContainer.append(loginHeading, loginInput, passwordInput, messageBox, submit);
document.body.appendChild(loginContainer);

loginInput.addEventListener('focus', (e) => {
    onFocus(e);
});

loginInput.addEventListener('blur', (e) => {
    isEmpty(e, e.target.nextSibling);
})

passwordInput.addEventListener('focus', (e) => {
    onFocus(e);
});

passwordInput.addEventListener('blur', (e, nextOrPrev) => {
    isEmpty(e, e.target.previousSibling);
})

submit.addEventListener('click', (e) => {
    validation()
})

function isEmpty(el, nextOrPrev) {
    if(el.target.value === '') {
        el.target.classList.add('empty');
        messageBox.textContent = 'all fields must be filled';
    } else {
        if(nextOrPrev.value) {
            messageBox.textContent = '';
        submit.removeAttribute('disabled')
        }
    }
}

function onFocus(el) {
    el.target.classList.remove('empty');
}

function validation() {
    console.log(loginInput, account.login);
    console.log(passwordInput, account.password);
    if(loginInput.value === account.login && passwordInput.value === account.password) {
        loginContainer.style.display = 'none'
        todoListShow()
    } else {
        messageBox.textContent = 'incorrect login or password';
    }
}