import { generateQueryString } from "../common/helper";
import http from "axios";

export interface IOptions {
  limit?: number;
  offset?: number;
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
      console.log("error @ mangaList", err.response.data.errors);
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
      console.log("error @ coverGet", err.response.data.errors);
      throw new Error(err.response.data.errors[0]?.message);
    }
  }
}
