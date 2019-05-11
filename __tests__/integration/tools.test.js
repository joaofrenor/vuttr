const request = require("supertest");

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const server = function lazyApp() {
  return require("../../src/server");
};

const User = require("../../src/app/models/User");
const Tool = require("../../src/app/models/Tool");

const factory = require("../factories");

describe("Tools", () => {
  let mongoServer;
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    process.env.URI = await mongoServer.getUri();

    mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  });

  afterAll(async done => {
    mongoose.disconnect(done);
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Tool.remove({});
    await User.remove({});
  });

  it("should create tools properly", async () => {
    const user = await factory.create("User");
    const response = await request(server())
      .post("/tools")
      .set("Authorization", `Bearer ${User.generateToken(user)}`)
      .send({
        title: "hotel",
        link: "https://github.com/typicode/hotel",
        description:
          "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
        tags: ["node", "organizing"]
      });
    expect(response.status).toBe(200);
  });
});
