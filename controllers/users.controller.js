const { use } = require('../routes/v1/user.route');
const fs = require('fs');
const { json } = require('stream/consumers');

module.exports.getAllUsers=(req,res,next)=>{

    if(req.query.limit){
        const {limit} = req.query;
    console.log(limit)
    const user=require('../user.json')
    res.json(user.slice(0,limit))
    res.json(user)
    }

    else{
        const user=require('../user.json')
     res.send(user)
    }
  }

  module.exports.getRandomUser=(req,res,next)=>{
    const id= req.params.id;
    const filter = {id:id};
    
    const users=require('../user.json')
    const newUser = users.find(user=>user.id ==Number(id));
    
    res.send(newUser)
  
}


  module.exports.saveAUser=(req,res,next)=>{
    
    const data = fs.readFileSync('user.json')
    fs.readFile('user.json',(data,err)=>{
      

    })
    const dataObject=JSON.parse(data)
     
  


    // console.log(users)
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const gender = req.body.gender;
    const contact = req.body.contact;
    const address = req.body.address;

    
   
   dataObject.push({
    id:(dataObject.length +1),
    name,
    imageUrl,
    gender,
    contact,
    address
})

fs.writeFileSync("user.json",JSON.stringify(dataObject),(err)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("File written successfully\n");
  }
})
   
    
    res.send(dataObject)
}

// update user

module.exports.updateUser=(req,res)=>{
 
  let user

  fs.readFile('user.json', (err, data) => {
      if (err) {
          res.send('Some error')

      }
      else {
          user = JSON.parse(data)
         
          const {id}=req.params;
          console.log(id)
          
          const updateUser=user.map(x=>{

            if(x.id==id){
              const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const gender = req.body.gender;
    const contact = req.body.contact;
    const address = req.body.address;
              return {
                ...x,
                name,
                contact,
                imageUrl,
                gender,
                address
                }
              
            }
            else{
              return x
            }
            

          })
           fs.writeFileSync("user.json",JSON.stringify(updateUser),(err)=>{
            if(err){
              console.log('something went wrong')
            } else{
              console.log('user updated successfully')
            }
           })
           res.send(updateUser)
          }

      // const upadte=use.filter(x=>x.id!==id)
    })
}



// Delete User


module.exports.deleteUser=(req,res)=>{
  // const {id}= req.params;
  // const filter = {_id:id};
  // tools = tools.filter(tool=>tool.id !==Number(id));
  let user;
  fs.readFile("user.json",(err,data)=>{
    if(err){
      console.log('something went wrong')
    } else{
      user = JSON.parse(data)
         
          const {id}=req.params;
          console.log(id)

          const deleteUser = user.filter(x=>x.id!==Number(id))
         
fs.writeFileSync('user.json',JSON.stringify(deleteUser),(err)=>{
      if(err){
        console.log('Something went wrong')
      } else{
        console.log('delete user successfully')
      }
    })
    res.send(deleteUser)

    }
    
  })

 

}






