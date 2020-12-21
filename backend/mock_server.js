const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const port = 4000;

let corsOptions = {
    origin: true,
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const users = [{id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User'}];
const categories = [{id: 0, name: 'uno'}, {id: 1, name: 'duo'}, {id: 2, name: 'trhes'}];

app.get('/', function (req, res) {
    res.send('Hello Sir')
})

app.post('/users/authenticate', function (req, res) {

    console.log(req.body);

    if (!req.body.username || !req.body.password) {
        res.status(401).send('Username or password is incorrect');
    }

    let filteredUsers = users.filter(user => {
        return user.username === req.body.username && user.password === req.body.password;
    });

    if (filteredUsers.length) {
        // if login details are valid return user details and fake jwt token
        let user = filteredUsers[0];
        let responseJson = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
        };

        console.log("RESP: ", JSON.stringify(responseJson));
        res.status(200).send({ok: true, text: responseJson});
    } else {
        // else return error
        res.status(401).send('Username or password is incorrect');
    }
});

app.get('/users', function (req, res) {
    console.log("req: ", req.headers);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.headers && req.headers.authorization === 'Bearer fake-jwt-token') {
        res.status(200).send({ok: true, text: users});
    } else {
        // return 401 not authorised if token is null or invalid
        res.status(401).send('Unauthorised');
    }
});

app.get('/categories', function (req, res) {
    console.log("categories/ req: ", req.headers);
    res.status(200).send({ok: true, categories: categories});
});

app.get('/product/:prodId', function (req, res) {
    const id = req.params.prodId;
    res.status(200).send({id: id, name: 'name' + id});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
