import User from '../models/User.js'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
const signup= async(req,res)=>{
    const {name,email,password}=req.body;
    const emailValidation = /^\w+([.\-]?\w+)*@\w+([.\-]?\w+)*(\.\w{2,3})+$/;
    const namevalidation=/^[A-Za-z]{3,16}$/;
    const passwordvalidation=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!namevalidation.test(name)){
        return res.status(400).json({
            sucess:false,
            message:"Name is required"
        })
        if(!emailValidation.test(email)){
            return re.json({
                success:false,
                message:"Email is required"
            })
        }
        if(!passwordvalidation.test(password)){
            return res.json({
                success:false,
                message:"password is required"
            })
        }
    }
    const existuser= await User.findOne({email});

    
    if(existuser){
        res.json({
            success:false,
            message:`user with ${email} are already exists`
        })
    }
    const newUser= new User({name,email,password:md5(password)});
    const saved= await newUser.save();

    res.json({
        success:true,
        data:saved,
        message:"User registered successfully"

    })

}
const login= async(req,res)=>{
    const {email,password}=req.body;
    const user= await User.findOne({email,password:md5(password)}).select("_id name email");

    if(!user){
        return res.status(400).json({
            success:false,
            data:undefined,
            message:"User not exists"
        })
    }

    // if(!md5(password)){
    //     return res.status(400).json({
    //         success:false,
    //         message:"password is wrong"
    //     })
    // }
         const token=jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_secret,
            {expiresIn:"1d"}
         )
     res.json({
            success:true,
            data:user,
            message:"Login successfully",
            token
        })

   


}
export{signup,login}