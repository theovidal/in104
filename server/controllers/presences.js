const db = require('../../db/models')

exports.getPresences = async(lectureId = undefined, userId = undefined, isPresent = undefined, includeUser = false, includeLecture = false) => {
  let query = `
  select * from presences
    join users on users.id = presences.userId
    join lectures on lectures.id = presences.lectureId
   join courses on lectures.courseId = courses.id`;

  let replacements = {};
  // do we need to add a "and" after the query?
  let need_connection = false;

  if( lectureId !== undefined ) {
    query += " where lectureId = :lectid ";
    replacements.lectid = lectureId;
    need_connection = true;
  }

  if( userId !== undefined ) {
    query += (need_connection ? " and ": " where ") + " userId = :usrid ";
    need_connection = true;
    replacements.usrid = userId;
  }

  if( isPresent !== undefined ) {
    query += (need_connection ? " and ": " where ") + " presences.isPresent = :ispres ";
    need_connection = true;
    replacements.ispres = isPresent?1:0;
  }

  console.log(query, isPresent)

  const [res, meta] = await db.sequelize.query(query, {replacements});
  
  return res;
}