const { faker } = require("@faker-js/faker");
const Lead = require("../models/Lead");
require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected for seeding");
    await seedLeads();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

async function seedLeads() {
  try {  
    const leads = [];

    for (let i = 0; i < 50; i++) {
      const statusOptions = ["new", "contacted", "converted"];
      const status =
        statusOptions[Math.floor(Math.random() * statusOptions.length)];

      const lead = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number("9#########"),
        message: faker.lorem.sentence(),
        source: faker.helpers.arrayElement([
          "website",
          "landing page",
          "facebook ads",
          "google ads",
        ]),
        status,
        notes:
          status !== "new"
            ? [
                {
                  text: faker.lorem.sentence(),
                },
              ]
            : [],
      };

      leads.push(lead);
    }

    await Lead.insertMany(leads);

    console.log("✅ 20 realistic leads inserted successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}
