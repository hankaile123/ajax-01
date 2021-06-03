// const { request, response } = require('express');
// const express = require('express')
// const fs = require('fs')

// const port = process.argv[2] || process.env.PORT; //端口
// const server = express()

// if (!port) {
//     console.log(`请输入要监听的端口号`);
//     process.exit(1)
// }
// server.use((request, response, next) => {
//     const { pathname, search } = new URL(request.url, `http://localhost:${port}`)
//     console.log(`接收请求，路径：${pathname}, 参数: ${search}`);
//     console.log(request.query);
//     next()
// })
// server.get('/', (request, response) => {
//     response.send(`${fs.readFileSync('public/index.html')}`)
// })
// server.get('/main.js', (request, response) => {
//     response.send(`${fs.readFileSync('public/main.js')}`)
// })
// server.get('/style.css', (request, response) => {
//     response.send(`${fs.readFileSync('public/style.css')}`)
// })
// server.get('/a.js', (request, response) => {
//     response.send(`${fs.readFileSync('public/a.js')}`)
// })
// server.get('/a.html', (request, response) => {
//     response.send(`${fs.readFileSync('public/a.html')}`)
// })

// express框架不支持XML文件格式传递

// server.listen(port)


const http = require("http");
const fs = require("fs");
let port = process.argv[2] || process.env.PORT;
if (!port) {
    console.log("麻烦指定一下端口号");
    process.exit(1);
}
let app = http.createServer();


app.on("request", (request, response) => {

    const method = request.method.toLowerCase();
    const { pathname, search } = new URL(request.url, `http://localhost:${port}`);
    console.log(`接收请求，路径：${pathname}, 参数: ${search}`);
    if (method == "get") {
        if (pathname == "/") {
            response.writeHead(200, {
                "Content-Type": "text/html;charset=utf-8"
            }); /* 分页 */
            let string = fs.readFileSync('public/index.html').toString()
            let page1 = JSON.parse(fs.readFileSync('paging/page1.json').toString())
            let result = page1.map(item => {
                return `<li>${item.id}</li>`
            }).join('')
            string = string.replace('{{page1}}', `<ul id="pag">${result}</ul>`)
            response.end(string)
                // response.end(`${fs.readFileSync('public/index.html')}`);
        } else if (pathname == "/page2.json") {
            response.writeHead(200, {
                "Content-Type": "text/json;charset=utf-8"
            });
            response.end(`${fs.readFileSync('paging/page2.json')}`)
        } else if (pathname == "/page3.json") {
            response.writeHead(200, {
                "Content-Type": "text/json;charset=utf-8"
            });
            response.end(`${fs.readFileSync('paging/page3.json')}`)
        } else if (pathname == "/main.js") {
            response.writeHead(200, {
                "Content-Type": "text/javascript;charset=utf-8"
            });
            response.end(`${fs.readFileSync('public/main.js')}`)
        } else if (pathname == "/style.css") {
            response.writeHead(200, {
                "Content-Type": "text/css;charset=utf-8"
            });
            response.end(`${fs.readFileSync('public/style.css')}`)
        } else if (pathname == "/a.js") {
            response.writeHead(200, {
                "Content-Type": "text/javascript;charset=utf-8"
            });
            response.end(`${fs.readFileSync('public/a.js')}`)
        } else if (pathname == "/a.html") {
            response.writeHead(200, {
                "Content-Type": "text/html;charset=utf-8"
            });
            response.end(`${fs.readFileSync('public/a.html')}`)
        } else if (pathname == "/a.xml") {
            response.writeHead(200, {
                "Content-Type": "text/xml;charset=utf-8"
            });
            response.end(`${fs.readFileSync('public/a.xml')}`)
        } else if (pathname == "/a.json") {
            response.writeHead(200, {
                "Content-Type": "text/json;charset=utf-8"
            });
            response.end(`${fs.readFileSync('public/a.json')}`)
        } else {
            // 注意setHeader和writeHead的不同，一个是冒号，一个是逗号
            response.statusCode = 404;
            response.setHeader("Content-Type", "text/html;charset=utf-8")
            response.end("请求的页面没有找到");
        }
    }
});
app.listen(port);