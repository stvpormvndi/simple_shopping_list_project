const itemForm = document.getElementById("item-form");
const clearButton = document.getElementById("clear-all-button");
const itemsListSection = document.getElementById("items-list");
const itemFilterForm = document.getElementById("items-filter");
let currentItemsArray = [];

// The function I use to hide the item list
function toggleHiddenClass(element) {
    if (element.children.length > 0) {
        document.querySelector("main").classList.remove("hidden");
    };
    if (element.children.length === 0) {
        document.querySelector("main").classList.add("hidden");
    }
}

function deleteItem(e) {
    e.stopPropagation();
    let itemToRemoveFromStorage = e.currentTarget.previousElementSibling.innerText.toLowerCase().trim();
    let indexOfItemToRemove = currentItemsArray.indexOf(itemToRemoveFromStorage);
    console.log(itemToRemoveFromStorage);
    console.log(indexOfItemToRemove);
    currentItemsArray.splice(indexOfItemToRemove, 1);
    console.log(currentItemsArray);
    e.currentTarget.removeEventListener("click", deleteItem);
    e.currentTarget.parentElement.remove();
    toggleHiddenClass(document.getElementById("items-list"));
    updateLocalStorage();
    document.querySelector("#item-input").value = "";
}

function updateLocalStorage() {
    localStorage.clear();
    localStorage.setItem("storedItems", JSON.stringify(currentItemsArray));
}

// The function that creates the items
function createItem(item) {
    /* const currentItem = document.querySelector("#item-input"); */
    const itemDiv = document.createElement("div");
    itemDiv.setAttribute("class", "item-container");
    const itemP = document.createElement("p");
    itemP.innerText = `${item.charAt(0).toUpperCase() + item.slice(1)}`.trim();
    currentItemsArray.push(item.toLowerCase().trim());
    console.log(currentItemsArray);
    const itemIcon = document.createElement("i");
    itemIcon.setAttribute("class", "fa-solid fa-x");
    itemDiv.appendChild(itemP);
    itemDiv.appendChild(itemIcon);
    itemsListSection.appendChild(itemDiv);
    document.querySelector("#item-input").value = "";
    toggleHiddenClass(document.getElementById("items-list"));
    itemIcon.addEventListener("click", deleteItem);
    itemDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelector("#item-input").value = e.currentTarget.firstChild.innerText;
    })
}

window.addEventListener("DOMContentLoaded", () => {
    const persistingItems = JSON.parse(localStorage.getItem("storedItems"));
    persistingItems.forEach((item) => {
        createItem(item);
    });
})

itemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!currentItemsArray.includes(document.querySelector("#item-input").value.toLowerCase())) {
        createItem(document.querySelector("#item-input").value);
    } else {
        document.querySelector("#item-input").value = "";
    }
    updateLocalStorage();
})


// The clear everything functionality
clearButton.addEventListener("click", () => {
    itemsListSection.innerHTML = "";
    toggleHiddenClass(document.getElementById("items-list"));
    currentItemsArray = [];
    updateLocalStorage();
    document.querySelector("#item-input").value = "";
})

// The filter form
itemFilterForm.addEventListener("input", (e) => {
    if (itemsListSection.children.length > 0) {
        document.querySelectorAll(".item-container").forEach((element) => {
            if (!element.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                element.style.display = "none";
            } else {
                element.style.display = "flex";
            }
        })
    }
})