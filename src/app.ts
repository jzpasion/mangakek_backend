import express, { Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compressor from "compression";
import helmet from "helmet";
import cors from "cors";

import MainRoute from "./configs/routes";

export default class App {
  public app: Application;
  private port: number = 3000;
  constructor() {
    this.app = express();
  }

  public listen(port: number = this.port): void {
    this.loadMiddleWares();
    this.app.listen(port, () => {
      console.log(`Listening at port ${port}`);
    });
  }

  private async loadMiddleWares() {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(compressor());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(new MainRoute().expose());
  }
}
