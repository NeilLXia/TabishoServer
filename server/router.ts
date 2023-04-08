const router = require("express").Router();
import controller from "./controller";

router.get("/questions/", controller.getQuestions)
router.post("/questions/", controller.postQuestion)
router.put("/questions/:question_id/helpful/", controller.putQuestionHelpful)
router.put("/questions/:question_id/report/", controller.putQuestionReported)

router.get("/questions/:question_id/answers/", controller.getAnswers)
router.post("/questions/:question_id/answers", controller.postAnswer)
router.put("/answers/:answer_id/helpful", controller.putAnswerHelpful)
router.put("/answers/:answer_id/report", controller.putAnswerReported)

module.exports = router