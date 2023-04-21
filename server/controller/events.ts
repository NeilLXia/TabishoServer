import model from "../model";

export default {
  getEvents: async (req, res) => {
    try {
      let queryData = {};
      if (req.query.event_id) {
        queryData = await model.getEvent(req.query.event_id);
        res.status(200).send(JSON.stringify(queryData));
      }
      if (req.query.user_id) {
        queryData = await model.getEventsByUser(req.query.user_id);
        res.status(200).send(JSON.stringify(queryData));
      }
      if (req.query.trip_id) {
        queryData = await model.getEventsByTrip(req.query.trip_id);
        res.status(200).send(JSON.stringify(queryData));
      }
    } catch (err) {
      res.status(400).send(err);
    }
  },
  postEvent: (req, res) => {
    console.log(req.body);
    model
      .createEvent(req.body)
      .then((queryData) => JSON.stringify(queryData))
      .then((data) => res.status(201).send("Event created successfully"))
      .catch((err) => res.status(400).send(err));
  },
  putEventUpdates: (req, res) => {
    model
      .updateEventDetails(req.params.event_id, req.body)
      .then((queryData) => JSON.stringify(queryData))
      .then((data) => res.status(200).send("Event updated successfully"))
      .catch((err) => res.status(400).send(err));
  },
  putEventAttending: (req, res) => {
    model
      .updateEventAttendingStatus(
        req.params.event_id,
        req.query.user_id,
        req.body.attending
      )
      .then((queryData) => JSON.stringify(queryData))
      .then((data) => res.status(200).send("RSVP updated successfully"))
      .catch((err) => res.status(400).send(err));
  },
};
