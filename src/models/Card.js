import { DataTypes, Model } from 'sequelize';

import InitModel from '../decorators/InitModel';
import InitAssociations from '../decorators/InitAssociations';

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
    priority: {
      type: DataTypes.INTEGER,
    },
    position: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: 'card',
    timestamps: true,
  },
)
@InitAssociations(({ card, user }) => {
  card.belongsToMany(user, { as: 'members', through: 'user_card', foreignKey: 'cardId' });
})
class Card extends Model {
}

export default Card;
