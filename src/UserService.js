import axios from 'axios';

const url = 'http://localhost:5001/api/users';

class PostService {
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
        return axios.post(url, {
            email
            //username,
            //password
        });
    }

    //Create Post
    static insertUser(text) {
        return axios.post(url, {
            text
        });
    }
}

export default PostService;