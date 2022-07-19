import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entities";
import bcryptjs from "bcryptjs";
import { IUserCreate } from "../../interfaces/user";

const userCreateService = async ({
  name,
  email,
  contact,
  isAdm,
  password,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
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

  let details = {
    from: "capstone.kenzie@gmail.com",
    to: user.email,
    subject: "SEJA BEM-VINDO PET.FINDER",
    text: `Ola, ${user.name}. Bem vindo ao PetFinder`,
  };

  transport.sendMail(details, (err: string) => {
    if (err) {
      console.error(err);
    } else {
      console.log("email send");
    }
  });

  return { ...user, password: undefined };
};

export default userCreateService;
