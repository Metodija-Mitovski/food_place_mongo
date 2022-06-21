const mongoose = require("mongoose");

const User = mongoose.model(
    "users",
    {
        first_name: String,
        last_name: String,
        email: {
            type: String,
            unique: true,
        },
        verify: {
            secret_id: String,
            time_stamp: Date,
            verified: {
                type: Boolean,
                default: false
            }
        },
        password: String,
        birthday: String,
        image:String
    },
    "users"
);

const create = async (data) => {
    let u = new User(data);
    return await u.save();
};

const getByEmail = async (email) => {
    return await User.findOne({ email });
};

const update = async (id, data) => {
    return await User.updateOne({ _id: id }, data);
};

const updateBySecretId = async(id)=>{
    const u = await User.updateOne({'verify.secret_id':id},{'verify.verified':true});
    return u.modifiedCount !== 0;
};

const getById = async (id) => {
    return await User.findById(id).select("-password");
};

const getBySecretId = async(secretId)=>{
    return await User.findOne({'verify.secret_id':secretId});
};

const updateVerifyData = async(id,data)=>{
    const u = await User.updateOne({'verify.secret_id':id},{verify:data});
    return u.modifiedCount !== 0;
};

module.exports = {
    create,
    getByEmail,
    update,
    getById,
    updateBySecretId,
    getBySecretId,
    updateVerifyData
};
