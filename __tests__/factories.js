const faker = require("faker");
const FactoryGirl = require("factory-girl");

const User = require("../src/app/models/User");
const Tool = require("../src/app/models/Tool");

const factory = FactoryGirl.factory;
const adapter = new FactoryGirl.MongooseAdapter();

factory.setAdapter(adapter);

factory.define("User", User, {
  email: faker.internet.email(),
  password: faker.internet.password()
});

factory.define("Tool", Tool, {
  title: faker.lorem.word(),
  description: faker.lorem.text(),
  link: faker.internet.url(),
  tags: faker.random.arrayElement()
});

module.exports = factory;
