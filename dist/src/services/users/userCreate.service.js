"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const users_entities_1 = require("../../entities/users.entities");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const userCreateService = ({ name, email, contact, isAdm, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(users_entities_1.User);
    //disparador de emails
    const reqnodemailer = nodemailer_1.default;
    //transporter
    const transport = reqnodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "capstone.kenzie@gmail.com",
            pass: "rvenhglyrpyfwfrv",
        },
    });
    const user = new users_entities_1.User();
    user.name = name;
    user.email = email;
    user.contact = contact;
    user.isAdm = isAdm;
    user.password = bcryptjs_1.default.hashSync(password, 10);
    user.created_at = new Date();
    user.updated_at = new Date();
    userRepository.create(user);
    yield userRepository.save(user);
    //gerando corpo do email
    let details = {
        from: "capstone.kenzie@gmail.com",
        to: user.email,
        subject: "SEJA BEM-VINDO PET.FINDER",
        html: `<h2>Ola, ${user.name}.</h2> 
    <p>Bem vindo ao <strong>PetFinder</strong></p>
    <p><strong>ADORAMOS QUE VOCÊ ESTEJA FAZENDO PARTE DO NOSSO TIME!</strong></p>`,
    };
    let details2 = {
        from: "capstone.kenzie@gmail.com",
        to: user.email,
        subject: "SEJA BEM-VINDO PET.FINDER",
        html: `<h2>Ola, ${user.name}.</h2> 
    <p>Bem vindo ao <strong>PetFinder</strong></p>
    <p><strong>Clique no link para confirmar seu email</strong></p>
    <a href="http://localhost:3001/users/verify/${user.id}"> Click Here </a>`,
    };
    transport.sendMail(details2, (err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("verification email is sent to yous gmail account");
        }
    });
    transport.sendMail(details, (err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("welcome new user");
        }
    });
    return Object.assign(Object.assign({}, user), { password: undefined });
});
exports.default = userCreateService;
