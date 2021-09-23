import {Context} from "koa";
import {queryOne, querySql} from "../config/mysql";
import {controller, get, useAuth, uses} from "../decorator";
import {getToken, verify} from "../utils/util";

@controller("/")
class RouterController {
    constructor() {
        console.log("===================");
    }

    @get('/')
    async getHome(ctx: Context) {
        const token = getToken({name: 'king'});
        console.log("token", token);
        const result = await queryOne(`select COUNT(*) AS total from \`i_admin_users\``);
        ctx.body = `<h1>This Is Home ${result.total} ${token}</h1>`
    }

    @get('/index')
    @uses(useAuth)
    async getIndex(ctx: Context) {
        const result = await querySql(`select * from \`i_admin_users\``);
        ctx.body = "<h1>This Is Index</h1>"
    }

    @get('/verify')
    @uses(useAuth)
    async getVerify(ctx: Context) {
        const {query} = ctx.request;
        const verifyResult = verify(query.token);
        console.log("verifyResult", verifyResult);
        ctx.body = `<h1>This Is Verify ${query.token}</h1>`
    }
}
