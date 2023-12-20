const router = require("express").Router();

const controller = require("./scheduleEmail.controller");
const validate = require("./scheduleEmail.validation");
const {  commonFunction } = require("../../helper");

router.get(
  "/list",
  commonFunction.joiValidation(validate.schedule),
  controller.getScheduleList
);
router.get(
  "/:id",
  commonFunction.joiValidation(validate.getSchedule),
  controller.getSchedule
);
router.delete(
  "/:id",
  commonFunction.joiValidation(validate.deleteSchedule),
  controller.deleteSchedule
);
router.post(
  "/",
  commonFunction.joiValidation(validate.createSchedule),
  controller.createSchedule
);
router.patch(
  "/:id",
  commonFunction.joiValidation(validate.updateSchedule),
  controller.updateSchedule
);

module.exports = router;
