const express = require("express")
const app = express();
const cors= require("cors")
const users=require("./user")
const Job=require("./job")
const mongoose = require ("mongoose")
const multer = require("multer")

// ----------


require("dotenv").config();
require("./config")
app.use(express.json())


app.use(cors())





// --------OTHER BACKEND API-----------------------------


// ---------working sign in API-------------
// app.post("/register", async (req,resp)=>{
//     let data = new users (req.body)
//     let result = await data.save()
//     result = result.toObject();
//     delete result.password
//     resp.send(result)
// })

// ---------------sign with multer--------------

// Multer setup
const upload1 = multer({
  dest: "uploads/", // All files go to uploads/ with random names
});

// Register 
app.post("/register", upload1.fields([
  { name: "image", maxCount: 1 },
  { name: "resume", maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, email, password, bio, skills } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const imageURL = req.files?.image?.[0]?.path || "";
    const resumeURL = req.files?.resume?.[0]?.path || "";

    const newUser = new users({
      name,
      email,
      password,
      bio: bio || "",
      skills: skills || "",
      imageURL,
      resumeURL
    });

    const result = await newUser.save();
    const userResponse = result.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// --------user get----------
app.get('/user/:id', async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ----------user put/update api------------

app.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await users.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("PUT /user/:id error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
})

// ------------------------------------------

app.post ("/login", async (req, resp)=>{
    console.log(req.body)
    if(req.body.password && req.body.email)
    {
        let user = await users.findOne(req.body).select("-password");
        if (user) {
            resp.send(user)
        }
        else {
            resp.send({result:"No user found "})
        }   
    }
    else{
        resp.send({result:"No user foundo"})
        }
    })

// ------------------------------------for jobs -----------------------

// ✅ Define job-specific multer config
const jobStorage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  }
});

const jobUpload = multer({ storage: jobStorage }); // Renamed from "upload"


// ✅ Job creation with logo upload
// app.post("/api/jobs", jobUpload.single("logo"), async (req, res) => {
//   try {
//     const {
//       company,
//       country,
//       title,
//       description,
//       skills,
//       workmode,
//       salary,
//       experience
//     } = req.body;

//     const logoURL = req.file ? `/uploads/${req.file.filename}` : "";

//     const newJob = new Job({
//       company,
//       country,
//       title,
//       description,
//       skills: skills ? skills.split(",") : [],
//       logoURL,
//       workmode,
//       salary,
//       experience
//     });

//     const result = await newJob.save();
//     res.status(201).json(result);
//   } catch (err) {
//     console.error("Job creation error:", err);
//     res.status(500).json({ error: "Failed to create job" });
//   }
// });



app.post("/api/jobs", jobUpload.single("logo"), async (req, res) => {
  try {
    const {
      company,
      country,
      title,
      description,
      skills,
      workmode,
      salary,
      experience
    } = req.body;

    const logoURL = req.file ? `/uploads/${req.file.filename}` : "";

    const parsedSkills = Array.isArray(skills)
      ? skills
      : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : []);

    const newJob = new Job({
      company,
      country,
      title,
      description,
      skills: parsedSkills,
      logoURL,
      workmode,
      salary,
      experience
    });

    const result = await newJob.save();
    res.status(201).json(result);
  } catch (err) {
    console.error("Job creation error:", err);
    res.status(500).json({ error: "Failed to create job" });
  }
});


//----- get ALL JOBS--------------
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});


// ----------GET SINGLE JOB------------
app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Error fetching job" });
  }
});


// --------------UPDATE / PUT API----------
app.put("/api/jobs/:id", async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update job" });
  }
});


// ----------------DELETE API FOR API---------
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

























    // ----------product k yha s suru h ----------multer-----------------------



app.use("/uploads" , express.static('uploads'))

const Product = mongoose.model('product' , {
    tittle:String ,
    price:String,
delivery:String,
imageUrl:String
})

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: ( req, file, callback)=> callback(null , Date.now() + '-' + file.originalname),
})


const upload = multer ({storage});


app.post('/api/products', upload.single('image'), async (req, res) => {
    const { tittle, price , delivery } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const product1 = new Product({ tittle , delivery, price, imageUrl });
     const result = await product1.save();
    res.json(result);
  });
  

app.get('/api/get' , async(req , resp)=>{
    const products= await Product.find();
    resp.json(products)
} )


app.get('/getdetail/:id' , async(req , resp)=>{
    let data = await Product.findOne({_id:req.params.id})
    if(data){
        resp.send(data)
    }
    else{
        resp.send("no data found")
    }
})



app.get('/searchapi/:key' , async(req, resp)=>{
    let result = await Product.find({"$or" :[{"tittle":{$regex:req.params.key} }]
    })
    resp.send(result)

})


app.delete("/delete/:id", async(req , res)=>{
    let result = await Product.deleteOne({_id:req.params.id})
    res.send(result)
})


    app.listen(5000)