import model from "../model";

export default {
  getTrips: async (req, res) => {
    try {
      let queryData = {};
      if (req.query.user_id) {
        queryData = await model.getTripsByUser(req.query.user_id);
      }
      if (req.query.trip_id) {
        queryData = await model.getTrip(req.query.trip_id);
      }
      res.status(200).send(JSON.stringify(queryData));
    } catch (err) {
      res.status(400).send(err);
    }
  },
  postTrip: (req, res) => {
    model
      .createTrip(req.body)
      .then((queryData) => JSON.stringify(queryData))
      .then((data) => res.status(201).send("Trip created successfully"))
      .catch((err) => res.status(400).send(err));
  },
  putTripUpdates: (req, res) => {
    model
      .updateTripDetails(req.params.trip_id, req.body)
      .then((queryData) => JSON.stringify(queryData))
      .then((data) => res.status(200).send("Trip updated successfully"))
      .catch((err) => res.status(400).send(err));
  },
  putTripAttending: (req, res) => {
    model
      .updateTripAttendingStatus(
        req.params.trip_id,
        req.query.user_id,
        req.body.attending
      )
      .then((queryData) => JSON.stringify(queryData))
      .then((data) => res.status(200).send("RSVP updated successfully"))
      .catch((err) => res.status(400).send(err));
  },
  postHousing: (req, res) => {
    model
      .addHousing(req.params.trip_id, req.body)
      .then((queryData) => JSON.stringify(queryData))
      .then((data) => res.status(201).send("Housing added successfully"))
      .catch((err) => res.status(400).send(err));
  },
};
