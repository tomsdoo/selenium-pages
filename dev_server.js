const koa = require("koa");
const Router = require("koa-router");
const app = new koa();
const router = new Router();
const serve = require("koa-static-server");
const path = require("path");
const fs = require("fs").promises;

(async () => {
///

const port = process.env.PORT || 3000;

async function indexhtml(ctx){
  ctx.response.status = 200;
  ctx.response.type = "text/html";
  ctx.response.body = await fs.readFile(path.join(__dirname, "./docs/index.html"), "utf8");
}

router.get("/", indexhtml);
app.use(router.routes());
app.use(router.allowedMethods());

app.use(serve({
  rootDir:path.join(__dirname,"./docs")
}));
app.listen(port, () => {
  console.log(`listening ${port}`);
});

///
})();
