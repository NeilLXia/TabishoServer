import client from "../database";
import escapeString from "sql-escape-string";

export default {
  getEvent: async (event_id) => {
    try {
      const result = await client.query(
        `SELECT DISTINCT ON (Events._id) Events.*, UserEvents.attending,
            (SELECT jsonb_agg(nested_users)
              FROM (
                SELECT Users.*, UserEvents.attending
                FROM Users
                LEFT JOIN UserEvents
                ON Users._id = UserEvents.user_id
                WHERE UserEvents.event_id = Events._id
              ) as nested_users
            ) as users
          FROM Events
          LEFT JOIN UserEvents
          ON Events._id = UserEvents.event_id
          WHERE Events._id = $1;`,
        [event_id]
      );
      return result.rows;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getEventsByUser: async (user_id) => {
    try {
      const result = await client.query(
        `SELECT Events.*, UserEvents.attending,
          (SELECT jsonb_agg(nested_users)
            FROM (
              SELECT Users.*, UserEvents.attending
              FROM Users
              LEFT JOIN UserEvents
              ON Users._id = UserEvents.user_id
              WHERE UserEvents.event_id = Events._id
            ) as nested_users
          ) as users
        FROM Events
        LEFT JOIN UserEvents
        ON Events._id = UserEvents.event_id
        WHERE UserEvents.user_id = $1;`,
        [user_id]
      );
      return result.rows;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getEventsByTrip: async (trip_id) => {
    try {
      const result = await client.query(
        `SELECT Events.*, UserEvents.attending
        FROM Events
        LEFT JOIN UserEvents
        ON Events._id = UserEvents.event_id
        WHERE UserEvents.trip_id = $1;`,
        [trip_id]
      );
      return result.rows;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createEvent: (body) =>
    new Promise(async (resolve, reject) => {
      try {
        const { trip_id, start_date, end_date } = body;
        const name = escapeString(body.name);
        const description = escapeString(body.description);
        const valuesString = `${trip_id}, ${name}, ${start_date}, ${end_date}, ${description}`;
        const response = await client.query(
          `INSERT INTO Events (
            trip_id,
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
  updateEventDetails: (event_id, body) =>
    new Promise(async (resolve, reject) => {
      const { trip_id, start_date, end_date } = body;
      const name = escapeString(body.name);
      const description = escapeString(body.description);
      const updateString = `trip_id=${trip_id}, name=${name}, start_date=${start_date}, end_date=${end_date}, description=${description}`;
      console.log(updateString);
      try {
        const response = await client.query(
          `UPDATE Events
        SET ${updateString}
        WHERE _id=${event_id};`
        );
        resolve(null);
      } catch (err) {
        reject(err);
      }
    }),
  updateEventAttendingStatus: (event_id, user_id, attending) =>
    new Promise(async (resolve, reject) => {
      try {
        attending = escapeString(attending);
        const checkExist = await client.query(
          `SELECT attending FROM UserEvents WHERE event_id=${event_id} AND user_id=${user_id};`
        );
        console.log(checkExist);
        if (checkExist.rows.length === 0) {
          await client.query(
            `INSERT INTO UserEvents (event_id, user_id, attending)
              VALUES (${event_id}, ${user_id}, ${attending});`
          );
          resolve(null);
        }
        if (checkExist.rows[0].attending !== attending) {
          await client.query(
            `UPDATE UserEvents
              SET attending=${attending}
              WHERE event_id=${event_id} AND user_id=${user_id};`
          );
          resolve(null);
        }
        resolve(null);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }),
};
