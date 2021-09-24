import {Context} from "koa";
import jwt, {Jwt, JwtPayload} from "jsonwebtoken";
import KoaJwt from "koa-jwt";
import config from "../config/config";

interface jwtData extends JwtPayload{
    name?: string,
}

export const getToken: (params: jwtData, expires?: number) => string = (params, expires = 3600) => {
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

export const verify: (ctx: Context) => jwtData | null | string = (ctx) => {
    const {header} = ctx.request;
    const token = header.authorization;
    if (!token) return null;
    const curToken = /\s+/.test(token) ? token.split(' ')[1] : token;
    return jwt.verify(curToken, config.adminSecret, {complete: true});
};

export const refresh = (ctx: Context) => {
    // const tokenInfo = verify(ctx);
    // if (tokenInfo && tokenInfo?.payload.name) {
    //     return ctx.headers.authorization = getToken({name: tokenInfo.payload.name});
    // }
    return null;
};