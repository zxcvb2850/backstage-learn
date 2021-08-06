import {Context} from "koa";
import {controller, get} from "../decorator";

@controller("/")
class RouterController {
    constructor(){
        console.log("===================");
    }

    @get('/')
    getHome(ctx: Context){
        ctx.body = "<h1>This Is Home</h1>"
    }

    @get('/index')
    getIndex(ctx: Context){
        ctx.body = "<h1>This Is Index</h1>"
    }
}
