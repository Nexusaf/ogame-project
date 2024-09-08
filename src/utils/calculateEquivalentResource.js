/**
 * Calculates the equivalent cost of a resource in terms of metal, crystal, or deuterium.
 *
 * @param {string} resource - The type of resource to calculate the equivalent cost for ('metal', 'crystal', or 'deuterium').
 * @param {Object} values - An object containing the amounts of metal, crystal, and deuterium.
 * @param {number} values.metal - The amount of metal.
 * @param {number} values.crystal - The amount of crystal.
 * @param {number} values.deuterium - The amount of deuterium.
 * @returns {Object} An object with the equivalent cost or an error message if something went wrong.
 * @throws Will throw an error if the resource type is invalid or the values object is malformed.
 */
const calculateEquivalentResource = (resource, values = {}) => {
  if (!resource || typeof resource !== "string") {
    throw new Error("Invalid resource type")
  }

  const { metal, crystal, deuterium } = values
  if (typeof metal !== "number" || typeof crystal !== "number" || typeof deuterium !== "number") {
    throw new Error("Invalid values object: all values must be numbers")
  }

  let equivalentCost

  switch (resource.toLowerCase()) {
    case "metal":
      equivalentCost = metal + (crystal * 1.5) + (deuterium * 3)
      return { perMetalEquivalent: equivalentCost }

    case "crystal":
      equivalentCost = (metal / 1.5) + crystal + (deuterium * 2)
      return { perCrystalEquivalent: equivalentCost }

    case "deuterium":
      equivalentCost = (metal / 3) + (crystal / 2) + deuterium
      return { perDeuteriumEquivalent: equivalentCost }

    default:
      throw new Error("Invalid resource type")
  }
}

// Example usage
// console.log(calculateEquivalentResource("metal", { metal: 100, crystal: 50, deuterium: 25 }))

export default calculateEquivalentResource
