import {validation} from './actions.js'

class LogInHeading {
    render() {
        const loginHeading = document.createElement('h1');
        loginHeading.classList.add('login_heading');
        loginHeading.textContent = 'Sign in';

        return loginHeading
    }
}

class LogInInput {
    render(id, type, placeholder, position, messageBox) {
        const input = document.createElement('input');
        input.id = id;
        input.type = type;
        input.placeholder = placeholder;

        input.addEventListener('focus', (e) => {
            this.onFocus(e);
        });
        
        input.addEventListener('blur', (e) => {
            position === 'first' ? this.isEmpty(e, e.target.nextSibling, messageBox) : this.isEmpty(e, e.target.previousSibling, messageBox);
        })

        return input
    }

    isEmpty(el, nextOrPrev, messageBox) {
        const submit = document.querySelector('.login_submit');

        if(el.target.value === '') {
            el.target.classList.add('empty');
            messageBox.validationError = 'all fields must be filled';
            console.log(messageBox.validationError);
            messageBox.render();
        } else {
            if(nextOrPrev.value) {
                messageBox.validationError = '';
                messageBox.render()
                submit.removeAttribute('disabled')
            }
        }
    }
    
    onFocus(el) {
        el.target.classList.remove('empty');
    }
}

class LogInValidationMessage {
    constructor (text=''){
        this.validationError = text
    }

    render() {
        const messageBox = document.createElement('span');
        messageBox.classList.add('message_box');
        messageBox.textContent = this.validationError

        if (!document.querySelector('.message_box')) {
            return messageBox 
        } else {
            document.querySelector('.message_box').textContent = this.validationError;
            return void 0
        }
    }

    setMessageBoxText(validationError) {
        this.validationError = validationError;
    }
}

class LogInSubmit {
    render(store, messageBox) {
        const submit = document.createElement('input');
        submit.classList.add('login_submit');
        submit.type = 'button';
        submit.value = 'Continue'; 
        submit.disabled = 'true'; 

        submit.addEventListener('click', (e) => {
            this.validation(store, messageBox)
        })
        
        return submit
    }
        
    validation(store, messageBox) {
        const loginInput = document.querySelector('#login');
        const passwordInput = document.querySelector('#password');
        store.dispatch(validation(loginInput.value, passwordInput.value))
        if(store.getState().autorisation.status !== 'done') {
            messageBox.validationError = 'incorrect login or password';
            messageBox.render();
        }
    }
}

class LogInContainer {
    render(store) {
        const loginContainer = document.createElement('div');
        loginContainer.classList.add('login_container');

        const logInHeading = new LogInHeading()
        const logInInputs = [new LogInInput(), new LogInInput()]
        const logInMessageBox = new LogInValidationMessage()
        const logInSubmit= new LogInSubmit()

        loginContainer.append(logInHeading.render(), logInInputs[0].render('login', 'text', 'Input your login', 'first', logInMessageBox), logInInputs[1].render('password', 'password', 'Input your password', 'second', logInMessageBox), logInMessageBox.render(), logInSubmit.render(store, logInMessageBox));

        return loginContainer
    }
}

export class LogIn {
    render(store) {
        let logInContainer = new LogInContainer()

        document.body.appendChild(logInContainer.render(store))
    }
}