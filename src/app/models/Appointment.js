module.exports = (sequelize, Datatypes) => {
  const Appointment = sequelize.define("Appointment", {
    date: Datatypes.DATE
  });

  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { as: "user", foreignKey: "user_id" });

    Appointment.belongsTo(models.User, {
      as: "provider",
      foreignKey: "provider_id"
    });
  };

  return Appointment;
};
