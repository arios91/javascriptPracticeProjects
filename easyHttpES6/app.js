const http = new EasyHTTP;
//user data
const user = {
    name: 'Alex Rios',
    email: 'alx.rios91@gmail.com',
    username: 'arios91'
};

//GET
// http.get('https://jsonplaceholder.typicode.com/users')
// .then(users => {
//     users.forEach(user => console.log(user));
// })
// .catch(err => console.log(err));

//POST
// http.post('https://jsonplaceholder.typicode.com/users', user)
// .then(data => console.log(data))
// .catch(err => console.log(err));

//PUT
// http.put('https://jsonplaceholder.typicode.com/users/1', user)
// .then(data => console.log(data))
// .catch(err => console.log(err));

//DELETE
http.delete('https://jsonplaceholder.typicode.com/users/1')
.then(response => console.log(response))
.catch(err => console.log(err));
