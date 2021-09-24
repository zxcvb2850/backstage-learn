import Koa, {Context, Next} from "koa";
import Router from "./middleware/router";

import config from "./config/config";

const app = new Koa();
// 跨域配置
app.use(async (ctx: Context, next: Next) => {
    ctx.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    });

    if (ctx.request.method === "OPTION") {
        ctx.response.status = 200;
    }
    try {
        await next();
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            code: 500,
            message: err.message,
        }
    }
})

const router = new Router(app);

router.registerRouters(`${__dirname}/apis`);

// 监听服务器失败
app.on("error", (err, ctx) => {
    console.error("server error!!!!!!!!!!!!!!!!!!!!!!!!!", err);
})

app.listen(config.PORT, () => {
    console.log(`listen ${config.PORT}`);
});
