import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entities";
import bcryptjs from "bcryptjs";
import { IUserCreate } from "../../interfaces/user";
import { Request, Response } from "express";

const userCreateService = async ({
  name,
  email,
  contact,
  isAdm,
  password,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);

  //disparador de emails
  const nodemailer = require("nodemailer");

  //transporter
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "capstone.kenzie@gmail.com",
      pass: "rvenhglyrpyfwfrv",
    },
  });

  const user = new User();
  user.name = name;
  user.email = email;
  user.contact = contact;
  user.isAdm = isAdm;
  user.password = bcryptjs.hashSync(password, 10);
  user.created_at = new Date();
  user.updated_at = new Date();

  userRepository.create(user);
  await userRepository.save(user);

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
    <a href="http://localhost:3001/users/verify/${user.id}"> Click Here  </a>`,
  };

  transport.sendMail(details2, (err: string) => {
    if (err) {
      console.error(err);
    } else {
      console.log("verification email is sent to yous gmail account");
    }
  });

  transport.sendMail(details, (err: string) => {
    if (err) {
      console.error(err);
    } else {
      console.log("welcome new user");
    }
  });

  return { ...user, password: undefined };
};

export default userCreateService;
