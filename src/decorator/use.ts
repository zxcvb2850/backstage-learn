import {Context, Middleware} from "koa";
import KoaJwt from "koa-jwt";
import config from "../config/config";

export const uses = (middleware: Middleware) => {
    return (target: any, key: string) => {
        const originMiddleware = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddleware.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddleware, target, key);
    }
};

export const useAuth = KoaJwt({
    secret: config.adminSecret,
    getToken: (ctx: Context) => {
        const {header} = ctx.response;
        const {Authorization} = header;
        return !!Authorization ? Authorization as string : null;
    }
});
