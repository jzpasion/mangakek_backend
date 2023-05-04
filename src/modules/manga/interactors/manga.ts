import { MangaDexServiceAPI, IOptions } from "../../../api/index";

interface IMangaDetails {
  title: string;
  description: string;
  altTitles: any[];
  tags: any[];
  uri: string;
}

export class MangaInteractor {
  public getMangaList = async (options?: IOptions) => {
    try {
      const mangaList = await new MangaDexServiceAPI().mangaList(options);
      return mangaList;
    } catch (error) {
      throw error;
    }
  };

  public getCoverImg = async (id: string) => {
    try {
      const cover = await new MangaDexServiceAPI().mangaCover(id);
      return cover;
    } catch (error) {
      throw error;
    }
  };

  public getCoverFileName = async (list: any) => {
    try {
      let withCover: any = [];
      let result;

      const coverId = list.map((item: any) => {
        return item.relationships.find((x: any) => x.type === "cover_art").id;
      });

      for (let x = 0; x < list.length; x++) {
        const gettingCoverArt = this.getCoverImg(coverId[x]);
        withCover.push(gettingCoverArt);
      }
      result = Promise.all(withCover);

      return result;
    } catch (error) {
      throw error;
    }
  };

  public async getMangaListWithCover(options?: IOptions) {
    try {
      let coverSource: any = [];
      let result;
      const mangaList = await this.getMangaList(options);
      const coverResult = await this.getCoverFileName(mangaList);

      for (let i = 0; i < mangaList.length; i++) {
        coverSource.push({
          title: mangaList[i].attributes.title.en
            ? mangaList[i].attributes.title.en
            : mangaList[i].attributes.title.ja,
          id: mangaList[i].id,
          altTitles: mangaList[i].attributes.altTitles,
          tags: mangaList[i].attributes.tags,
          uri: `https://uploads.mangadex.org/covers/${mangaList[i].id}/${coverResult[i].attributes.fileName}.256.jpg`,
        });
      }

      result = Promise.all(coverSource);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
