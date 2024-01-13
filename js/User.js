class User {
	#db = 'http://127.0.0.1:4444/auth';

	constructor(login, password) {
		this.login = login;
		this.password = password;
	}
	validation() {
		const login = this.login.toString().trim().length >= 3;
		const password = this.password.toString().trim().length >= 6;
		return login && password;
	}
	registration() {
		if (!this.validation()) return 'Data entry is incorrect ';
		fetch(this.#db + '/registration', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ login: this.login, password: this.password }),
		})
			.then(res => res.json())
			.then(data => (window.location = data.url))
			.catch(err => console.log(err));
	}
}

export default User;
