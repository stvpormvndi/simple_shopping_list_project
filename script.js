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
}

itemForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const currentItem = document.querySelector("#item-input");
    const itemDiv = document.createElement("div");
    itemDiv.setAttribute("class", "item-container");
    const itemP = document.createElement("p");
    itemP.innerText = `${currentItem.value.charAt(0).toUpperCase() + currentItem.value.slice(1)}`.trim();
    currentItemsArray.push(currentItem.value.toLowerCase().trim());
    console.log(currentItemsArray);
    const itemIcon = document.createElement("i");
    itemIcon.setAttribute("class", "fa-solid fa-x");
    itemDiv.appendChild(itemP);
    itemDiv.appendChild(itemIcon);
    itemsListSection.appendChild(itemDiv);
    currentItem.value = "";
    toggleHiddenClass(document.getElementById("items-list"));
    let xButtons = document.querySelectorAll(".fa-x");
    xButtons.forEach((element) => {
        element.removeEventListener("click", deleteItem);
    });
    xButtons.forEach((element) => {
        /* element.addEventListener("click", function deleteItem(e) {
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
        }); */
        element.addEventListener("click", deleteItem);
    });
    const currentItems = document.querySelectorAll(".item-container");
    currentItems.forEach((element)=>{
        element.addEventListener("click", (e) => {
            e.stopPropagation();
            currentItem.value = e.currentTarget.firstChild.innerText;
        })
    })
})


// The clear everything functionality
clearButton.addEventListener("click", () => {
    itemsListSection.innerHTML = "";
    toggleHiddenClass(document.getElementById("items-list"));
    currentItemsArray = [];
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