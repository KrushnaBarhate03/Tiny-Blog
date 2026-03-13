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
    const {author}=req.query
   
    const condition=[{status:"published"}];
if(author){
    condition.push({author:author})
}

    const Fetch=await Blog.find({$or:condition}).populate('author',"_id name email").sort({status:1,createdAt:-1});
    res.json({
        success:true,
        data:Fetch,
        message:"Blog Fetch successfully"
    })

 
}

export{postblogs,getblogs}