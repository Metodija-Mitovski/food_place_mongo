const mongoose = require("mongoose");

const Recipe_Schema = new mongoose.Schema(
    {
        title: String,
        category: {
            type: String,
            enum: ["breakfast", "brunch", "lunch", "dinner"],
        },
        preparation_time: Number,
        no_people: Number,
        short_desc: String,
        description: String,
        image: String,
        likes: {
            users: [mongoose.Types.ObjectId],
            like_count: {
                type: Number,
                default: 0,
            },
        },
        author: String,
    },
    { timestamps: true }
);

const Recipe = mongoose.model("recipe", Recipe_Schema);

const create = async (data) => {
    const recipe = new Recipe(data);
    return await recipe.save();
};

const partialUpdate = async (id, user_id, data) => {
    return await Recipe.updateOne({ _id: id, author: user_id }, data, {
        runValidators: true,
    });
};

const remove = async (id, user_id) => {
    return await Recipe.findOneAndDelete({ _id: id, author: user_id });
};

const getNew = async () => {
    return await Recipe.find({}).sort({ createdAt: "-1" }).limit(3);
};

const getByLikes = async () => {
    return await Recipe.find({}).sort({ "likes.like_count": "-1" }).limit(9);
};

const getByCategory = async (category) => {
    return await Recipe.find({ category }).sort({ createdAt: "-1" }).limit(9);
};

const getAllByUser = async (id) => {
    return await Recipe.find({ author: id }).sort({ createdAt: "-1" })
};

const getOne = async (id) => {
    return await Recipe.findById(id)
}

const updateLikesInc = async (userId, recipeId) => {
    return Recipe.findOneAndUpdate({ _id: recipeId }, { $push: { 'likes.users': userId }, $inc: { 'likes.like_count': 1 } })
}

const updateLikesDec = async (userId, recipeId) => {
    return Recipe.findOneAndUpdate({ _id: recipeId }, { $pull: { 'likes.users': userId }, $inc: { 'likes.like_count': -1 } })
}

module.exports = {
    create,
    partialUpdate,
    remove,
    getNew,
    getByLikes,
    getByCategory,
    getAllByUser,
    getOne,
    updateLikesInc,
    updateLikesDec
};
