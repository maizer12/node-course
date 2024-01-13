import express from 'express';
import fs from 'fs';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

const read = req => {
	const data = JSON.parse(fs.readFileSync('./db/users.json', 'utf8'));
	const check = data.find(e => e.login == req.body.login);
	return { check, data };
};

const registration = req => {
	try {
		const { check, data } = read(req);
		if (check) return 'The login is already taken.';
		const { login, password } = req.body;
		const oldData = JSON.stringify(data.concat({ login, password }));
		//fs.writeFileSync('./db/users.json', oldData);
		return 'Registration was successfully';
	} catch {
		return 'Registration failed.';
	}
};

app.get('/', (req, res) => {
	res.status(200).json({ result: 'success' });
});

app.post('/auth/registration', (req, res) => {
	const userGet = registration(req);
	res.status(300).json({ url: '/' });
});

const PORT = 4444;
app.listen(PORT, err => {
	if (err) return console.log(err);
	console.log('Server work in port:' + PORT);
});
