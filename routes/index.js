const scheduleRouter = require("../api/scheduleEmail/scheduleEmail.router")

const initialize = (app) => {
	app.use('/api/schedule', scheduleRouter);
}

module.exports = {
    initialize,
};