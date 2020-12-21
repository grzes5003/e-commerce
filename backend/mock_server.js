const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const port = 4000;
const faker = require('faker');

let corsOptions = {
    origin: true,
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const generateFakeProducts = () => {
    const buty = [...Array(100).keys()].map((x) => ({id: x, name: faker.commerce.productName(), price: faker.commerce.price(), cat: 0}));
    const spodnie = [...Array(50).keys()].map((x) => ({id: x, name: faker.commerce.productName(), price: faker.commerce.price(), cat: 1}));
    const sukienki = [...Array(26).keys()].map((x) => ({id: x, name: faker.commerce.productName(), price: faker.commerce.price(), cat: 2}));
    const inne = [...Array(71).keys()].map((x) => ({id: x, name: faker.commerce.productName(), price: faker.commerce.price(), cat: 3}));
    const dresy = [...Array(12).keys()].map((x) => ({id: x, name: faker.commerce.productName(), price: faker.commerce.price(), cat: 4}));

    return [...buty, ...spodnie, ...sukienki, ...inne, ...dresy];
}

const products = generateFakeProducts();

const users = [{id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User'}];
const categories = [{id: 0, name: 'buty'}, {id: 1, name: 'spodnie'}, {id: 2, name: 'sukienki'}, {id: 3, name: 'inne'}, {id: 4, name: 'dresy'}];
// const products = [
//     {id: 0, name: "Abibasy", cat: 0, price: 102},
//     {id: 1, name: "Najki", cat: 0, price: 99},
//     {id: 2, name: "CCC", cat: 0, price: 265},
//
//     {id: 3, name: "suknia", cat: 2, price: 10},
//     {id: 4, name: "dresik", cat: 2, price: 60},
//
//     {id: 5, name: "jeansy", cat: 1, price: 149},
//     {id: 6, name: "zamszowe", cat: 1, price: 101},
//     {id: 7, name: "orkiszowe", cat: 1, price: 999}
//
// ]

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
    let limit = req.query.limit;
    let offset = req.query.offset;

    let max_num = 0;

    console.log('query: ', req.query);
    console.log('rest: ', limit, ' ', offset);

    let findProd = [];
    try {
        console.log(cats);
        if (cats && cats.length) {
            let c = JSON.parse(cats);
            console.log('parse',c);
            findProd = products.filter(prod => {
                return Array.isArray(c) ? c.includes(prod.cat) : prod.cat === c;
            });
            console.log('find ',findProd);
        } else {
            findProd = products;
        }

        max_num = findProd.length;

        if (offset && offset.length) {
            let off = JSON.parse(offset);
            console.log('parse offset',off);
            findProd.splice(0,off);
        }

        if (limit && limit.length) {
            let lim = JSON.parse(limit);
            console.log('parse limit',lim);
            findProd = findProd.slice(0,lim);
            console.log('parsed limit === ',findProd.slice(0,lim));
        }

    } catch (e) {
        res.status(400).send("bad req");
        return;
    }
    res.status(200).send({products: findProd, numOfResults: max_num});
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
