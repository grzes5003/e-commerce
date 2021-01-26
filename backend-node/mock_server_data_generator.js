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
        spodnie: 232,
        sukienki: 67,
        inne: 202,
        dresy: 81
    }

    const buty = [...Array(quantity.buty).keys()].map((x) => ({
        id: x,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: 0,
        brand: Math.floor(Math.random() * (15)),
        // brand: faker.company.companyName(0),
        description: faker.commerce.productDescription(),
        picture: faker.image.business(),
        units_in_stock: Math.floor(Math.random() * (100))
    }));
    const spodnie = [...Array(quantity.spodnie).keys()].map((x) => ({
        id: x + quantity.buty,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: 1,
        brand: Math.floor(Math.random() * (15)),
        // brand: faker.company.companyName(0),
        description: faker.commerce.productDescription(),
        picture: faker.image.business(),
        units_in_stock: Math.floor(Math.random() * (50))
    }));
    const sukienki = [...Array(quantity.sukienki).keys()].map((x) => ({
        id: x + quantity.buty + quantity.spodnie,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: 2,
        brand: Math.floor(Math.random() * (15)),
        // brand: faker.company.companyName(0),
        description: faker.commerce.productDescription(),
        picture: faker.image.business(),
        units_in_stock: Math.floor(Math.random() * (20))
    }));
    const inne = [...Array(quantity.inne).keys()].map((x) => ({
        id: x + quantity.buty + quantity.spodnie + quantity.sukienki,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: 3,
        brand: Math.floor(Math.random() * (15)),
        // brand: faker.company.companyName(0),
        description: faker.commerce.productDescription(),
        picture: faker.image.business(),
        units_in_stock: Math.floor(Math.random() * (50))
    }));
    const dresy = [...Array(quantity.dresy).keys()].map((x) => ({
        id: x + quantity.buty + quantity.spodnie + quantity.sukienki + quantity.inne,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: 4,
        brand: Math.floor(Math.random() * (15)),
        // brand: faker.company.companyName(0),
        description: faker.commerce.productDescription(),
        picture: faker.image.business(),
        units_in_stock: Math.floor(Math.random() * (50))
    }));

    return [...buty, ...spodnie, ...sukienki, ...inne, ...dresy];
}

const products = generateFakeProducts();

const brands = [...Array(15).keys()].map((x) => ({
    id: x,
    name: faker.company.companyName(0)
}));

const fs = require('fs');
fs.writeFileSync('brands.json', JSON.stringify(brands));

const users = [{id: 1, username: 'test', password: 'test', email: 'text@example.com'}];
const categories = [{id: 0, name: 'Buty'}, {id: 1, name: 'Spodnie'}, {id: 2, name: 'Sukienki'}, {
    id: 3,
    name: 'Inne'
}, {id: 4, name: 'Dresy'}];
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

