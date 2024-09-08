import {
  listPlanets,
  findPlanetByName,
  findPlanetById,
  update,
  updateAll,
  generateReport,
} from '../domain/planetActions.js';

import { validatePlanetData } from './utils.js';

const planetController = {
  listAll: async (req, res) => {
    try {
      const planets = await listPlanets();
      res.status(200).json(planets);
    } catch (error) {
      res.status(500).json({ error: 'Error listing planets', details: error.message });
    }
  },

  findByName: async (req, res) => {
    try {
      const { name } = req.params;
      const planet = await findPlanetByName(name);
      if (planet) {
        res.status(200).json(planet);
      } else {
        res.status(404).json({ error: 'Planet not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error finding planet by name', details: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const planet = await findPlanetById(id);
      if (planet) {
        res.status(200).json(planet);
      } else {
        res.status(404).json({ error: 'Planets not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error finding planet by ID', details: error.message });
    }
  },

  updatePlanet: async (req, res) => {
    try {
      const planet = req.body;
      const { id } = planet;

      const validationResult = validatePlanetData(planet);
      if (!validationResult.success) {
        return res.status(400).json({ error: validationResult.message });
      }

      const updatedPlanet = await update(id, planet);
      if (updatedPlanet.success) {
        res.status(200).json(updatedPlanet);
      } else {
        res.status(404).json({ error: 'Planet not found or incorrect ID provided.' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Error updating planet data', details: error.message });
    }
  },

  updateAll: async (req, res) => {
    try {
      const planets = req.body;

      if (!Array.isArray(planets) || planets.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty array provided' });
      }

      for (const planet of planets) {
        const validationResult = validatePlanetData(planet);
        if (!validationResult.success) {
          return res.status(400).json({ error: validationResult.message });
        }
      }

      const result = await updateAll(planets);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error updating all planets', details: error.message });
    }
  },

  report: async (req, res) => {
    try {
      const report = await generateReport();
      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ error: 'Error generating report', details: error.message });
    }
  },
};

export default planetController;
