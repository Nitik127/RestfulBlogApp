var express=require('express');
methodOverride =require('method-override');
var mongoose=require('mongoose');
var path =require('path');
var app=express();
var bodyParser=require('body-parser');

mongoose.connect("mongodb://localhost:27017/blog_camp",{ useNewUrlParser: true,useUnifiedTopology:true } );
var partialsPath = path.join(__dirname + '/views/partials');
//app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride('_method'));
// set the view engine
app.set("view engine","ejs");

//schema set MOONgose MODEL CONFIG
 var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date,default : Date.now}
});
var Blog=mongoose.model("Blog",blogSchema);

//Blog.create({
    //title:"Puppy",
     //image:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fhips.hearstapps.com%2Fhmg-prod.s3.amazonaws.com%2Fimages%2Fdog-puppy-on-garden-royalty-free-image-1586966191.jpg%3Fcrop%3D1.00xw%3A0.669xh%3B0%2C0.190xh%26resize%3D640%3A*&imgrefurl=https%3A%2F%2Fwww.goodhousekeeping.com%2Flife%2Fpets%2Fg4531%2Fcutest-dog-breeds%2F&tbnid=sgZuc8rXuAGvoM&vet=12ahUKEwjQho_Itp7uAhVKnksFHT0tDPwQMygEegUIARDXAQ..i&docid=2r6Arj4-hBjhNM&w=640&h=321&q=puppy%20images&ved=2ahUKEwjQho_Itp7uAhVKnksFHT0tDPwQMygEegUIARDXAQ",
     //body:"Hello this is the pic of my ppuppy",
//},function(err,blogs){
    //if(err){
        //console.log(err)
    //}else{
  //console.log("Newly cretaed blog_app");
       // console.log(blogs)
    //}
    //});

//RESTFUl Route-all 7 route in this APP 
app.get('/',function(req,res){
    res.redirect('/blogs')
});
app.get('/blogs',function(req,res){
    Blog.find({},function(err,blogs){
        if (err){
            console.log("ERROR!");
            console.log(err);
        }else{
        res.render('index',{blogs:blogs})
        }
    });
    //res.render("index.ejs");
});
//New route 
app.get('/blogs/new',function(req,res){
res.render("new");
});

//create route
app.post("/blogs",function(req,res){
Blog.create(req.body.blog,function(err,newBlog){
    if(err){
        res.render("new");
    }else{
res.redirect("/blogs");
    }
});
});

//show route
app.get('/blogs/:id',function(req,res){
Blog.findById(req.params.id,function(err,foundBlog){
if(err){
    res.redirect("/blogs");

}else{
    res.render("show",{blog:foundBlog});

}
});
});
//edit route
app.get('/blogs/:id/edit',function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        
        }else{
            res.render("edit",{blog:foundBlog});
        }
    });
});
//update route
app.put('/blogs/:id',function(req,res){
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updateBlog){
       if(err){
           res.redirect("/blogs");
       }else{
           res.redirect("/blogs/"+req.params.id);
       }

    })
});
//Delet route
app.delete("/blogs/:id",function(req,res){
Blog.findByIdAndRemove(req.params.id,function(err){
if(err){
    res.redirect("/blogs");
}else{
    res.redirect("/blogs");
}
});
});

app.listen(9000,function(req,res){
    console.log("Running Successly");
});