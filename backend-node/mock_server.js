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
    let quantity = {
        buty: 171,
        spodnie: 122,
        sukienki: 67,
        inne: 202,
        dresy: 81
    }

    const buty = [...Array(quantity.buty).keys()].map((x) => ({
        id: x,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        brand: Math.floor(Math.random() * (15)),
        picture: faker.image.business(),
        cat: 0
    }));
    const spodnie = [...Array(quantity.spodnie).keys()].map((x) => ({
        id: x + quantity.buty,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        brand: Math.floor(Math.random() * (15)),
        picture: faker.image.business(),
        cat: 1
    }));
    const sukienki = [...Array(quantity.sukienki).keys()].map((x) => ({
        id: x + quantity.buty + quantity.spodnie,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        brand: Math.floor(Math.random() * (15)),
        picture: faker.image.business(),
        cat: 2
    }));
    const inne = [...Array(quantity.inne).keys()].map((x) => ({
        id: x + quantity.buty + quantity.spodnie + quantity.sukienki,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        brand: Math.floor(Math.random() * (15)),
        picture: faker.image.business(),
        cat: 3
    }));
    const dresy = [...Array(quantity.dresy).keys()].map((x) => ({
        id: x + quantity.buty + quantity.spodnie + quantity.sukienki + quantity.inne,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.productDescription(),
        brand: Math.floor(Math.random() * (15)),
        picture: faker.image.business(),
        cat: 4
    }));

    return [...buty, ...spodnie, ...sukienki, ...inne, ...dresy];
}

const products = generateFakeProducts();

const brands = [...Array(15).keys()].map((x) => ({
    id: x,
    name: faker.company.companyName(0)
}));

const orders = [{user: "test",desc: 'order uno',purchase_dtime: '1000-01-01 00:00:00', products: [products[1], products[10], products[20], products[30], products[40]]}];

// const fs = require('fs');
// fs.writeFileSync('products.json', JSON.stringify(products));

const users = [{id: 1, username: 'test', password: 'test', email: 'text@example.com', orders: []}];
const categories = [{id: 0, name: 'Buty'}, {id: 1, name: 'Spodnie'}, {id: 2, name: 'Sukienki'},
    {id: 3, name: 'Inne'}, {id: 4, name: 'Dresy'}];

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

app.get('/orders/all', function (req, res) {
    res.send([orders[0]]);
})

app.post('/auth/login', function (req, res) {

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

        res.cookie('token', 'more-fake-jwt-token', {httpOnly: true});
        console.log("RESP: ", JSON.stringify(responseJson));
        res.status(200).send(responseJson);
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

app.get('/order/from/list', function (req, res) {
    let idList = req.query.id;
    console.log("TOKEN:: ", req.cookie);

    let findProd = [];
    try {
        console.log('idlist: ', typeof idList)
        let ids = JSON.parse(idList);
        findProd = products.filter(prod => {
            return Array.isArray(ids) ? ids.includes(prod.id) : prod.id === ids;
        });

    } catch (e) {
        console.log('error: ', e);
        res.status(400).send("bad req");
        return;
    }

    console.log("USER ORDERED: ", findProd, " WITH TOKEN ");
    res.status(200).send(findProd);
});

app.get('/categories', function (req, res) {
    //console.log("categories/ req: ", req.headers);
    res.status(200).send(categories);
});

app.get('/products/from/list', function (req, res) {
    let idList = req.query.id;

    let findProd = [];
    try {
        console.log('idlist: ', typeof idList)
        let ids = JSON.parse(idList);
        findProd = products.filter(prod => {
            return Array.isArray(ids) ? ids.includes(prod.id) : prod.id === ids;
        });

    } catch (e) {
        console.log('error: ', e);
        res.status(400).send("bad req");
        return;
    }
    res.status(200).send(findProd);
});

app.get('/brands', function (req, res) {
    res.status(200).send(brands);
});


app.get('/products', function (req, res) {
    let cats = req.query.cat;
    let limit = req.query.limit;
    let offset = req.query.offset;
    let order = req.query.order;
    let _sort = req.query.sort;

    let max_num = 0;

    console.log('query: ', req.query);
    console.log('rest: ', limit, ' ', _sort);

    let findProd = [];
    try {
        console.log(cats);
        if (cats && cats.length) {
            let c = JSON.parse(cats);
            console.log('parse', c);
            findProd = products.filter(prod => {
                return Array.isArray(c) ? c.includes(prod.cat) : prod.cat === c;
            });
            // console.log('find ',findProd);
        } else {
            findProd = products;
        }

        max_num = findProd.length;

        if (_sort && _sort.length) {
            console.log('sort: ', _sort);
            let sor = _sort;

            let ord = 'asc';
            if (order && order.length) {
                let ord = order;
                console.log('order = ', ord);
            }
            if (ord === 'asc' && sor === 'price') {
                findProd.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
            } else if (ord === 'desc' && sor === 'price') {
                findProd.sort((a, b) => (b.price > a.price) ? 1 : ((a.price > b.price) ? -1 : 0));
            } else if (ord === 'asc' && sor === 'name') {
                findProd.sort((a, b) => (a.name[0] > b.name[0]) ? 1 : ((b.name[0] > a.name[0]) ? -1 : 0));
            } else if (ord === 'desc' && sor === 'name') {
                findProd.sort((a, b) => (a.name[0] < b.name[0]) ? 1 : ((b.name[0] < a.name[0]) ? -1 : 0));
            }
        }

        if (offset && offset.length) {
            let off = JSON.parse(offset);
            console.log('parse offset', off);
            findProd.splice(0, off);
        }

        if (limit && limit.length) {
            let lim = JSON.parse(limit);
            console.log('parse limit', lim);
            findProd = findProd.slice(0, lim);
            console.log('parsed limit === ', findProd.slice(0, lim));
        }

    } catch (e) {
        console.log('error: ', e);
        res.status(400).send("bad req");
        return;
    }
    res.status(200).send({products: findProd, numOfResults: max_num});
});

app.get('/product/:prodId', function (req, res) {
    const id = req.params.prodId;
    let findProd = products.filter(prod => {
        return prod.id.toString() === id;
    });

    console.log('Found product: ', findProd);

    if (findProd.length) {
        res.status(200).send(findProd[0]);
        return;
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
