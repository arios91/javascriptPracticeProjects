const http = new easyHTTP;
// Create data for post/put methods
const data = {
    title: 'Custom Post',
    body : 'this is a custom post'
};

////
//GET REQUEST
////
http.get('https://jsonplaceholder.typicode.com/posts', function(err, response){
    if(err){
        console.log(err);
    }else{
        console.log(response);
    }
});


////
//POST REQUEST
////
//post method
http.post('https://jsonplaceholder.typicode.com/posts', data, function(err, post){
    if(err){
        console.log(err);
    }else{
        console.log(post);
    }
});


////
//POST REQUEST
////
//put method
http.put('https://jsonplaceholder.typicode.com/posts/1', data, function(err, post){
    if(err){
        console.log(err);
    }else{
        console.log(post);
    }
});


////
//DELETE REQUEST
////
http.delete('https://jsonplaceholder.typicode.com/posts/1', function(err, response){
    if(err){
        console.log(err);
    }else{
        console.log(response);
    }
});