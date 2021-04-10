const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      topType: { type: String, default: 'NoHair' },
      accessoriesType: { type: String, default: 'Blank' },
      hairColor: { type: String, default: 'BrownDark' },
      hatColor: { type: String, default: 'Black' },
      facialHairType: { type: String, default: 'Blank' },
      facialHairColor: { type: String, default: 'BrownDark' },
      clotheType: { type: String, default: 'BlazerSweater' },
      clotheColor: { type: String, default: 'Black' },
      eyebrowType: { type: String, default: 'Default' },
      mouthType: { type: String, default: 'Default' },
      skinColor: { type: String, default: 'Light' },
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema, 'users');
