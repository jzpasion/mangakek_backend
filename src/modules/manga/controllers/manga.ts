import { Request, Response } from "express";
import * as HttpStatus from "http-status";
import { MangaInteractor } from "../interactors";

export class MangaController {
  private readonly mangaInteractor = new MangaInteractor();

  public mangaList = async (req: Request, res: Response) => {
    try {
      const mangaList = await this.mangaInteractor.getMangaList(req.query);

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

  public getMangaCover = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const coverImg = await this.mangaInteractor.getCoverImg(id);

      res.status(HttpStatus.OK).json({
        success: true,
        data: coverImg,
      });
    } catch (error) {
      console.log("error @ controllerCoverImg", error);
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: error });
    }
  };

  public getMangaChapter = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log("from controller ", req.query);
      const mangaList = await this.mangaInteractor.getMangaChapter(
        id,
        req.query
      );

      res.status(HttpStatus.OK).json({
        success: true,
        data: mangaList,
      });
    } catch (error) {
      console.log("error @ controllerChapterList", error);
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: error });
    }
  };

  public getMangaListWithCover = async (req: Request, res: Response) => {
    try {
      const mangaList = await this.mangaInteractor.getMangaListWithCover(
        req.query
      );
      res.status(HttpStatus.OK).json({
        success: true,
        data: mangaList,
      });
    } catch (error) {
      console.log("error @ controller - getMangaListWithCover", error);
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: error });
    }
  };
}
