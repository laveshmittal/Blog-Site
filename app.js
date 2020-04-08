//jshint esversion:6

// use the route /compose to post a blog


const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Hello! This blog contains the report of what i have learned throughout my day!";

const aboutStartingContent = "I'm Lavesh Mittal, a Coder!";
const contactStartingContent = "Contact me at laveshmittal@yahoo.com";

const app = express();
const posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  let homeContent = homeStartingContent;
  res.render("home",{homeContent:homeContent,posts:posts});
});

app.get("/contact",function(req,res){
  let contactContent = contactStartingContent;
  res.render("contact",{contactContent:contactContent});
});

app.get("/about",function(req,res){
  let aboutContent = aboutStartingContent;
  res.render("about",{aboutContent:aboutContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:post",function(req,res){
  let flag = 0;
  for(var i=0;i<posts.length;i++){
    if(_.lowerCase(posts[i].title)===_.lowerCase(req.params.post)){
      flag = 1;
      res.render("post",{title:posts[i].title,content:posts[i].content});
      }
  }
  if(flag===0){
  res.render("post",{title:"ERROR",content:"No post found"});
      }
});

app.post("/compose",function(req,res){

  const blog = {
    title:req.body.blogTitle,
    content:req.body.blogPost
  }
  posts.push(blog);
  res.redirect("/");



})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
