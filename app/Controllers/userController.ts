const bcrypt = require("bcrypt");
const datab = require("../Models");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const nodemailer = require("nodemailer");

// Assigning users to the variable Usertable
const UserTable = datab.user;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req:any, res:any) => {
 try {
   const { firstName, lastName,profilePicture, userType, companyName, shopInfo, email, phoneNumber, password } = req.body;
   const data = {
      firstName,
      lastName,
      profilePicture,
      userType,
      companyName,
      shopInfo,
      email,
      phoneNumber,
     password: await bcrypt.hash(password, 10),
   };
   //saving the user
   const user = await UserTable.create(data);

   //if user details is captured
   //generate token with the user's id and the secretKey in the env file
   // set cookie with the token generated
   if (user) {
     let token = jwt.sign({ id: user.id }, process.env.secretKey, {
       expiresIn: 1 * 24 * 60 * 60 * 1000,
     });

     res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
     console.log("user", JSON.stringify(user, null, 2));
     console.log(token);
     //send users details
     return res.status(201).send(user);
   } else {
     return res.status(409).send("Details are not correct");
   }
 } catch (error) {
   console.log(error);
 }
};

//login authentication

const login = async (req:any, res:any) => {
 try {
const { email, password } = req.body;

   //find a user by their email
   const user = await UserTable.findOne({
     where: {
     email: email
   } 
     
   });

   //if user email is found, compare password with bcrypt
   if (user) {
     const isSame = await bcrypt.compare(password, user.password);

     //if password is the same
      //generate token with the user's id and the secretKey in the env file

     if (isSame) {
       let token = jwt.sign({ id: user.id }, process.env.secretKey, {
         expiresIn: 1 * 24 * 60 * 60 * 1000,
       });

       //if password matches wit the one in the database
       //go ahead and generate a cookie for the user
       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
       console.log("user", JSON.stringify(user, null, 2));
       console.log(token);
       //send user data
       return res.status(201).send(
          {
            status: "User login successfully",
          },
       );

     } else {
       return res.status(401).send("Authentication failed");
     }
   } else {
     return res.status(401).send("Authentication failed");
   }
 } catch (error) {
   console.log(error);
 }
};

const update = async (req : any, res: any) => {
  try {
    const result = await UserTable.update({ ...req.body, updateAt: Date.now()},
     {
      where: {
        id: req.params.id
      }
     });
      if (result[0] === 0) {
        return res.status(404).json(
          {
            status: "fail",
            message: "User not found"
          }
        )
      }

      const user = await UserTable.findByPk(req.params.id);

      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });

  } catch (error: any) {
    res.status(200).json({
      status: "error",
      message: error.message,
    });
  }
  }

  const forgotPassword = async (req: any, res: any) => {
    const { email } = req.body;
  
    try {
      const user = await UserTable.findOne({
        where: {
        email: email
         }  
      });
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const resetToken = uuidv4(); // Generate a unique reset token
      const resetTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // Set the token expiration time (e.g., 24 hours)
  
      // Store the reset token and its expiration date in the user table
      user.resetToken = resetToken;
      user.resetTokenExpiry = resetTokenExpiry;
      await user.save();
  
      // Send the password reset email to the user
      const transporter = nodemailer.createTransport({
        // Configure the email transport
        // Example configuration for Gmail:
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "verona64@ethereal.email",
          pass: "uzYApjSVJM7EF9RExn",
        },
      });
  
      const mailOptions = {
        from: "manfulmweze99@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `Click the following link to reset your password: http://localhost:3000/api/users/reset-password/${resetToken}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.status(200).send("Password reset email sent, \n Reset token: " + resetToken);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error forgetPassword");
    }
  };

  const resetPassword = async (req: any, res: any) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const user = await UserTable.findOne({ where: { resetToken: token } });
  
      if (!user) {
        return res.status(404).send("Invalid or expired token");
      }
  
      // Check if the token has expired
      if (user.resetTokenExpiry < Date.now()) {
        return res.status(400).send("Token expired");
      }
  
      // Update the user's password and clear the reset token
      user.password = await bcrypt.hash(password, 10);
      user.resetToken = null;
      user.resetTokenExpiry = null;
      await user.save();
  
      return res.status(200).send("Password reset successful");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  };
  
module.exports = {
 signup,
 login,
 update,
 forgotPassword,
 resetPassword,
};