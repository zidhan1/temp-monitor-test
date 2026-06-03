import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// PrismaClient singleton for serverless environments
let prisma;

const getPrismaClient = () => {
  if (!prisma) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
};

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

      const prisma = getPrismaClient();

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
      console.error("❌ Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },
};

export default aici;
