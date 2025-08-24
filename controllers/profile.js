const User=require("../models/User")
const bcrypt=require("bcryptjs")
const userProfile=async(req,res)=>{
   try{
    const userId=req.user.id
    const connected=await User.findOne({_id:userId })
    connected.password=undefined
    res.status(200).json({
        messaage:"User details",user:connected
    })
   }catch(error){
    return res.status(400)
   }
}

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { userFirstName, userLastName, userPassword, lastUserPassword } = req.body;

        const isExist = await User.findOne({ _id: userId });
        
        if (!isExist) {
            return res.status(404).json({ message: "User not found" });
        }

        const isValidPass = await bcrypt.compare(lastUserPassword, isExist.password);
        
        if (!isValidPass) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // Prepare update object
        let updateData = {
            firstName: userFirstName,
            lastName: userLastName
        };

        // Only update password if a new one is provided
        if (userPassword && userPassword.trim() !== '') {
            const encryptedPassword = await bcrypt.hash(userPassword, 12);
            updateData.password = encryptedPassword;
        }

        const updateResult = await User.updateOne(
            { _id: userId },
            updateData
        );
        
        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        updateResult.password=undefined

        res.status(200).json({
            message: "User has been updated successfully",
            user: updateResult
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
const ForgetPassword=async(req,res)=>{
   try{
     const {userEmail,userPassword}=req.body
     if(!userEmail || !userPassword){
        return res.status(400).json({
            message:"You have to fill all the information"
        })
     }
    const isExist=await User.findOne({
        email:userEmail
    })
    if(!isExist){
       return res.status(400).json({
            messaage:"Invalide Email"
        })
    }
    const encryptedPassword=await bcrypt.hash(userPassword,12)
    const updatePassword=await User.updateOne({
        _id:isExist._id
    },{
        password:encryptedPassword
    })
    res.status(200).json({
        message:"Password updated",
        user:updatePassword
    })
   }catch(error){
    return res.status(500).json(error.messaage)

   }


}
module.exports={userProfile,updateUserProfile,ForgetPassword}