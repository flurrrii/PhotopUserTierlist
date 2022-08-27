const items = document.getElementById("items");
const tiers = document.getElementsByClassName("tier-items");
const addUserButton = document.getElementById("add-user");

for (let i = 0; i < tiers.length; i++) {
    let tier = tiers[i];
    tier.addEventListener("click", function (event) {
        if (!dragging) return;
        this.appendChild(dragging);
        dragging.className = "item";
        dragging.addEventListener("click", function () {
            items.appendChild(this)
        });
        dragging = false;
    });
}

let dragging = false;

function addUser(username) {
    fetch(`https://photop.exotek.co/user?name=${username}`)
        .then(response => response.json())
        .then(function (response) {
            let element = document.createElement("img");
            element.title = response.User;
            element.src = `https://photop-content.s3.amazonaws.com/ProfileImages/${response.Settings.ProfilePic}`;
            element.className = 'item'
            element.addEventListener("click", function (event) {
                dragging = this;
                dragging.className = 'item dragging'
                document.body.appendChild(dragging)
            });
            items.appendChild(element);
        })
}

document.addEventListener("mousemove", function (event) {
    if (!dragging) return;
    dragging.style.left = `${event.x + 1}px`
    dragging.style.top = `${event.y + 1}px`
})

items.addEventListener("mouseup", function (event) {
    if (!dragging) return;
    dragging.className = 'item';
    items.appendChild(dragging);
    dragging = false;
})

addUserButton.addEventListener("click", function () {
    addUser(prompt("Enter a Username ( case sensitive )"))
})