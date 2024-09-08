import { getShipsData } from "../data/dataAccess.js"

const getShips = async () => {
  try {
    const ships = await getShipsData()
    return { success: true, data: ships }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

const calculateCargo = async (shipName, totalUnits = 1) => {
  try {
    const ships = await getShipsData()
    const ship = ships.find(ship => ship.name === shipName)

    if (!ship) {
      throw new Error("Ship not found")
    }

    const shipNumbers = Math.ceil(totalUnits / ship.capacity)

    return {
      success: true,
      data: {
        shipName,
        totalUnits,
        shipNumbers
      }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

const calculateCost = async (shipName, quantity = 1) => {
  try {
    const ships = await getShipsData()
    const ship = ships.find(ship => ship.name === shipName)

    if (!ship) {
      throw new Error("Ship not found")
    }
    let { metal, crystal, deuterium } = ship.cost
    return {
      success: true,
      data: {
        shipName,
        quantity,
        metal: metal * quantity,
        crystal: crystal * quantity,
        deuterium: deuterium * quantity,
      }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

const calculateFleetCargo = async (fleet) => {
  try {
    const ships = await getShipsData();
    if (!Array.isArray(fleet) || fleet.length === 0) {
      throw new Error('Invalid fleet data');
    }

    let totalCapacity = 0;

    const fleetCargo = fleet.map(({ shipName, quantity }) => {
      const shipData = ships.find(({ name }) => name === shipName);

      if (!shipData) {
        throw new Error(`Ship not found: ${shipName}`);
      }

      const shipCapacity = quantity * shipData.capacity;
      totalCapacity += shipCapacity;

      return {
        shipName: shipData.name,
        shipNumber: quantity,
        shipCapacity
      };
    });

    return { success: true, data: [...fleetCargo, { totalCapacity }] };
  } catch (error) {
    console.error('Error calculating fleet cargo:', error.message);
    return { success: false, error: error.message };
  }
};


export { getShips, calculateCargo, calculateCost, calculateFleetCargo }
