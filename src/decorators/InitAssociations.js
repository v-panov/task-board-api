/**
 * Assign initAssociations function to Model
 */
export default fn => (target) => {
  target.initAssociations = sequelize => fn(sequelize.models);

  return target;
};
