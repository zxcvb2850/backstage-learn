import {Middleware} from "koa";

export const uses = (middleware: Middleware) => {
    return (target: any, key: string) => {
        const originMiddleware = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddleware.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddleware, target, key);
    }
};
