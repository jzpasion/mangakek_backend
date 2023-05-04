import { Request, Response } from "express";
import * as HttpStatus from "http-status";
import { MangaInteractor } from "../interactors";

export class MangaController {
  private readonly mangaInteractor = new MangaInteractor();

  public mangaList = async (req: Request, res: Response) => {
    try {
      const mangaList = await this.mangaInteractor.getMangaList();

      res.status(HttpStatus.OK).json({
        success: true,
        data: mangaList,
      });
    } catch (error) {
      console.log("error @ controllerMangaList", error);
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: error });
    }
  };
}
