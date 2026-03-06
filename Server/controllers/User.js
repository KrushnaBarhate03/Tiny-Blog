import User from '../models/User.js'
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
    const newUser= new User({name,email,password});
    const saved= await newUser.save();

    res.json({
        success:true,
        data:saved,
        message:"User registered successfully"

    })

}
const login=(req,res)=>{

}
export{signup,login}