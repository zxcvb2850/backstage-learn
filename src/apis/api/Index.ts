import {Context, Next} from "koa";
import {controller, get, post, uses} from "../../decorator";

// 测试中间件
async function testLog(ctx: Context, next: Next) {
    console.log("test-log");
    await next();
}

@controller("/api")
class ApiController {
    @get('/')
    getIndex(ctx: Context) {
        ctx.body = "<h1>this is api index</h1>"
    }

    @get('/getData')
    getData(ctx: Context) {
        ctx.body = "<h1>this is api getData</h1>"
    }

    @post("/postData")
    @uses(testLog)
    postData(ctx: Context) {
        ctx.body = ctx.request.body;
    }
}
