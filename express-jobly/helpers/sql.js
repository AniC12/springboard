const { BadRequestError } = require("../expressError");


/**
 * Generate SQL query parts for a partial update.
 *
 * This function converts an object containing data to update into the
 * respective SQL column setters and an array of values.
 *
 * @param {Object} dataToUpdate - An object where the keys represent column names
 *    and the values are the new values to set.
 * @param {Object} jsToSql - An optional mapping of JavaScript style camelCase
 *    keys to SQL style snake_case keys.
 * @returns {Object} An object containing two properties: 'setCols' (a string
 *    with SQL formatted column assignments) and 'values' (an array of values to 
 *    use in the SQL query).
 * @throws {BadRequestError} Throws an error if no data is provided to update.
 *
 * @example
 * const data = {firstName: 'Aliya', age: 32};
 * const mappings = {firstName: 'first_name'};
 * sqlForPartialUpdate(data, mappings);
 * // Returns:
 * // {
 * //   setCols: '"first_name"=$1, "age"=$2',
 * //   values: ['Aliya', 32]
 * // }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
