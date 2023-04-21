const fs = require("node:fs");
const { pipeline } = require("node:stream/promises");
const path = require("path");
const { from: copyFrom } = require("pg-copy-streams");
import client from "../index";

function seedDBs() {
  client.connect(async (err, client, done) => {
    if (err) console.log(err);
    await seedDatabase(
      client,
      "Users",
      "first_name,last_name,picture,email",
      "server/database/datafiles/users.csv"
    );
    await seedDatabase(
      client,
      "Trips",
      "organizer_id,name,start_date,end_date,description",
      "server/database/datafiles/trips.csv"
    );
    await seedDatabase(
      client,
      "Events",
      "trip_id,name,start_date,end_date,description",
      "server/database/datafiles/events.csv"
    );
    await seedDatabase(
      client,
      "Housing",
      "trip_id,name,photo,link,description",
      "server/database/datafiles/housing.csv"
    );
    await seedDatabase(
      client,
      "UserTrips",
      "trip_id,user_id,attending",
      "server/database/datafiles/userTrips.csv"
    );
    await seedDatabase(
      client,
      "UserEvents",
      "event_id,user_id,attending",
      "server/database/datafiles/userEvents.csv"
    );
    await seedDatabase(
      client,
      "Friends",
      "user_id,friend_id",
      "server/database/datafiles/userEvents.csv"
    );
    done();
  });
}

async function seedDatabase(client, database, fields, filePath) {
  const targetTable = client.query(
    copyFrom(`COPY ${database} (${fields}) FROM STDIN DELIMITER ',' CSV HEADER`)
  );
  const sourceFile = fs.createReadStream(filePath);
  sourceFile.on("error", (err) => {
    console.log(err);
  });
  targetTable.on("error", (err) => {
    console.log(err);
  });
  targetTable.on("finish", () => {
    console.log(`${database} database seeded`);
  });
  await sourceFile.pipe(targetTable);
}

seedDBs();
