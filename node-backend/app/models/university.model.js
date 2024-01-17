const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const University = sequelize.define("university", {
    domains: {
      type: Sequelize.STRING,
      get() {
        return this.getDataValue("domains").split(";");
      },
      set(val) {
        this.setDataValue("domains", val.join(";"));
      },
    },
    name: {
      type: Sequelize.STRING,
    },
    alpha_two_code: {
      type: Sequelize.STRING,
    },
    web_pages: {
      type: Sequelize.STRING,
      get() {
        return this.getDataValue("web_pages").split(";");
      },
      set(val) {
        this.setDataValue("web_pages", val.join(";"));
      },
    },
    state_province: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
  });

  return University;
};
