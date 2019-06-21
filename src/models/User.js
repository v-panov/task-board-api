import { Model, DataTypes } from 'sequelize';
import jwt from 'jsonwebtoken';

import appConfig from '../../config/config';
import InitAssociations from '../decorators/InitAssociations';
import InitModel from '../decorators/InitModel';

@InitModel(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return [this.firstName, this.lastName].filter(Boolean).join(' ');
      },
    },
    initials: {
      type: DataTypes.VIRTUAL,
      get() {
        return [this.firstName, this.lastName].filter(Boolean).map(e => e[0]).join('');
      },
    },
  },
  {
    modelName: 'user',
    timestamps: true,
  },
)
@InitAssociations(({ user, board, card }) => {
  user.belongsToMany(board, { through: 'user_board', foreignKey: 'userId' });

  user.belongsToMany(card, { through: 'user_card', foreignKey: 'userId' });
})
class User extends Model {
  toUIModel() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      token: this.generateJWT(),
      fullName: this.fullName,
      initials: this.initials,
    };
  }

  toMember() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.fullName,
      initials: this.initials,
    };
  }

  generateJWT() {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
      },
      appConfig.JWT_SECRET,
      { expiresIn: '1w' }, // one week
    );
  }
}

export default User;
