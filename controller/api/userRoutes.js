const router = require("express").Router();
const {User} = require('../../models')

router.post('/', async (req, res)=>{
    try{
        const userData = await User.create(req.body);
        console.log(userData)
        req.session.save(()=> {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch(error) {
        res.status(400).json(error);
    }
});

router.post('/login', async (req, res)=>{

    try {
        // console.log("test");
        const userData = await User.findOne({
            where: {username: req.body.username},
        });
        console.log(userData)
        if(!userData){
            res.status(400).json({message:"user doesn't exist"});
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res.status(400).json({message: "incorrect password, please try again"});
        return;
        }
        req.session.save(() => {
            req.session.user_id=userData.id;
            req.session.logged_in = true;
            res.json({name: req.body.username, message: "login successful"})
        })
    } catch(error){
        res.status(400).json(error)
    }
});

router.post('/logout', (req, res)=> {
    // console.log(req.session.logged_in);
    if(req.session.logged_in){
        req.session.destroy(()=> {
            res.status(204).end();
        });

    } else {
        res.status(404).end();
    }
});


module.exports = router;

// To post to the register route
router.post("/auth/register", async (req, res) => {    
    const { name, email, password, password_confirm } = req.body;
  
    try {
      const user = await User.findOne({
        where: { email: email }
      });
  
      if (user) {
        return res.render('register', {
          message: 'This account already has a user!'
        });
      }
  
      if (password !== password_confirm) {
        return res.render('register', {
          message: 'Passwords do not match!'
        });
      }
  
      // Create the new user
      const newUser = await User.create({
        name: name,
        email: email,
        password: password
      });
  
      // Redirect to a success page
      res.status(200).json({ message: 'Registration successful!' });
      
    } catch (error) {
      console.error(error);
      res.render('error', {
        message: 'An error occurred during registration.'
      });
    }
  });