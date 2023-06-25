const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "lütfen kullanıcı adı girin"],
      maxlength: 50,
      minlength: 3,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "lütfen şifre girin"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "lütfen email girin"],

      unique: true,
    },
    tagler: [{ type: String }],
    followers: [{ type: String }],
    following: [{ type: String }],
    saved: [{ type: mongoose.Types.ObjectId, ref: "Article" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  const jws = "/B?E(G+KbPeShVmYq3t6w9z$C&F)J@Mc";
  return jwt.sign({ userId: this._id, name: this.name }, jws, {
    expiresIn: "30d",
  });
};

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
