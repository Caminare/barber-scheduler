const moment = require("moment");
const { Op } = require("sequelize");
const { Appointment } = require("../models");

class ScheduleController {
  async index(req, res) {
    const date = moment();

    const appointments = await Appointment.findAll({
      include: ["user"],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            date.startOf("day").format(),
            date.endOf("day").format()
          ]
        }
      }
    });

    appointments.sort((a, b) => (a.date > b.date ? 1 : -1));

    res.render("schedule/schedule", { appointments });
  }

  async destroy(req, res) {
    const detroy = await Appointment.destroy({
      where: {
        id: req.params.appointment
      }
    });

    res.redirect("/app/dashboard");
  }
}

module.exports = new ScheduleController();
