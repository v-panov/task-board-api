import { DataTypes, Model, QueryTypes } from 'sequelize';
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
  },
  {
    modelName: 'board',
    timestamps: true,
  },
)
@InitAssociations((
  {
    board, lane, user,
  },
) => {
  board.hasMany(lane, { foreignKey: 'boardId' });

  board.belongsToMany(user, { as: 'members', through: 'user_board', foreignKey: 'boardId' });
})
class Board extends Model {
  static getUserBoards(userId) {
    return Board.sequelize.query(
      `
        SELECT "id", "title"
        FROM "boards"
          JOIN "user_board"
            ON "id" = "user_board"."boardId"
        WHERE "user_board"."userId" = :userId
        ORDER BY "boards"."createdAt"
      `,
      {
        replacements: {
          userId,
        },
        type: QueryTypes.SELECT,
      },
    );
  }
}

export default Board;
