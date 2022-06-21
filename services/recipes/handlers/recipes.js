const recipe = require("../../../pkg/recipes");
const validate = require("../../../pkg/recipes/validate");
const sanitaze = require("../../../pkg/sanitazers");

const create = async (req, res) => {
    req.body.author = req.user.uid;
    sanitaze.clear(req.body);
    try {
        await validate(req.body, "CREATE");
    } catch (error) {
        return res.status(400).send(error);
    }

    try {
        const r = await recipe.create(req.body);
        res.status(201).send(r);
    } catch (error) {
        console.log(error);
        if (error.errors) {
            return res.status(400).send("Invalid value");
        }
        res.status(500).send(error);
    }
};

const update = async (req, res) => {
    sanitaze.clear(req.body);

    try {
        await validate(req.body, "UPDATE");
    } catch (error) {
        return res.status(400).send(error);
    }

    try {
        const r = await recipe.partialUpdate(req.params.id, req.user.uid, req.body);

        if (!r.matchedCount) {
            return res.status(404).send("Not found");
        }
        res.status(204).send();
    } catch (error) {
        if (error.errors) {
            return res.status(400).send("Invalid value");
        }
        res.status(500).send(error);
    }
};

const removeOne = async (req, res) => {
    try {
        const r = await recipe.remove(req.params.id, req.user.uid);
        if (!r) {
            return res.status(404).send("Not found");
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error);
    }
};

const getLatest = async (req, res) => {
    try {
        const recipes = await recipe.getNew();
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getTopRated = async (req, res) => {
    try {
        const recipes = await recipe.getByLikes();
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getCategory = async (req, res) => {
    try {
        const recipes = await recipe.getByCategory(req.params.category);
        res.status(200).send(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getMine = async (req, res) => {
    try {
        const recipes = await recipe.getAllByUser(req.user.uid);
        res.status(200).send(recipes);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const updateLike = async (req, res) => {
    try {

        const r = await recipe.getOne(req.params.id)
        if (!r) {
            return res.status(404).send("Not found")
        }

        if (!r.likes.users.includes(req.user.uid)) {
            await recipe.updateLikesInc(req.user.uid, r._id)
        }
        if (r.likes.users.includes(req.user.uid)) {
            await recipe.updateLikesDec(req.user.uid, r._id)
        }

        res.status(204).send()

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = {
    create,
    update,
    removeOne,
    getLatest,
    getTopRated,
    getCategory,
    getMine,
    updateLike
};
