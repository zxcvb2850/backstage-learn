import {Middleware} from "koa";
import {router} from "../middleware/router";
import {METHODS_TYPE} from "./index";

export const controller = (prefix: string) => {
    return (target: any) => {
        for (const key in target.prototype) {
            let path: string = Reflect.getMetadata('path', target.prototype, key);
            const method: METHODS_TYPE = Reflect.getMetadata('method', target.prototype, key);
            const middlewares: Middleware[] = Reflect.getMetadata('middlewares', target.prototype, key);
            const handle = target.prototype[key];
            if (!!path) {
                /* 处理 URL 拼接 */
                let curPrefix: string = prefix;
                if (prefix === "") {
                    curPrefix = "/"
                }
                const startPath = /^\//;
                let currentPath = startPath.test(path) ? path : `/${path}`;
                currentPath = `${prefix}${currentPath}`;
                const pathReg = /(\/+)/g;
                currentPath = currentPath.replace(pathReg, "/");

                if (middlewares && middlewares.length) {
                    router[method](currentPath, ...middlewares, handle);
                } else {
                    router[method](currentPath, handle);
                }
            }
        }
    }
};
