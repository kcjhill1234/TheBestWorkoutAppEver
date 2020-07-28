const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../index");
const {User} = require("../models");

describe("testing Authorization Endpoints", () => {
    it("test the signup endpoint", async () => {
        const response = await supertest(app).post("/api/auth/signUp").send({
            firstName: "user",
            lastName: "test",
            email: "test@test.com",
            userName: "username",
            password: "password"
        })
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("user was registered correctly")
    })
    it("test the duplicate username", async () => {
        const response = await supertest(app).post("/api/auth/signUp").send({
            firstName: "user",
            lastName: "test",
            email: "test@test.com",
            userName: "username",
            password: "password"
        })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("failed! username is already in use.")
    })
    it("test the duplicate email", async () => {
        const response = await supertest(app).post("/api/auth/signUp").send({
            firstName: "user",
            lastName: "test",
            email: "test@test.com",
            userName: "player1",
            password: "password"
        })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("failed! email is already in use.")
    })

    it("test the signIn endpoint", async () => {
        const response = await supertest(app).post("/api/auth/signIn").send({
            userName: "username",
            password: "password"
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("firstName")
        expect(response.body).toHaveProperty("lastName")
        expect(response.body).toHaveProperty("userName")
        expect(response.body).toHaveProperty("accessToken")
        expect(response.body).toHaveProperty("email")
    })
    afterAll(async ()=> {
        await User.deleteOne({
            userName: "username"
        })
        app.close()
        mongoose.connection.close()
    })
})