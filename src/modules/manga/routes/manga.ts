import { Router } from "express";

import { MangaController } from "../controllers";
import { ListValidationPipeline } from "../middlewares/validators/query-validator";

export class MangaRoute {
  private app: Router;
  private readonly mangaController = new MangaController();
  constructor() {
    this.app = Router({ mergeParams: true });
  }
  public expose() {
    this.app.use(ListValidationPipeline);
    this.app.get("/get-manga", this.mangaController.mangaList);
    return this.app;
  }
}
