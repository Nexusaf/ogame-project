/**
 * Calculates the total resources plundered by attacking with a specific loot fraction over multiple rounds.
 *
 * @param {number} lootFraction - The fraction of resources plundered in each attack (must be between 0 and 1, exclusive). For example: 0.5 for 50%.
 * @param {number} initialShips - The initial number of ships available for plunder.
 * @returns {Object} An object containing:
 *   - {number} totalPercentage - The total percentage of resources plundered as a decimal value.
 *   - {number} totalShips - The total number of ships plundered over the rounds.
 *   - {number[]} rounds - An array containing the number of ships plundered in each round.
 *   - {string} formattedTotalPercentage - The total percentage of resources plundered formatted as a string with two decimal places and a percentage symbol.
 * @throws {Error} If the loot fraction is not between 0 and 1, or if the initial number of ships is less than or equal to 0.
 */

const calculatePlunder = (initialShips, lootFraction = 0.5) => {
  if (lootFraction <= 0 || lootFraction >= 1) {
    throw new Error('The loot fraction must be between 0 and 1 (exclusive).')
  }

  if (initialShips <= 0) {
    throw new Error('The initial number of ships must be greater than 0')
  }

  const remainingFraction = 1 - lootFraction
  let ships = initialShips
  let totalShips = 0
  const rounds = []

  while (ships > 10) {
    totalShips += ships
    rounds.push(ships)
    ships = Math.ceil(ships * remainingFraction)
  }

  const totalPercentage = 1 - Math.pow(remainingFraction, rounds.length)
  const formattedTotalPercentage = `${(totalPercentage * 100).toFixed(2)}%`

  return {
    totalPercentage,
    totalShips,
    rounds,
    formattedTotalPercentage
  }
}

// Exaple usage
// console.log(calculatePlunder(100))

export default calculatePlunder