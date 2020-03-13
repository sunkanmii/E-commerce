const faker = require('faker');

const database = { products: []};

for(let i = 1; i <= 300; i++){
    database.products.push({
        id: i,
        name: faker.commerce.productName(),
        description: faker.lorem.sentences(),
        price: faker.commerce.price(),
        imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        quantity: faker.random.number()
    });
}

console.log(JSON.stringify(database));