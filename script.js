const inputValue = document.getElementById("inputItem");
const divInput = document.getElementById("itemContainer");
let arrayList = [];
storageKey = "items"

let colorArrays = ["navy", 
"orange",
 "aquamarine", 
 "chocolate",
 "crimson", 
 "darkgoldenrod", 
 "mangenta",
 "hotpink", 
 "olive"];

 function pickRandomColor(){
    return Math.floor(Math.random() * colorArrays.length);
 }

 function checkIfItemInArray(value, array){
    for (let idx =0;idx<array.length;idx++){
        if (value === array[idx]){
            return true;
        }
    }
    return false;
 }

 function renderItems (){
    divInput.innerHTML = null;
    for (let i =0;i<arrayList.length;i++){
        const divItems = document.createElement("div");
        let textColorIdx = pickRandomColor();
        divItems.classList.add("list-items");
        //add the text in the div and put the color of the text and some margin
        divItems.style.marginBottom = "20px"; 
        const text = document.createElement("p");
        text.innerHTML = arrayList[i];
        text.style.color = colorArrays[textColorIdx];
        text.style.display ="inline";
        text.style.marginRight = "20px";
        //add a button for delete which will be assigned to a remove function
        const button = document.createElement("button");
        button.textContent = "DELETE";
        button.style.backgroundColor ="red";
        button.style.fontWeight ="bold";
        button.style.color ="white";
        button.onclick = () =>removeItem(arrayList[i])
        divItems.appendChild(text);
        divItems.appendChild(button);
        divInput.appendChild(divItems);
    }
    
}

function saveItems(){
    const itemsString = JSON.stringify(arrayList);
    localStorage.setItem(storageKey, itemsString);
    console.log(localStorage.getItem(storageKey));
}

function loadItems() {
    const itemsReloaded = localStorage.getItem(storageKey);
    console.log(itemsReloaded);
    if (itemsReloaded){
        //we need to parse the array back
        arrayList = JSON.parse(itemsReloaded);
        console.log(arrayList);
        renderItems();
    }
}

function addItem(){
    if (inputValue.value === ""){
        alert("Please introduce an item");
        return;
    }
    //first we need to appeal the inputValue.value, because if we do it in the push method, \
    //it will first execute the push
    item = inputValue.value
    isDuplicat = checkIfItemInArray(item,arrayList)
    if (isDuplicat) {
        alert("Item already in list")
        return;
    }
    arrayList.push(item);
    renderItems();
    inputValue.value ="";
    //we need to save item every time we do an add
    saveItems();
}

function removeItem(item) {
    const indexToRemove = arrayList.indexOf(item);
    arrayList.splice(indexToRemove, 1);
    renderItems();
    //we need to save item every time we do an remove
    saveItems();
}


//domContentLoaded is the function and not DomContentLoad
document.addEventListener('DOMContentLoaded', loadItems);

