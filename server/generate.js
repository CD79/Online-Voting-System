var faker = require('faker');
var database = { products: []};
for (var i = 1; i<= 300; i++) {
    database.products.push({
      id: i,
      name: faker.commerce.productName(),
      author: faker.name.findName(),
      description: faker.lorem.sentences(),
      vote_count: faker.random.number()
    });
  }

  console.log(JSON.stringify(database));