import { createClient } from "@supabase/supabase-js";

// Koneksi ke Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

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

      const { data, error } = await supabase
        .from("monitoring")
        .insert([
          {
            datetime: DateTime,
            temp1: Temp1,
            status1: Status1,
            temp2: Temp2,
            status2: Status2,
            button: Button,
            mode: Mode,
            location: Location,
          },
        ])
        .select();

      if (error) throw error;

      console.log("✅ Data tersimpan:", data);

      return res.status(201).json({
        success: true,
        message: "Data berhasil disimpan",
        data: data[0],
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
