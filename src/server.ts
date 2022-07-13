import app from "./app";
import { AppDataSource } from "./data-source";

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log("Servidor online");
    })
    .catch((err) => {
      console.log(err);
    });
  app.listen(3001);
})();
