const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        title: { type: String, unique: true, index: true },
        slug: { type: String, unique: true, index: true, lowercase: true },
        description: { type: String },
    },
    { timestamps: true },
);
CategorySchema.pre("validate", function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});
CategorySchema.methods.slugify = function () {
    this.slug = slug(this.title) + "-" + ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};
module.exports = mongoose.model("Category", CategorySchema);
