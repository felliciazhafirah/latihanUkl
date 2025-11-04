import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const absen = async (req, res) => {
  const { user_id, date, time, status } = req.body;

  try {
    if (!user_id || !date || !time || !status) {
      return res.status(400).json({
        status: "error",
        message: "Semua field harus diisi!",
      });
    }

    const result = await prisma.kehadiran.create({
      data: {
        user_Id: parseInt(user_id),
        date: new Date(date),
        time,
        status,
      },
      include: { user: true },
    });

    res.status(200).json({
      status: "success",
      message: "Absen berhasil disimpan",
      data: result,
    });
  } catch (error) {
    console.error("🔥 ERROR TERDETEKSI:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getKehadiran = async (req, res) => {
    try {
      const user_Id = parseInt(req.params.user_Id);
  
      const user = await prisma.user.findUnique({
        where: { Id: user_Id },
      });
  
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: `User dengan ID ${user_Id} tidak ditemukan.`,
        });
      }
  
      const riwayatKehadiran = await prisma.kehadiran.findMany({
        where: { user_Id: user_Id },
        select: {
          kehadiran_Id: true,
          date: true,
          time: true,
          status: true,
        },
        orderBy: { date: "desc" },
      });
  
      res.json({
        status: "success",
        data: riwayatKehadiran,
      });
    } catch (error) {
      console.error("🔥 ERROR TERDETEKSI:", error);
      res.status(500).json({
        status: "error",
        message: "Gagal mengambil riwayat presensi pengguna",
      });
    }
  };