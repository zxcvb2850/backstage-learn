import {Context} from "koa";
import {controller, get} from "../../../decorator";

@controller("/api/v1")
class ApiV1Controller {
    @get("/")
    getData(ctx: Context) {
        ctx.body = "<h1>this is v1 getData</h1>"
    }
}
