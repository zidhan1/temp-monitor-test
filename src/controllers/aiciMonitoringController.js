import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const aici = {
  saveMonitoring: async (req, res) => {
    try {
      const {
        DateTime,
        Temp1,
        Status1,
        Temp2,
        Status2,
        Button,
        Mode,
        Location,
      } = req.body;

      if (!DateTime || Temp1 === undefined || Temp2 === undefined) {
        return res.status(400).json({
          success: false,
          message: "Data tidak lengkap",
        });
      }

      const data = await prisma.monitoring.create({
        data: {
          datetime: DateTime ? new Date(DateTime) : null,
          temp1: Temp1,
          status1: Status1,
          temp2: Temp2,
          status2: Status2,
          button: Button,
          mode: Mode,
          location: Location,
        },
      });

      console.log("✅ Data tersimpan:", data);

      return res.status(201).json({
        success: true,
        message: "Data berhasil disimpan",
        data: data,
      });
    } catch (error) {
      console.error("❌ Error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
};

export default aici;
