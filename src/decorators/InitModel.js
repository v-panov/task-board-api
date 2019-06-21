/**
 * Assign initModel function to Model
 */
export default (attributes, options) => (target) => {
  target.initModel = sequelize => target.init(attributes, {
    ...options,
    sequelize,
    modelName: options.modelName || target.name,
  });

  return target;
};
