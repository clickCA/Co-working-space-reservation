const mongoose = require("mongoose");

const CoworkingSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    tel: {
      type: String,
      required: [true, "Please add a phone number"],
      maxlength: [20, "Phone number can not be longer than 20 characters"],
      match: [
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
        "Please add a valid phone number",
      ],
    },
    openTime: {
      type: String,
      required: [true, "Please add the open time"],
      validate: {
        validator: function (value) {
          const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
          return timeRegex.test(value);
        },
        message: "Please add a valid open time (HH:MM)",
      },
    },
    closeTime: {
      type: String,
      required: [true, "Please add the close time"],
      validate: {
        validator: function (value) {
          const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
          return timeRegex.test(value);
        },
        message: "Please add a valid close time (HH:MM)",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("CoworkingSpace", CoworkingSpaceSchema);

//Reverse populate with virtuals
CoworkingSpaceSchema.virtual("reservations", {
  ref: "Reservation",
  localField: "_id",
  foreignField: "coworkingSpace",
  justOne: false,
});

//Cascade delete reservations when a coworking space is deleted
CoworkingSpaceSchema.pre("remove", async function (next) {
  console.log(`Reservations being removed from coworking space ${this._id}`);
  await this.model("Reservation").deleteMany({ coworkingSpace: this._id });
  next();
});
