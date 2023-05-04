import { MangaDexServiceAPI, IOptions } from "../../../api/index";

export class MangaInteractor {
  public getMangaList = async () => {
    const mangaList = await new MangaDexServiceAPI().mangaList();
    console.log(mangaList);

    return mangaList;
  };
}
