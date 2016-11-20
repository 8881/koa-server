# koa-server

koa 实现的简单的 api 服务器

## 用途
- mock server
- 简单接口服务器

如需要操作数据库，请参考 [koa-mysql](https://github.com/8881/koa-mysql)

## 使用

```
cd [你的项目地址]
mkdir [文件名]
cd [文件名]
git clone https://github.com/8881/koa-server.git

npm start  // 启动服务，默认3008端口
```

## 添加接口

打开server.js文件，在指定位置添加你的接口，参照上边的示例

#### get请求接口

```
router.get(`[接口地址]`, async(ctx, next) => {
  ctx.body = wrap([接口返回的数据对象]);
});
```

<small>注：这里的 wrap 函数其实就是JSON.stringify 的包装</small>

#### post请求接口

```
router.post(`[接口地址]`, async(ctx, next) => {
  ctx.body = wrap([接口返回的数据对象]);
});
```

#### 设置response header
对于跨域请求的情况，客户端请求配置了withCredential，服务端需要在返回的header里设置 Access-Control-Allow-Credentials，
这种情况下可以在设置body之前

```
ctx.set(`Access-Control-Allow-Credentials`,true);
```

或者直接使用中间件 setHeader，写法如下

```
const setHeader = async(ctx, next) => {
  ctx.set(`Access-Control-Allow-Credentials`, true);
  // 这里还可以添加其他需要的header,甚至是cookie
  ctx.cookies.set(`auth`, `123456`, {
    httpOnly: true
  });
  await next();
};
```

那么对于需要设置credential的get请求，可以使用如下写法

```
router.get(`[接口地址]`, setHeader, async(ctx, next) => {
  ctx.body = wrap([接口返回的数据对象]);
});
```

## Tips
反复修改 server.js 需要重启 node 服务才能生效，推荐使用 nodemen,它可以检测文件变化并自动重启

全局安装nodemon

```
npm install -g nodemon
```

启动koa-server

```
sudo nodemon index.js
```

完.
