const { Router } = require('express');
const MateriaisController = require('../controllers/MateriaisController');
const { materialsInsertSchema, materialsSelectByIDSchema } = require('../middlewares/MaterialsValidation');

const MateriaisRoutes = Router();

MateriaisRoutes
  .get('/:id', materialsSelectByIDSchema, MateriaisController.getMaterial);
MateriaisRoutes.get('/', MateriaisController.getMateriais);
MateriaisRoutes
  .post('/', materialsInsertSchema, MateriaisController.addMaterial);
MateriaisRoutes.put(
  '/:id',
  materialsInsertSchema,
  materialsSelectByIDSchema,
  MateriaisController.updateMaterial
);
MateriaisRoutes.delete(
  '/:id',
  materialsSelectByIDSchema,
  MateriaisController.deleteMaterial
);

module.exports = MateriaisRoutes;