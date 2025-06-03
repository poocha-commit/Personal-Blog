import express from "express";
import bodyParser from "body-parser";


const app=express();
const port=3000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/contact",(req,res)=>{
    const messgsent=req.query.sent==="true";
    res.render("contact.ejs",{messgsent});
})

app.get("/writeBlog",(req,res)=>{
    
    res.render("create.ejs");
})
app.get("/edit-blog",(req,res)=>{
    const blogIndex=req.query.blogIndex;
    const blog=blogs[blogIndex]
    res.render("edit.ejs",{
        index:blogIndex,
        blog:blog
    });
})
app.post("/sendmessg",(req,res)=>{

    res.redirect("/contact?sent=true");
})

app.post("/writeBlog",(req,res)=>{
    const {title, author, content}=req.body;
    blogs.push({
        title,
        author,
        content,
        date:new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });
    res.redirect("/allBlogs")
})
app.post("/edit-blog",(req,res)=>{
    const index=parseInt(req.body.blogIndex, 10);
    if (!isNaN(index) && index >= 0 && index < blogs.length) {
    blogs[index].title = req.body.title;
    blogs[index].author = req.body.author;
    blogs[index].content = req.body.content;
    blogs[index].date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }
    res.redirect("/allBlogs");
})

app.get("/allBlogs",(req,res)=>{
    res.render("blogs.ejs",{
        blogs:blogs
    });
})

app.get("/view-blog",(req,res)=>{
    const blogIndex = req.query.blogIndex;
    res.render("viewblog.ejs",{
        index:blogIndex,
        blogs:blogs,
    });

})


app.post("/delete-blog",(req,res)=>{

  const index = parseInt(req.body.blogIndex,10);

  if (!isNaN(index) && index >= 0 && index < blogs.length) {
    blogs.splice(index, 1);
  }
  res.redirect("/allBlogs")
});

app.listen(port,()=>{
    console.log(`Server running successfully on port ${port}`);
});


const blogs=[];

blogs.push({
    title:"Debugging My Brain: Why CSS is Basically Therapy",

    author:"Pooja Satheesh",
    content:"Ever spent three hours trying to center a div only to realize you missed a semicolon?\n\nYeah, same.\n\nThere’s something oddly meditative about writing CSS. It’s a quiet chaos—one where you slowly untangle lines of properties until the page starts breathing right. Padding, margins, font-weight, transitions... they’re not just styles. They're intentions. They're boundaries and softnesses and declarations all at once.\n\nSometimes I think styling a webpage is a reflection of how I try to style my thoughts. A little margin here, some overflow hidden there. When things break, I don’t panic anymore—I inspect them. I test. I tweak. And suddenly, it’s not just code that’s healing. It’s me.\n\nMaybe CSS isn’t just Cascading Style Sheets.\n\nMaybe it’s Calming Self Scripts.",

    date:`June 2, 2025`,
})

blogs.push({
    title:"The Art of Googling: Why Knowing What to Ask is Half the Battle",

    author:"Pooja Satheesh",
    content:"No, I don’t know everything. But I’ve learned how to ask.\n\nGoogling as a developer isn’t cheating—it’s surviving. It’s recognizing that the web is a living library, and the right question can open a thousand doors. The key? Knowing the shape of your confusion.\n\nI used to think real coders had all the answers. Now I know: real coders just ask better questions. They refine their queries. They scroll past the first five StackOverflow links. They read the docs (well... sometimes).\n\nIf you've ever googled 'CSS hover not working even though it should', congrats—you’re one of us.\n\nBeing a dev isn’t about memorizing everything. It’s about knowing how to search when you’re lost—and how to debug both your code and your doubt.",    
    date:`May 29, 2025`,
})


blogs.push({
    title: "JavaScript and Emotional Damage: A Love Story",
    author: "Pooja Satheesh",
    content: "JavaScript is the friend who shows up late, forgets what you told them, and still somehow gets everything done.\n\nThere’s something hilarious and painful about `undefined` errors. They show up like existential questions you weren’t ready to answer. Why is this null? Who set it to null? Am *I* null?\n\nBut every time I `console.log()` my way out of a bug, I realize I’m learning to navigate chaos. JavaScript doesn't follow strict rules, and maybe that's why I relate to it. It's flexible, weirdly forgiving, and still manages to function (mostly).\n\nDebugging JS is like inner work: recursive, unpredictable, but deeply satisfying when it clicks.\n\nSometimes, I think writing JavaScript is just me trying to make sense of both my code and my coping mechanisms.",
    date: `May 20, 2025`,
});

