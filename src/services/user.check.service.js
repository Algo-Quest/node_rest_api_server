import userModel from "../models/user.model";

async function userCheckService(body) {
    const { email, password } = body;

    const user = await userModel.findOne({ email: email, password: password }).lean();

    if (!user) {
        return false
    };

    return user;
}

export default userCheckService;