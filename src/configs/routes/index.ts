import { Router, Request, Response, NextFunction } from "express";

import { MangaRoute } from "../../modules/manga/routes";

export default class MainRoute {
  private app: Router;

  constructor() {
    this.app = Router({ mergeParams: true });
  }

  public expose() {
    this.app.use(this.routes());
    return this.app;
  }

  private routes = () => {
    const route = Router({ mergeParams: true });
    console.log("Initiate routxe.");
    route.use("/mangakek", new MangaRoute().expose());
    return route;
  };
}
