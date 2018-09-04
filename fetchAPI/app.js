//set ui components
const outputDiv = document.querySelector('#output');
//set event listeners
document.querySelector('#button1').addEventListener('click', getText);
document.querySelector('#button2').addEventListener('click', getJson);
document.querySelector('#button3').addEventListener('click', getApiData);

function getText(){
    fetch('test.txt')
    .then(res => {
        //since response.text() returns another promise w/ data
        //we need another .then() after this one
        return res.text();
    })
    .then(data => {
        outputDiv.innerHTML = data;
    })
    .catch(err => {
        //catch any errors
        //change text file name so see it in action
        console.log(err);
    })
};

function getJson(){
    fetch('posts.json')
    .then(res => {
        //since response.text() returns another promise w/ data
        //we need another .then() after this one
        return res.json();
    })
    .then(posts => {
        let output = '<ul>';
        posts.forEach(post => {
            output += `
                <li> ${post.title}</li>
                <li> ${post.body}</li>
            `;
        })
        output += '</ul>';
        outputDiv.innerHTML = output;
    })
    .catch(err => {
        //catch any errors
        //change text file name so see it in action
        console.log(err);
    })
};


function getApiData(){
    fetch('https://api.github.com/users')
    .then(res => {
        //since response.text() returns another promise w/ data
        //we need another .then() after this one
        return res.json();
    })
    .then(user => {
        let output = '<ul>';
        user.forEach(user => {
            output += `
                <li> ${user.login}</li>
                <li> <a href='${user.url}'>${user.url}</a></li>
            `;
        })
        output += '</ul>';
        outputDiv.innerHTML = output;
    })
    .catch(err => {
        //catch any errors
        //change text file name so see it in action
        console.log(err);
    })
    
};