const Joi = require("joi");

module.exports = {
    getSchedule: {
        params: Joi.object().keys({
          id: Joi.string().required()
        })
      },
    schedule: {
      query: Joi.object().keys({
        page: Joi.string().default(1),
        results: Joi.string().default(10),
        status: Joi.string().valid('schedule', 'success', 'rejected')
      })
    },
    deleteSchedule:{
      params: Joi.object().keys({
        id: Joi.string().required()
      })
    },
    updateSchedule: {
      params: Joi.object().keys({
        id: Joi.string().required()
      }),
      body: Joi.object().keys({
        to: Joi.string(),
        subject: Joi.string(),
        emailText: Joi.string(),
        date: Joi.number()
      })
    },
    createSchedule: {
      body: Joi.object().keys({
        to: Joi.string().required(),
        subject: Joi.string(),
        emailText: Joi.string(),
        date: Joi.number()
      })
    }
    
}