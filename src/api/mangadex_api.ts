import { generateQueryString } from "../common/helper";
import http from "axios";

export interface IOptions {
  limit?: number;
  offset?: number;
  excludedTags?: any[];
  translatedLanguage?: any[];
  order?: any;
}
export class MangaDexServiceAPI {
  private readonly serviceBaseUrl = `https://api.mangadex.org`;

  public async mangaList(options?: IOptions) {
    try {
      const queryString = generateQueryString("", options || {});
      const { data } = await http.get<{ result: string; data: any }>(
        `${this.serviceBaseUrl}/manga${queryString}`
      );
      return data.result == "ok" ? data.data : null;
    } catch (err: any) {
      console.log("error @ API Service mangaList", err.response.data.errors);
      throw new Error(err.response.data.errors[0]?.message);
    }
  }

  public async mangaCover(id: string) {
    try {
      const { data } = await http.get<{ result: string; data: any }>(
        `${this.serviceBaseUrl}/cover/${id}`
      );
      return data.result == "ok" ? data.data : null;
    } catch (err: any) {
      console.log("error @ API Service coverGet", err.response.data.errors);
      throw new Error(err.response.data.errors[0]?.message);
    }
  }

  public async mangaChapterList(id: string, options?: IOptions) {
    try {
      console.log("@@@@@@@@@@@@", options);

      const queryString = generateQueryString("", options || {});
      const { data } = await http.get<{ result: string; data: any }>(
        `${this.serviceBaseUrl}/manga/${id}/feed${queryString}`
      );
      return data.result == "ok" ? data.data : null;
    } catch (err: any) {
      console.log(
        "error @ API Service mangaChapterGet",
        err.response.data.errors
      );
      throw new Error(err.response.data.errors[0]?.message);
    }
  }
}
