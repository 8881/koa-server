`use strict`;

import Koa from "koa";
import Cors from "kcors";
import Router from "koa-router";
import convert from "koa-convert";

const app = new Koa();
const cors = new Cors();
const router = new Router({
  prefix: ``
});

// 指定服务端口号
const PORT = 3008;

// API延迟时间配置
const DELAY = 0; // 0ms

const delay = async(ctx, next) => {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, DELAY);
  });
  await next();
};

// 延迟响应中间件
app.use(delay);
app.use(convert(cors));
app.use(router.routes());

const wrap = (obj) => {
  return JSON.stringify(obj);
};

const setHeader = async(ctx, next) => {
  ctx.set(`Access-Control-Allow-Credentials`, true);
  ctx.cookies.set(`auth`, `123456`, {
    httpOnly: true
  });
  await next();
};

router.get(`/get`, setHeader, async(ctx, next) => {
  ctx.body = wrap(
    {
      "code": 200,
      "msg": "success",
      "data": "get ok."
    }
  );
});

router.get(`/page`, setHeader, async(ctx, next) => {
  const pageIndex = ctx.query.pageIndex ? parseInt(ctx.query.pageIndex) : 1;
  const pageSize = ctx.query.pageSize ? parseInt(ctx.query.pageSize) : 1;
  ctx.body = wrap(
    {
      "code": 200,
      "msg": "success",
      "data": {
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalPage: Math.ceil(3 / pageSize),
        list: [
          {
            id: 1,
            name: 1
          },
          {
            id: 2,
            name: 2
          },
          {
            id: 3,
            name: 3
          }
        ]
          .splice((pageIndex - 1) * pageSize, pageSize)
      }
    }
  );
});

router.post(`/post`, setHeader, async(ctx, next) => {
  ctx.body = wrap(
    {
      "code": 200,
      "msg": "success",
      "data": "post ok."
    }
  );
});

/*** 在这之间添加你的接口 ***/





/*** 在这之间添加你的接口 ***/

router.get(`*`, async(ctx, next) => {
  ctx.set(`content-type`, `text/html; charset-utf8`);
  ctx.body = `<h1>${ctx.status}.</h1>`;
});

app.listen(PORT, () => {
  console.log(`[server] http://localhost:${PORT}`);
});

// const server = http.createServer(app.callback());
// server.listen(PORT, function () {
//   const port = server.address().port;
//   console.log(`[server] http://localhost:${PORT}`);
// });
