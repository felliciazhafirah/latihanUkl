import express from 'express'
import userRoute from './route/user.route.js'
import kehadiranRoute from './route/kehadiran.route.js'


const app = express()
const port = 2100
app.use(express.json()) //supaya backend dapat menerima sebuah input//

app.use((req, res, next) => {
    console.log(`🟢 ${req.method} ${req.url}`);
    next();
  }); 

app.use('/api/presensi/kehadiran', kehadiranRoute)
app.use('/api/presensi/user', userRoute)


  
  // Middleware untuk log error
  app.use((err, req, res, next) => {
    console.error("🔥 ERROR TERDETEKSI:", err); // muncul di terminal
    res.status(500).json({
      status: "error",
      message: err.message || "Terjadi kesalahan di server",
    });
  });

app.listen(port, () => {
   console.log("running on port " + port)
})