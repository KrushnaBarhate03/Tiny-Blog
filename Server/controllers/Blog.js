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


const getblogbyslug=async(req,res)=>{
    const{slug} = req.params;
    // console.log(`This is a Slug ${slug}`);

    const response= await Blog.findOne({slug}).populate("author", "_id name email");
    res.json({
        success:true,
        data:response,
        message:"Blog fetch by Slug successfully"
    })

    
}


const publishblog=async(req,res)=>{
    const {slug}=req.params;

    
const response=await Blog.findOneAndUpdate({slug},{status:"publish"},{new:true})
res.json({
    success:true,
    data:response,
    message:"Blog publish successfully"
})

}

const editblog=async(req,res)=>{
    const {slug}=req.params;
    const {title,category,content,author}=req.body;
    if(!title,!category,!content,!author){
        return res,json({
            success:false,
            message:"Title category content author status is required"
        })

    }
    const response=await Blog.updateOne({slug},{$set:{title:title,category:category,content:content,author:author}});
    res.json({
        success:true,
        data:response,
        message:"Your Record update successfully"
    })
   
}

export{postblogs,getblogs,getblogbyslug,editblog,publishblog}