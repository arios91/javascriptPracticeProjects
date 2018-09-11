class GitHub{
    constructor(){
        this.clientId = '0f5b3e404d42d9b4fee9';
        this.clientSecret = '1b0d063b10e2d5ded72d1f96d4db6b348a1dfe97';
        this.repoCount = 5;
        this.repoSort = 'created: asc';
    }

    //get user
    async getUser(user){
        const profileResponse = await
        fetch(`http://api.github.com/users/${user}?client_id=${this.clientId}&client_secret=${this.clientSecret}`);
        const repoResponse = await
        fetch(`http://api.github.com/users/${user}/repos?per_page=${this.repoCount}&sort=${this.repoSort}&client_id=${this.clientId}&client_secret=${this.clientSecret}`);

        const profile = await profileResponse.json();
        const repos = await repoResponse.json();

        return {
            profile: profile,
            repos : repos
        };
    }
}