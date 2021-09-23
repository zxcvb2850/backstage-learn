import {Context} from "koa";
import {controller, get} from "../../decorator";
import {getToken} from "../../utils/util";

@controller("/admin")
class AdminLoginController {
    @get("/login")
    getLogin(ctx: Context) {
        const token = getToken({name: 'king'});
        console.log("token", token);
        ctx.body = `<h1>Admin Login</h1><p>${token}</p>`
    }
}