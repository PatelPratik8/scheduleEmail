const schedule = require("node-schedule");
const sendEmail = require("./email")

const job = schedule.scheduleJob("* * * * *", async function () {
//   console.log("JOb Run")
  let data = await db.schedule.find({ status:"schedule" , isDeleted: false , date : { $lt: Date.now()}});
  console.log(data);
  await Promise.all(
    data.map((e) =>{
        return sendEmail(e)
    })
    )
  console.log("done")
});

module.exports = job;
