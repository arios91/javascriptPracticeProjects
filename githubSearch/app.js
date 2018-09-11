const searchUser = document.querySelector('#searchUser');
const gitHub = new GitHub;
const ui = new UI;

addEventListeners();

function addEventListeners(){
    searchUser.addEventListener('keyup', searchUserChange);
}

function searchUserChange(e){
    const searchText = e.target.value;
    if(searchText !== ''){
        //make http call to github
        gitHub.getUser(searchText)
        .then(data => {
            if(data.profile.message === 'Not Found'){
                //show alert
                ui.clearProfile();
                ui.showAlert('User Not Found', 'alert alert-danger');
            }else{
                //show profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        });
    }else{
        //clear profile
        ui.clearProfile();
    }
}