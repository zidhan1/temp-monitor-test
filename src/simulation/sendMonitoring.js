// src/simulation/sendMonitoring.js

// Jika menggunakan Node.js versi lama (< 18), install dulu:
// npm install node-fetch
// lalu: import fetch from 'node-fetch';

// Node.js 18+ sudah built-in fetch, tidak perlu install

const ENDPOINT = "http://localhost:3000/api/monitoring";
const METHOD = "POST"; // ganti 'GET' jika ingin test GET

// ──────────────────────────────────────────
// 🔧 Generate data simulasi (acak/random)
// ──────────────────────────────────────────
function generateData() {
  const now = new Date();
  const dt = now.toISOString().replace("T", " ").substring(0, 19);

  const temp1 = parseFloat((Math.random() * (40 - 20) + 20).toFixed(1)); // 20–40°C
  const temp2 = parseFloat((Math.random() * (40 - 20) + 20).toFixed(1));

  const status1 = temp1 > 35 ? "Warning" : "Normal";
  const status2 = temp2 > 35 ? "Warning" : "Normal";

  const button = Math.random() > 0.5 ? "ON" : "OFF";
  const mode = ["Auto", "Manual"][Math.floor(Math.random() * 2)];
  const loc = "Ruang Server";

  return {
    DateTime: dt,
    Temp1: temp1,
    Status1: status1,
    Temp2: temp2,
    Status2: status2,
    Button: button,
    Mode: mode,
    Location: loc,
  };
}

// ──────────────────────────────────────────
// 📤 Kirim via POST
// ──────────────────────────────────────────
async function sendPOST(data) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
}

// ──────────────────────────────────────────
// 📤 Kirim via GET (data di URL)
// ──────────────────────────────────────────
async function sendGET(data) {
  const params = new URLSearchParams(data).toString();
  const url = `${ENDPOINT}?${params}`;
  const response = await fetch(url, { method: "GET" });

  return response.json();
}

// ──────────────────────────────────────────
// 🚀 Main function — kirim 1x
// ──────────────────────────────────────────
async function sendMonitoring() {
  const data = generateData();

  console.log("\n📦 Data yang akan dikirim:");
  console.table(data);

  try {
    const result =
      METHOD === "POST" ? await sendPOST(data) : await sendGET(data);

    console.log("✅ Response dari server:");
    console.log(result);
  } catch (error) {
    console.error("❌ Gagal kirim data:", error.message);
    console.error("   Pastikan server sudah berjalan di", ENDPOINT);
  }
}

// ──────────────────────────────────────────
// 🔁 Simulasi otomatis — kirim tiap N detik
// ──────────────────────────────────────────
async function startAutoSimulation(intervalSeconds = 5) {
  console.log(
    `\n🤖 Auto simulasi dimulai — kirim data tiap ${intervalSeconds} detik`,
  );
  console.log("   Tekan Ctrl+C untuk berhenti\n");

  let count = 0;

  const interval = setInterval(async () => {
    count++;
    console.log(`\n─────────── Pengiriman ke-${count} ───────────`);
    await sendMonitoring();
  }, intervalSeconds * 1000);

  // Kirim pertama kali langsung tanpa tunggu interval
  console.log("─────────── Pengiriman ke-1 ───────────");
  await sendMonitoring();
  count++;

  return interval; // return agar bisa di-stop dari luar jika perlu
}

// ──────────────────────────────────────────
// ▶️ Jalankan simulasi
// ──────────────────────────────────────────

// Pilih salah satu:

// Opsi A — Kirim 1x saja
// sendMonitoring();

// Opsi B — Kirim otomatis tiap 5 detik
startAutoSimulation(5);
