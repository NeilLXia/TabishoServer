import client from "../database";
import escapeString from "sql-escape-string";

export default {
  getTrip: async (trip_id) => {
    try {
      const result = await client.query(
        `SELECT DISTINCT ON (Trips._id) UserTrips.user_id, Trips.*, UserTrips.attending,
          (SELECT jsonb_agg(nested_housing)
            FROM (
              SELECT *
              FROM Housing
              WHERE Housing.trip_id = Trips._id
            ) as nested_housing
          ) as housing,
          (SELECT jsonb_agg(nested_users)
            FROM (
              SELECT Users.*, UserTrips.attending
              FROM Users
              LEFT JOIN UserTrips
              ON Users._id = UserTrips.user_id
              WHERE UserTrips.trip_id = Trips._id
            ) as nested_users
          ) as users,
          (SELECT jsonb_agg(nested_events)
            FROM (
              SELECT _id
              FROM Events
              WHERE Events.trip_id = Trips._id
            ) as nested_events
          ) as events
          FROM Trips
          LEFT JOIN UserTrips
          ON Trips._id = UserTrips.trip_id
          WHERE UserTrips.trip_id = $1`,
        [trip_id]
      );
      return result.rows;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getTripsByUser: async (user_id) => {
    try {
      const result = await client.query(
        `SELECT DISTINCT ON (Trips._id) UserTrips.user_id, Trips.*, UserTrips.attending,
          (SELECT jsonb_agg(nested_housing)
            FROM (
              SELECT *
              FROM Housing
              WHERE Housing.trip_id = Trips._id
            ) as nested_housing
          ) as housing,
          (SELECT jsonb_agg(nested_users)
            FROM (
              SELECT Users.*, UserTrips.attending
              FROM Users
              LEFT JOIN UserTrips
              ON Users._id = UserTrips.user_id
              WHERE UserTrips.trip_id = Trips._id
            ) as nested_users
          ) as users,
          (SELECT jsonb_agg(nested_events)
            FROM (
              SELECT _id
              FROM Events
              WHERE Events.trip_id = Trips._id
            ) as nested_events
          ) as events
          FROM Trips
          LEFT JOIN UserTrips
          ON Trips._id = UserTrips.trip_id
          WHERE UserTrips.user_id = $1 OR Trips.organizer_id = $1;`,
        [user_id]
      );
      return result.rows;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createTrip: (body) =>
    new Promise(async (resolve, reject) => {
      try {
        const { organizer_id, start_date, end_date } = body;
        const name = escapeString(body.name);
        const description = escapeString(body.description);
        const valuesString = `${organizer_id}, ${name}, ${start_date}, ${end_date}, ${description}`;
        const response = await client.query(
          `INSERT INTO Trips (
            organizer_id,
            name,
            start_date,
            end_date,
            description)
          VALUES (${valuesString});`
        );
        resolve(null);
      } catch (err) {
        reject(err);
      }
    }),
  updateTripDetails: (trip_id, body) =>
    new Promise(async (resolve, reject) => {
      const { organizer_id, start_date, end_date } = body;
      const name = escapeString(body.name);
      const description = escapeString(body.description);
      const updateString = `organizer_id=${organizer_id}, name=${name}, start_date=${start_date}, end_date=${end_date}, description=${description}`;
      console.log(updateString);
      try {
        const response = await client.query(
          `UPDATE Trips
        SET ${updateString}
        WHERE _id=${trip_id};`
        );
        resolve(null);
      } catch (err) {
        reject(err);
      }
    }),
  updateTripAttendingStatus: (trip_id, user_id, attending) =>
    new Promise(async (resolve, reject) => {
      try {
        attending = escapeString(attending);
        const checkExist = await client.query(
          `SELECT attending FROM UserTrips WHERE trip_id=${trip_id} AND user_id=${user_id};`
        );
        console.log(checkExist.rows, attending);
        if (checkExist.rows.length === 0) {
          await client.query(
            `INSERT INTO UserTrips (trip_id, user_id, attending)
              VALUES (${trip_id}, ${user_id}, ${attending});`
          );
          resolve(null);
          return;
        }
        if (checkExist.rows[0].attending !== attending) {
          await client.query(
            `UPDATE UserTrips
              SET attending=${attending}
              WHERE trip_id=${trip_id} AND user_id=${user_id};`
          );
          resolve(null);
          return;
        }
        resolve(null);
      } catch (err) {
        reject(err);
      }
    }),
  addHousing: (trip_id, body) =>
    new Promise(async (resolve, reject) => {
      try {
        const name = escapeString(body.name);
        const photo = escapeString(body.photo);
        const link = escapeString(body.link);
        const description = escapeString(body.description);
        const valuesString = `${trip_id}, ${name}, ${photo}, ${link}, ${description}`;
        const response = await client.query(
          `INSERT INTO Housing (
            trip_id,
            name,
            photo,
            link,
            description)
          VALUES (${valuesString});`
        );
        resolve(null);
      } catch (err) {
        reject(err);
      }
    }),
};
