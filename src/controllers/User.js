"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Refresh = exports.getAuthUser = exports.Login = exports.Register = void 0;
const tslib_1 = require("tslib");
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const typeorm_1 = require("typeorm");
const Register = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { email, password, gender, join_newsletter, join_coin_program } = req.body;
    const user = new User_1.User();
    user.email = email;
    user.password = yield bcryptjs_1.default.hash(password, 12);
    user.coins = 1000;
    user.gender = gender;
    user.join_newsletter = join_newsletter;
    user.join_coin_program = join_coin_program;
    user.books = [];
    yield data_source_1.AppDataSource.manager.save(user);
    const { password: _ } = user, data = tslib_1.__rest(user, ["password"]);
    res.status(200).send(data);
});
exports.Register = Register;
const Login = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield data_source_1.AppDataSource.getRepository(User_1.User).findOneBy({ email: email });
    if (!user)
        return res.status(400).send({ message: "Email not found" });
    if (!(yield bcryptjs_1.default.compare(password, user.password)))
        return res.status(400).send({ message: "Incorrect password" });
    const access_token = (0, jsonwebtoken_1.sign)({
        id: user.id
    }, process.env.ACCESS_SECRET, { expiresIn: '1m' });
    const refresh_token = (0, jsonwebtoken_1.sign)({
        id: user.id
    }, process.env.REFRESH_SECRET, { expiresIn: '1w' });
    res.cookie('access_token', access_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.send({ message: "Login successful" });
});
exports.Login = Login;
const getAuthUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.ACCESS_SECRET)
            return res.status(500).send({ message: "Server error" });
        const cookie = req.cookies['access_token'];
        const payload = (0, jsonwebtoken_1.verify)(cookie, process.env.ACCESS_SECRET);
        if (!payload) {
            return res.status(401).send({ message: "Unathenticated" });
        }
        let id;
        try {
            id = parseInt(payload.id);
        }
        catch (error) {
            return res.status(400).send({ message: "User not found" });
        }
        const user = yield data_source_1.AppDataSource.getRepository(User_1.User).findOne({
            where: {
                id: (0, typeorm_1.Equal)(id)
            }
        });
        if (!user)
            return res.status(400).send({ message: "User not found" });
        const { password } = user, data = tslib_1.__rest(user, ["password"]);
        res.send(data);
    }
    catch (error) {
        return res.status(401).send({ message: error });
    }
});
exports.getAuthUser = getAuthUser;
const Refresh = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.REFRESH_SECRET || !process.env.ACCESS_SECRET)
            return res.status(500).send({ message: "Server error" });
        const cookie = req.cookies['refresh_token'];
        const payload = (0, jsonwebtoken_1.verify)(cookie, process.env.REFRESH_SECRET);
        if (!payload)
            return res.status(401).send({ message: "Unathenticated" });
        let id;
        try {
            id = parseInt(payload.id);
        }
        catch (error) {
            return res.status(400).send({ message: "User not found" });
        }
        const access_token = (0, jsonwebtoken_1.sign)({
            id: id,
        }, process.env.ACCESS_SECRET, { expiresIn: '1m' });
        res.cookie('access_token', access_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(200).send({
            message: "Success"
        });
    }
    catch (error) {
        return res.status(401).send({ message: "Unauthenticated" });
    }
});
exports.Refresh = Refresh;
const Logout = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    res.cookie('access_token', '', { maxAge: 0 });
    res.status(200).send({
        message: "Success"
    });
});
exports.Logout = Logout;
