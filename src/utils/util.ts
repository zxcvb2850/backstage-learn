import {Context} from "koa";
import jwt from "jsonwebtoken";
import KoaJwt from "koa-jwt";
import config from "../config/config";

export const getToken: (params: any, expires?: number) => string = (params, expires = 3600) => {
    return jwt.sign(params, config.adminSecret, {expiresIn: expires});
};

export const jwtAuth = () => KoaJwt({
    secret: config.adminSecret,
    // passthrough: true,
    getToken(ctx: Context): string | null {
        const {query} = ctx.request;
        return (query && query.token) ? query.token as string : null;
    }
})

export const verify = (token: any, expires = 3600) => {
    return jwt.verify(token, config.adminSecret, {complete: true});
};
export const refresh = (token: any) => {
    const tokenInfo = jwt.verify(token, config.adminSecret, {complete: true});
};