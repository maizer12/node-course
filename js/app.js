import User from './User.js';

const registrationBtn = document.querySelector('#registration');
const login = document.querySelector('#name');
const password = document.querySelector('#password');

const registration = e => {
	e.preventDefault();
	const user = new User(login.value, 123456);
	user.registration();
};

registrationBtn?.addEventListener('click', e => registration(e));
