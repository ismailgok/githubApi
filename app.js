const githubForm = document.getElementById("github-form")
const nameInput = document.getElementById("githubname")
const clearLastUsers = document.getElementById("clear-last-users")
const lastUsers = document.getElementById("last-users")
const github = new Github()
const ui = new UI()
eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched)
    document.addEventListener("DOMContentLoaded", getAllSerched)
}

function getData(e) {

    let username = nameInput.value.trim()

    if (username === "") {
        alert("lütfen geçerli bir kullanıcı adı girin")
    } else {
        github.getGithubData(username)
            .then((response) => {
                if (response.user.message === "Not Found") {
                    ui.showError("Kullanıcı bulunamadı")
                } else {
                    ui.addSearchedUserToUI(username)
                    Storage.addSearchedUserToStorage(username)
                    ui.showUserInfo(response.user)
                    ui.showRepoInfo(response.repo)
                }
            }).catch((err) => ui.showError(err))
    }



    ui.clearInput(); // input temizleme
    e.preventDefault();
}

function clearAllSearched() {
    if (confirm("Emin misiniz?")) {
        // silme işlemi
        Storage.clearAllSearchedUsersFromStorage()
        ui.clearAllSearchedFromUI()
    }
}

function getAllSerched() {

    let users = Storage.getSearchedUsersFromStorage();

    let result = ""
    users.forEach(element => {
        result += `<li class="list-group-item">${element}</li>`


    });
    lastUsers.innerHTML = result
}