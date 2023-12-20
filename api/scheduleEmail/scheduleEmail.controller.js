const { response, db } = require("../../helper");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  getSchedule: async function (req, res) {
    try {
      let id = req.params.id;
      const scheduleInfo = await db.schedule.findOne({ _id: new ObjectId(id) });
      if (!scheduleInfo)
        return response.notFound(res, req.languageCode, "SCHEDULE_NOT_FOUND");
      return response.success(
        res,
        scheduleInfo,
        req.languageCode,
        "SCHEDULE_INFO"
      );
    } catch (error) {
      return response.sendUnexpected(res, error);
    }
  },
  getScheduleList: async function (req, res) {
    try {
      const currentPage = req.query.page || 1;
      const listPerPage = req.query.results || 5;
      const offset = (currentPage - 1) * listPerPage;
      const status = req.query.status;
      let condition = { isDeleted: false }
      if(status) condition.status = status;

      const list = await db.schedule.find(
        condition,
        null,
        {
          skip: offset,
          take: listPerPage,
        }
      );
      const totalCount = await db.schedule.countDocuments(condition)
      return response.success(
        res,
        {list,totalCount},
        req.languageCode,
        "SCHEDULE_INFO"
      );
    } catch (error) {
      return response.internalServerError(res, error);
    }
  },
  deleteSchedule: async function (req, res) {
    try {
      const id = req.params.id;

      const user = await db.schedule.findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        { isDeleted: true }
      );

      return response.success(res, {}, req.languageCode, "SCHEDULE_DELETED");
    } catch (error) {
      return response.internalServerError(res, error);
    }
  },
  updateSchedule: async function (req, res) {
    try {
      const id = req.params.id;
      const scheduleInfo = await db.schedule.findOne({ _id: new ObjectId(id) , isDeleted : false});
      if (!scheduleInfo)
        return response.notFound(res, req.languageCode, "SCHEDULE_NOT_FOUND");
      if (req.body.to) scheduleInfo.to = req.body.to;
      if (req.body.emailText) scheduleInfo.emailText = req.body.emailText;
      if (req.body.subject) scheduleInfo.subject = req.body.subject;
      if (req.body.date) scheduleInfo.data = req.body.date;
      scheduleInfo.save();
      return response.success(res, {}, req.languageCode, "SCHEDULE_UPDATED");
    } catch (error) {
      return response.internalServerError(res, error);
    }
  },
  createSchedule: async function (req, res) {
    try {
      const data = new db.schedule({
        to: req.body.to,
        emailText: req.body.emailText,
        subject: req.body.subject,
        date: req.body.date,
      });
      const scheduleData = await data.save();

      return response.success(
        res,
        scheduleData,
        req.languageCode,
        "SCHEDULE_CREATE"
      );
    } catch (error) {
      return response.internalServerError(res, error);
    }
  },
};
