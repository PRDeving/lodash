import arrayMap from './arrayMap.js'
import baseMap from './baseMap.js'
import baseSortBy from './baseSortBy.js'
import compareMultiple from './compareMultiple.js'
import identity from '../identity.js'

/**
 * The base implementation of `orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  let index = -1
  iteratees = iteratees.length ? iteratees : [identity]

  const result = baseMap(collection, (value, key, collection) => {
    const criteria = arrayMap(iteratees, iteratee => iteratee(value))
    return { 'criteria': criteria, 'index': ++index, 'value': value }
  })

  return baseSortBy(result, (object, other) => compareMultiple(object, other, orders))
}

export default baseOrderBy
