// Mini Products API - Error Handling bilan
// ES Module versiyasi (package.json da "type": "module" bo'lsa)
// Ishga tushirish: npm i express && node server.js  (Node 18+)

import express from "express";
const app = express();
app.use(express.json());

// ---------- Custom xato klassi ----------
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

// ---------- Ma'lumotlar (xotirada) ----------
let products = [
    { id: 1, name: "Olma", price: 12000 },
    { id: 2, name: "Non", price: 5000 },
    { id: 3, name: "Sut", price: 11000 },
];
let nextId = 4;

// async xatolarni error middleware'ga uzatish uchun yordamchi
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// ---------- 1. GET /products -> 200 ----------
app.get("/products", (req, res) => {
    res.status(200).json(products);
});

// ---------- 2. GET /products/:id -> 404 ----------
app.get("/products/:id", (req, res, next) => {
    const product = products.find((p) => p.id === Number(req.params.id));
    if (!product) {
        return next(new AppError("Product topilmadi", 404));
    }
    res.status(200).json(product);
});

// ---------- 3. POST /products -> 400 ----------
app.post("/products", (req, res, next) => {
    const { name, price } = req.body;
    if (!name) {
        return next(new AppError("name maydoni majburiy", 400));
    }
    const product = { id: nextId++, name, price: price ?? 0 };
    products.push(product);
    res.status(201).json(product);
});

// ---------- 4. DELETE /products/:id -> 204 ----------
app.delete("/products/:id", (req, res, next) => {
    const index = products.findIndex((p) => p.id === Number(req.params.id));
    if (index === -1) {
        return next(new AppError("Product topilmadi", 404));
    }
    products.splice(index, 1);
    res.status(204).send();
});

// ---------- 5. Weather API -> URL noto'g'ri bo'lsa 503 ----------
// To'g'ri URL:  GET /weather
// Noto'g'ri URL (test uchun): GET /weather?broken=true
app.get(
    "/weather",
    asyncHandler(async (req, res) => {
        const url =
            req.query.broken === "true"
                ? "https://noto-gri-url.example.invalid/weather"
                : "https://api.open-meteo.com/v1/forecast?latitude=41.31&longitude=69.28&current_weather=true";

        let response;
        try {
            response = await fetch(url);
        } catch (err) {
            // tarmoq xatosi / URL noto'g'ri
            throw new AppError("Weather xizmati hozircha mavjud emas", 503);
        }

        if (!response.ok) {
            throw new AppError("Weather xizmati hozircha mavjud emas", 503);
        }

        const data = await response.json();
        res.status(200).json(data);
    })
);

// ---------- Mavjud bo'lmagan route -> 404 ----------
app.use((req, res, next) => {
    next(new AppError(`Route topilmadi: ${req.method} ${req.originalUrl}`, 404));
});

// ---------- Custom error middleware ----------
// (4 ta parametr bo'lishi shart!)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // Console'ga log
    console.error(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${statusCode}: ${err.message}`
    );

    // Toza formatda javob
    res.status(statusCode).json({
        success: false,
        error: {
            status: statusCode,
            message: statusCode === 500 ? "Ichki server xatosi" : err.message,
        },
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server http://localhost:${PORT} da ishlayapti`));