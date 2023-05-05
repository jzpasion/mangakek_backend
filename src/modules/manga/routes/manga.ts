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
    this.app.use(ListValidationPipeline.pipeline);
    this.app.get("/get-manga", this.mangaController.mangaList);
    this.app.get("/get-cover-manga/:id", this.mangaController.getMangaCover);
    this.app.get("/manga", this.mangaController.getMangaListWithCover);
    this.app.get("/:id/chapterList", this.mangaController.getMangaChapter);
    return this.app;
  }
}
