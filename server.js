// // server.js
// const http = require('http');

// // server yaratish
// const server = http.createServer((req, res) => {
//     // so'rov kelganda shu funksiya ishlaydi
//     res.statusCode = 200;

//     // header
//     res.setHeader('Content-Type', 'text/plain; charset=utf-8');

//     // javob
//     res.end('Salom, bu oddiy Node.js HTTP server!');
// });

// // serverni 3000-portda tinglash
// server.listen(3000, () => {
//     console.log('Server ishga tushdi: http://localhost:3000');
// });


// 2-example: Oddiy HTTP server yaratish va so'rovlarni yo'naltirish

// const http = require("http");
// const url = require("url");

// const server = http.createServer((req, res) => {
//     const parsedUrl = url.parse(req.url, true);
//     const path = parsedUrl.pathname;
//     const method = req.method;

//     console.log(`${method} ${path}`);

//     if (method === "GET" && path === "/") {
//         res.writeHead(200, {
//             "Content-Type": "text/html; charset=utf-8",
//         });

//         res.end("<h1>Bosh sahifa</h1>");
//     }

//     else if (method === "GET" && path === "/about") {
//         res.writeHead(200, {
//             "Content-Type": "text/html; charset=utf-8",
//         });

//         res.end("<h1>Biz haqimizda</h1>");
//     }

//     else if (method === "GET" && path === "/api/data") {
//         const data = {
//             name: "Abbos",
//             age: 21,
//         };

//         res.writeHead(200, {
//             "Content-Type": "application/json",
//         });

//         res.end(JSON.stringify(data));
//     }

//     else {
//         res.writeHead(404, {
//             "Content-Type": "text/plain; charset=utf-8",
//         });

//         res.end("404 - Sahifa topilmadi");
//     }
// });

// server.listen(3000, () => {
//     console.log("Server ishga tushdi: http://localhost:3000");
// });










// const http = require("http");

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "text/plain; charset=utf-8");
//     res.end("Salom, bu oddiy Node.js HTTP server!");
// });

// server.listen(3000, () => {
//     console.log("Server ishga tushdi: http://localhost:3000");
// });





// const http = require("http");
// const url = require("url");


// const server = http.createServer((req, res) => {
//     const parsedUrl = url.parse(req.url, true);
//     const path = parsedUrl.pathname;
//     const method = req.method;

//     console.log(`${method} ${path}`);


//     if (method === "GET" && path === "/") {
//         res.writeHead(200, {
//             "Content-Type": "text/html; charset=utf-8"
//         });
//         res.end("<h1>Bosh sahifa</h1>");
//     } else if (method === "GET" && path === "/about") {
//         res.writeHead(200, {
//             "Content-Type": "text/html; charset=utf-8"
//         });
//         res.end("<h1>Biz haqimizda</h1>");
//     } else if (method === "GET" && path === "/api/data") {
//         const data = {
//             name: "Abbos",
//             age: 21
//         };
//         res.writeHead(200, {
//             "Content-Type": "application/json"
//         });
//         res.end(JSON.stringify(data));
//     } else {
//         res.writeHead(404, {
//             "Content-Type": "text/plain; charset=utf-8"
//         });
//         res.end("404 - Sahifa topilmadi");
//     }
// });

// server.listen(3000, () => {
//     console.log("Server ishga tushdi: http://localhost:3000");
// });
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    console.log(`${method} ${path}`);
    if (method === "GET" && path === "/") {res.writeHead(200, {"Content-Type": "text/html; charset=utf-8",});
        res.end("<h1>Bosh sahifa</h1>");
    }

    else if (method === "GET" && path === "/about") {res.writeHead(200, {"Content-Type": "text/html; charset=utf-8",});
        res.end("<h1>Biz haqimizda</h1>");
    }

    else if (method === "GET" && path === "/api/data") {const data = {name: "Azizbek",age: 21,};
        res.writeHead(200, {"Content-Type": "application/json",});
        res.end(JSON.stringify(data));
    }

    else {res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8",});
        res.end("404 - Sahifa topilmadi");
    }
});
server.listen(3000, () => {
    console.log("Server ishga tushdi: http://localhost:3000");
});
 