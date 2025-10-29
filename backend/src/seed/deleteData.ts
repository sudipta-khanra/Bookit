import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../utils/db";
import Experience from "../models/Experience";
import Promo from "../models/Promo";

const deleteData = async () => {
  try {
    await connectDB();
    console.log("Database connected.");

    const expDeleted = await Experience.deleteMany({});
    const promoDeleted = await Promo.deleteMany({});

    console.log(`Deleted ${expDeleted.deletedCount} experiences.`);
    console.log(`Deleted ${promoDeleted.deletedCount} promos.`);

    console.log("All data deleted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error deleting data:", error);
    process.exit(1);
  }
};

deleteData();
