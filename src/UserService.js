import axios from 'axios';

const RegisterUserUrl = 'http://localhost:5001/api/users/RegisterUser';
const LoginUserUrl = 'http://localhost:5001/api/users/LoginUser';
const myLoginUrl = 'http://localhost:5001/api/users/LoginUrl';
const _login = 'http://localhost:5001/api/users/login';

const jwt = require("jsonwebtoken");

class UserService {
    //Get Posts
    static getPosts(){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post =>({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            } catch(err) {
                reject(err);
            }

        });
    }

    //Register New User
    static RegisterNewUser(email, username, password){
        const myreg = email+"#"+username+"#"+password;
        return axios.post(RegisterUserUrl, {
            myreg
        });
    }

    //Login User
    static LoginUser(username, password) {
        const mylogin = username+"#"+password;
        return axios.post(LoginUserUrl, {
            mylogin
        });
    }

    //Login User
    static LoginUrl(username, password) {
        //const mylogin = username+"#"+password;
        console.debug("UserService.LoginUrl: creo token")
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          console.log(token)
        return axios.post(myLoginUrl, {
            username,
            password,
            token 
        });
    }
}

export default UserService;