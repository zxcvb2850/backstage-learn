import path from "path";
import glob from "glob";
import Koa from "koa";
import KoaRouter from "koa-router";
import bodyParser from "koa-bodyparser"

export const router = new KoaRouter();

class Router {
    private app: Koa;
    private router: any;

    constructor(app: Koa) {
        this.app = app;
        this.router = router;
    }

    registerRouters(controllerDir: string) {
        glob.sync(path.join(controllerDir, './**/*.js')).forEach((item)=>require(item));

        this.app.use(bodyParser());
        this.app.use(this.router.routes());
    }
}

export default Router;
