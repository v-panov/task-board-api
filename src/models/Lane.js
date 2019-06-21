import { DataTypes, Model } from 'sequelize';

import InitAssociations from '../decorators/InitAssociations';
import InitModel from '../decorators/InitModel';

@InitModel(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
  },
  {
    modelName: 'lane',
    timestamps: true,
  },
)
@InitAssociations(({ lane, card }) => {
  lane.hasMany(card, { foreignKey: 'laneId' });
})
class Lane extends Model {
}

export default Lane;
