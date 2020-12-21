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
const categories = [{id: 0, name: 'buty'}, {id: 1, name: 'spodnie'}, {id: 2, name: 'sukienki'}];
const products = [
    {id: 0, name: "Abibasy", cat: 0},
    {id: 1, name: "Najki", cat: 0},
    {id: 2, name: "CCC", cat: 0},

    {id: 3, name: "suknia", cat: 2},
    {id: 4, name: "dresik", cat: 2},

    {id: 5, name: "jeansy", cat: 1},
    {id: 6, name: "zamszowe", cat: 1},
    {id: 7, name: "orkiszowe", cat: 1}

]

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
    //console.log("req: ", req.headers);
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
    //console.log("categories/ req: ", req.headers);
    res.status(200).send({ok: true, categories: categories});
});

app.get('/products', function (req, res) {
    let cats = req.query.cat;
    let findProd = [];
    try {
        console.log(cats);
        if (cats.length) {
            let c = JSON.parse(cats);
            console.log('parse',c);
            findProd.push(products.filter(prod => {
                return Array.isArray(c) ? c.includes(prod.cat) : prod.cat === c;
            }));
            console.log('find ',findProd);
        }
    } catch (e) {
        res.status(400).send("bad req");
        return;
    }
    res.status(200).send(findProd);
});

app.get('/product/:prodId', function (req, res) {
    const id = req.params.prodId;
    let findProd = products.filter(prod => {
        return prod.id === id;
    });

    if (findProd.length) {
        res.status(200).send(findProd);
    }

    res.status(404).send("Item not found");
});

app.get('/add/to/cart/:prodId', function (req, res) {
    const id = req.params.prodId;
    console.log("id")
    res.status(200).send({id: id, name: 'name' + id});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
