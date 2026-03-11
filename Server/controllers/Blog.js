import Blog from '../models/Blog.js'

const postblogs=async(req,res)=>{
    const {title ,category ,content ,author}=req.body;

    if(!title ||!category || !content || !author){
        return res.json({
            success:false,
            message:"title category content author is required "

        })
    }


    const newBlog=new Blog({title,category,content,author,slug:`temp slug:${Date.now()}`});

    const response= await newBlog.save();
    response.slug=`${title.toLowerCase().replace(/ /g,"-")}-${response._id}`;
    await response.save();

    res.json({
        success:true,
        data:response,
        message:"Blog created successfully"
    })

}

const getblogs=async(req,res)=>{
    const Fetch=await Blog.find().populate('author',"_id name email");
    res.json({
        success:true,
        data:Fetch,
        message:"Blog Fetch successfully"
    })

 
}

export{postblogs,getblogs}