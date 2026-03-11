const getUser=()=>{
    const user=localStorage.getItem('username');
    if(user){
        return JSON.parse(user)
    }
    else{
        return null
    }
}
export{getUser}