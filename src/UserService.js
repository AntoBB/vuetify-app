import axios from 'axios';

const RegisterUserUrl = 'http://localhost:5001/api/users/RegisterUser';
const LoginUserUrl = 'http://localhost:5001/api/users/LoginUser';

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
}

export default UserService;