// Express — server (backend) yaratish uchun kutubxona
import express from "express";
// CORS — boshqa manzil/portdan (masalan localhost:5500) kelgan so'rovlarga ruxsat berish uchun
import cors from "cors";

// Express ilovasini (serverni) yaratamiz
const app = express();

// CORS middleware — brauzerning "boshqa domendan so'rov taqiqlangan" xatosini oldini oladi
app.use(cors());

// Kelgan so'rov tanasini (body) avtomatik JSON qilib o'qiydi.
// Shu qator bo'lmasa, req.body har doim undefined bo'ladi.
app.use(express.json());

// "Ma'lumotlar bazasi" o'rniga vaqtinchalik massiv (RAM'da saqlanadi,
// server qayta ishga tushsa, o'zgartirishlar yo'qoladi)
let users = ["Ali", "Vali", "Aziza"];

// ✅ GET /users — Vazifasi: mavjud foydalanuvchilar ro'yxatini brauzerga qaytarish.
// Bu so'rov ma'lumot o'zgartirmaydi, faqat o'qiydi.
app.get("/users", (req, res) => {
    res.send(users); // users massivini JSON ko'rinishida javob sifatida yuboradi
});

// ✅ POST /users — Vazifasi: yangi foydalanuvchi nomini qabul qilib, ro'yxatga qo'shish.
app.post("/users", (req, res) => {  
    try {
        // Kelgan JSON body'dan faqat "name" maydonini ajratib olamiz
        const { name } = req.body;

        // Validatsiya: agar "name" yuborilmagan yoki bo'sh bo'lsa
        if (!name) {
            // 400 = Bad Request (mijoz noto'g'ri/yetarli bo'lmagan ma'lumot yuborgan)
            return res.status(400).json({ message: "Ism yuborilmadi!" });
            // "return" — funksiyani shu yerda to'xtatadi, pastdagi kod ishlamaydi
        }

        // Yangi ismni massivga qo'shamiz
        users.push(name);

        // 201 = Created (yangi resurs muvaffaqiyatli yaratildi)
        res.status(201).json({
            message: `✅ Yangi foydalanuvchi qo'shildi: ${name}`,
            allUsers: users, // yangilangan to'liq ro'yxatni ham qaytaramiz
        });
    } catch (error) {
        // Agar try{} ichida kutilmagan xatolik yuz bersa (masalan server ichki xatosi),
        // dastur "crash" bo'lib to'xtab qolmasligi uchun shu yerda ushlab olinadi
        console.error(error); // xatolikni terminalda ko'rish uchun
        res.status(500).json({ message: "Xatolik yuz berdi" }); // 500 = Internal Server Error
    }
});

// Server ishlaydigan port raqami
const PORT = 3000;

// Serverni shu portda tinglashga (ishga tushirishga) buyuramiz
app.listen(PORT, () => {
    console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
});