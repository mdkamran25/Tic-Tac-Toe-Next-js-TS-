import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema<UserSchema>({
    name:{type:String, required: true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required: true}
},{
    timestamps:true
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;