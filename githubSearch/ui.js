class UI{
    constructor() {
        this.profile = document.querySelector('.profile');
    }

    //populate profile div
    showProfile(user){
        this.clearAlert();
        this.profile.innerHTML = `
        <div class="card card-body mb-3">
            <div class="row">
                <div class="col-md-3">
                    <img src="${user.avatar_url}" alt="profile image" class="img-fluid mb-2">
                    <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                </div>
                <div class="col-md-9">
                    <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                    <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                    <span class="badge badge-success">Followers: ${user.followers}</span>
                    <span class="badge badge-info">Following: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/Blog: ${user.blog}</li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member Since: ${user.created_at}</li>
                    </ul>
                </div>
            </div>
        </div>
        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div class="repos"></div>
        `;
        console.log(user);
    }

    //clear profile div
    clearProfile(){
        this.profile.innerHTML = '';
    }

    //show repos
    showRepos(repos){
        let output = '';
        repos.forEach(repo => {
            output += `
            <div class="card card-body mb-2">
                <div class="row">
                    <div class="col-md-6">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </div>
                    <div class="col-md-6">
                        <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                        <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                        <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                    </div>
                </div>
            </div>`;
        })
        //output repos
        const reposDiv = document.querySelector('.repos');
        if(reposDiv){
            reposDiv.innerHTML = output;
        }

    }

    //show alert message
    showAlert(msg, classNames){
        //clear any current alerts
        this.clearAlert();

        //create alert div
        const div = document.createElement('div');
        div.className = classNames;
        //add text
        div.appendChild(document.createTextNode(msg));

        //get parent
        const container = document.querySelector('.search-container');
        //get searchBox
        const searchBox = document.querySelector('.search');
        //insert alert
        container.insertBefore(div, searchBox);

        //timeout after 2 seconds
        setTimeout(() => this.clearAlert(), 2000);
    }

    //clear alert message
    clearAlert(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }
}