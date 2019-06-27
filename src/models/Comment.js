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
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'comment',
    timestamps: true,
  },
)
@InitAssociations(({ comment, card, user }) => {
  card.hasMany(comment, { foreignKey: 'cardId' });
  comment.belongsTo(user, { as: 'member', foreignKey: 'userId' });
})
class Comment extends Model {
}

export default Comment;
