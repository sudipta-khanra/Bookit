import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../utils/db";
import Experience from "../models/Experience";
import Promo from "../models/Promo";
import slugify from "slugify";
import { ISlot } from "../models/Experience";

const sampleExperiences = [
  {
    title: "Sunrise Mountain Trek",
    shortDesc: "Early morning trek to catch sunrise over the peaks.",
    longDesc:
      "A beautiful, moderate trek with stunning sunrise views. Includes a guide, snacks, and photography tips.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    location: "Hillside",
    duration: "4 hours",
  },
  {
    title: "Street Food Walk — Old Town",
    shortDesc: "Taste local street food with a local guide.",
    longDesc:
      "Explore the flavors of the city; includes 6-8 tasting stops and cultural anecdotes.",
    price: 800,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947",
    location: "Old Town",
    duration: "3 hours",
  },
  {
    title: "River Kayaking Adventure",
    shortDesc: "Guided kayaking on calm river stretches.",
    longDesc:
      "Perfect for beginners and intermediate paddlers. Includes life jackets and short training.",
    price: 1500,
    image: "https://visitkochijapan.com/image/rendering/issue_page_image/35/trim.4000/4000/2000?v=01c0cf918c923a8c3b5e7ecf93670f53bc8c6feb",
    location: "Riverbend",
    duration: "2-3 hours",
  },
  {
    title: "Heritage Walk & Museum Entry",
    shortDesc: "Guided heritage walk ending with museum visit.",
    longDesc:
      "A leisurely walk through historical sites and a guided museum tour.",
    price: 600,
    image: "https://udaipurtourism.co.in/images/places-to-visit/headers/haldighati-udaipur-indian-tourism-entry-fee-timings-holidays-reviews-header.jpg",
    location: "City Center",
    duration: "2 hours",
  },
  {
    title: "Beach Bonfire Night",
    shortDesc: "Enjoy music, snacks, and bonfire by the sea.",
    longDesc:
      "A chill evening on the beach with live music, snacks, and sunset views.",
    price: 1000,
    image: "https://images.stockcake.com/public/0/8/a/08a6707d-95f8-43c2-bcc1-0d15bf220c4f_large/twilight-beach-party-stockcake.jpg",
    location: "Coastal Bay",
    duration: "3 hours",
  },
  {
    title: "Paragliding at Eagle Cliff",
    shortDesc: "Soar high and experience freedom in the sky.",
    longDesc:
      "Get trained and glide over beautiful landscapes with certified instructors.",
    price: 3500,
    image: "https://www.trawell.in/blog/wp-content/uploads/2022/07/Gangtok_Main.jpg",
    location: "Eagle Cliff",
    duration: "1 hour",
  },
  {
    title: "Tea Estate Tour",
    shortDesc: "Walk through lush tea gardens and taste fresh brews.",
    longDesc:
      "Guided estate visit, tea-plucking demo, and tasting session included.",
    price: 700,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
    location: "Highlands",
    duration: "2 hours",
  },
  {
    title: "Desert Camel Safari",
    shortDesc: "Ride through the dunes at sunset.",
    longDesc:
      "An unforgettable camel ride followed by traditional dinner and folk performances.",
    price: 2000,
    image: "https://www.cuddlynest.com/blog/wp-content/uploads/2024/05/dubai_desert_safari.png",
    location: "Thar Desert",
    duration: "5 hours",
  },
  {
    title: "Forest Camping & BBQ",
    shortDesc: "Camp under the stars with a cozy campfire dinner.",
    longDesc:
      "Includes tents, dinner, breakfast, and guided nature trail the next morning.",
    price: 1800,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
    location: "Evergreen Woods",
    duration: "Overnight",
  },
  {
    title: "Scuba Diving Intro Session",
    shortDesc: "Experience the underwater world safely.",
    longDesc:
      "Certified instructors teach basic scuba skills with full equipment and photos.",
    price: 4000,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    location: "Blue Reef Bay",
    duration: "2 hours",
  },
  {
    title: "Cooking Class — Local Cuisine",
    shortDesc: "Learn to cook traditional dishes with local chefs.",
    longDesc:
      "Hands-on class followed by tasting session and recipes to take home.",
    price: 900,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    location: "City Kitchen Studio",
    duration: "2.5 hours",
  },
  {
    title: "Photography Walk — Nature Trails",
    shortDesc: "Improve your photography with a professional guide.",
    longDesc:
      "A relaxed walk through scenic landscapes with practical photography tips.",
    price: 1100,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    location: "Green Valley",
    duration: "3 hours",
  },
  {
    title: "Cycling Tour — Countryside",
    shortDesc: "Ride through the fields and villages on scenic routes.",
    longDesc: "Includes bikes, helmets, refreshments, and a local guide.",
    price: 950,
    image: "https://assets.cntraveller.in/photos/64abeee1b9660a556bb2187d/master/w_1600%2Cc_limit/Spiti%2520Aug%252016%2520XperiaZ3%2520(206).JPG",
    location: "Countryside Trails",
    duration: "4 hours",
  },
  {
    title: "Yoga & Meditation Retreat",
    shortDesc: "Find peace through guided yoga and meditation.",
    longDesc:
      "Morning yoga, mindfulness sessions, and organic meals in a serene location.",
    price: 2500,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597",
    location: "Serenity Hills",
    duration: "Full Day",
  },
];

// ========== SLOT GENERATOR ==========
const generateSlots = (baseDate: Date): ISlot[] => {
  const slots: ISlot[] = [];
  const times = [
    "06:00 - 08:00",
    "09:00 - 12:00",
    "12:30 - 14:30",
    "15:00 - 17:00",
    "18:00 - 20:00",
  ];

  for (let i = 0; i < 5; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i + 1);

    times.forEach((time) => {
      const capacity = 6 + Math.floor(Math.random() * 5);
      const booked = Math.floor(Math.random() * capacity);
      slots.push({ date, time, capacity, booked });
    });
  }
  return slots;
};

// ========== SEED SCRIPT ==========
const seed = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected\nDB connected. Seeding data...");

    // Clear collections
    await Experience.deleteMany({});
    await Promo.deleteMany({});

    const baseDate = new Date();

    for (const e of sampleExperiences) {
      const exp = new Experience({
        ...e,
        slug: slugify(e.title, { lower: true }),
        slots: generateSlots(baseDate),
      });
      await exp.save();
      console.log("Inserted experience:", exp.title);
    }

    const promos = [
      { code: "SAVE10", type: "percent", value: 10, active: true },
      { code: "FLAT100", type: "flat", value: 100, active: true },
      {
        code: "WELCOME25",
        type: "percent",
        value: 25,
        active: false,
        expiresAt: new Date(Date.now() - 1000),
      },
    ];

    for (const p of promos) {
      await Promo.create({ ...p, code: p.code.toUpperCase() });
      console.log("Inserted promo:", p.code);
    }

    console.log("✨ Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seed();
