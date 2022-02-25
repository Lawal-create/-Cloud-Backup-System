process.env.NODE_ENV = "test";
import { expect, should } from "chai";
import { testUser } from "./utils.test";
import chai from "chai";
import chatHttp from "chai-http";
import app from "../app";
import User from "../models/User";
import logger from "../utils/logger";

const { firstName, lastName, email, password } = testUser;
chai.use(chatHttp);
should();

describe("Sign up tests", () => {
  before(async () => {
    try {
      await User.destroy({
        where: {}
      });
    } catch (error) {
      logger.info("*");
    }
  });
  after(async () => {
    try {
      await User.destroy({
        where: {}
      });
    } catch (error) {
      logger.info("*");
    }
  });
  it("Should throw error when email is missing", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({ firstName, lastName, password })
      .end((err, res: ChaiHttp.Response) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("Should throw error when firstName is missing", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({ email, lastName, password })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("Should throw error when lastName is missing", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({ firstName, email, password })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("Should throw error when password is missing", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({ firstName, lastName, email })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("Should throw error when invalid email is provided", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send({
        firstName,
        lastName,
        password,
        email: "myemail.com"
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        expect(res.body.status).to.equal("error");
        done();
      });
  });

  it("It should be successful when the values are all valid", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        expect(res.body.data).to.have.property("email");
        expect(res.body.data).to.have.property("role");
        expect(res.body.data).to.have.property("firstName");
        expect(res.body.data).to.have.property("lastName");
        done();
      });
  });

  it("Should throw error when a duplicate email is provided", (done) => {
    chai
      .request(app)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        expect(res.body.status).to.equal("error");
        done();
      });
  });
});
