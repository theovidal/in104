const db = require('../../db/models')
const { Sequelize } = require('sequelize')

exports.getPresences = (lectureId = undefined, userId = undefined, isPresent = undefined, includeUser = false, includeLecture = false) => {
  let where = {
    userId,
    lectureId,
    isPresent
  }
  for (const i in where) {
    if (where[i] === undefined) delete where[i];
  }

  return new Promise((resolve, reject) => {
    db.Presences.findAll({
      where
    }).then( vals => {
      let dataValues = vals.map(value => value.dataValues)
      resolve(dataValues);
    }).catch( reject );
  });
}
