import axios from 'axios';

const url = 'http://localhost:5001/api/posts';
const url1 = 'http://localhost:5001/api/getUserPosts/';

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

    static getUserPosts(myusername){
        return new Promise(async (resolve, reject) => {
            console.log(myusername)
            const response = await fetch("http://localhost:5001/api/posts/getUserPosts/", {
                method: "POST",
                headers: { "Content-Type": "application/json",},
                body: JSON.stringify({
                    username: myusername
                }),
            });
            const { userPosts } = await response.json();
            // console.log(userPosts);
            switch (response.status) {
                case 200:
                  console.log(userPosts);
                  console.log(typeof(userPosts));
                  
                  var result1 = [];
                  var count = 1;
                  for(var i in userPosts){
                    console.log(String(('post_').concat(count)));
                    result1.push((userPosts[String(('post_').concat(count))])['text']);
                    count ++;
                  }
                  console.log(result1)

                  var result = [];
                  for(var i in userPosts)
                      result.push([i, userPosts [i]]);
                  //let myMap = new Map(Object.entries(userPosts));
                  
                  resolve(result1);
            }
        });
    }

    //Create Post
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }

    //Delete Post
    static deletePost(id){
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;