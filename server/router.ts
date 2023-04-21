const router = require("express").Router();
import controller from "./controller";

router.get("/events/", controller.getEvents);
router.post("/events/", controller.postEvent);
router.put("/events/:event_id", controller.putEventUpdates);
router.put("/events/:event_id/attending", controller.putEventAttending);

router.get("/trips/", controller.getTrips);
router.post("/trips/", controller.postTrip);
router.put("/trips/:trip_id", controller.putTripUpdates);
router.post("/trips/:trip_id/housing", controller.postHousing);
router.put("/trips/:trip_id/attending", controller.putTripAttending);

module.exports = router;
