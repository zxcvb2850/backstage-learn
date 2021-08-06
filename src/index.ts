import Koa, {Context} from "koa";
import Router from "./middleware/router";

import config from "./config/config";

const app = new Koa();
const router = new Router(app);

router.registerRouters(`${__dirname}/apis`);

app.listen(config.PORT, () => {
    console.log(`listen ${config.PORT}`);
});
