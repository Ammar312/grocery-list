const form = document.querySelector(".form");
const alertBox = document.querySelector(".alert");
const textInput = document.querySelector("#textInput");
const submitBtn = document.querySelector("#submitBtn");
const groceryContainer = document.querySelector(".groceryContainer");
const groceryList = document.querySelector(".groceryList");
const clearItems = document.querySelector(".clearItems");
let editFlag = false;
let editId = "";
let editElement;
// ******Functions******
const addItem = (e) => {
  e.preventDefault();
  const textInputValue = textInput.value;
  const id = new Date().getTime().toString();

  if (textInputValue !== "" && editFlag === false) {
    const element = document.createElement("article");
    const attr = document.createAttribute("dataId");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("groceryItems");
    element.innerHTML = `<p class="title">${textInputValue}</p>
    <div class="btn-container">
      <!-- edit btn -->
      <button type="button" class="editBtn" title="Edit item">
      <i class="bi bi-pencil-square editIcon"></i>
      </button>
      <!-- delete btn -->
      <button type="button" class="deleteBtn" title="Delete item">
      <i class="bi bi-trash deleteIcon"></i>
      </button>
    </div>`;
    const editBtn = element.querySelector(".editBtn");
    editBtn.addEventListener("click", editItem);
    const deleteBtn = element.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", deleteItem);
    groceryList.appendChild(element);
    displayAlert("item is added", "green");
    // container.classList.add("showGroceryContainer");
    addToLocalStorage(id, textInputValue);
    setBackToDefault();
  } else if (textInputValue !== "" && editFlag === true) {
    editElement.innerHTML = textInputValue;
    displayAlert("Value Changed", "green");
    editLocalStorage(editId, textInputValue);
    setBackToDefault();
  } else {
    displayAlert("Please enter a item first", "red");
  }
};
const displayAlert = (txt, clss) => {
  alertBox.textContent = txt;
  alertBox.classList.add(`alert${clss}`);
  // remove alert
  setTimeout(() => {
    alertBox.textContent = "";
    alertBox.classList.remove(`alert${clss}`);
  }, 1000);
};
const setBackToDefault = () => {
  textInput.value = "";
  editFlag = false;
  editId = "";
  submitBtn.value = "Submit";
};

const editItem = (e) => {
  const ele1 = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  textInput.value = editElement.innerHTML;
  editFlag = true;
  editId = ele1.dataset.id;
  submitBtn.value = "Edit";
};
const deleteItem = (e) => {
  const ele2 = e.currentTarget.parentElement.parentElement;
  const iD = ele2.dataset.id;
  groceryList.removeChild(ele2);
  if (groceryList.children.length === 0) {
    groceryContainer.classList.remove("showGroceryContainer");
  }
  displayAlert("Item removed", "red");
  setBackToDefault();
  removeFromLocalStorage(iD);
};
const clearItemsFunc = () => {
  const items = document.querySelectorAll(".groceryItems");
  if (items.length > 0) {
    items.forEach((item) => {
      groceryList.removeChild(item);
    });
  }
  groceryContainer.classList.remove("showGroceryContainer");
  setBackToDefault();
  displayAlert("List is empty now", "green");
  console.log("items are removed");
  localStorage.removeItem("groceryList");
};
// -----Local Storage-----
const addToLocalStorage = (id, value) => {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("groceryList", JSON.stringify(items));
};
const getLocalStorage = () => {
  return localStorage.getItem("groceryList")
    ? JSON.parse(localStorage.getItem("groceryList"))
    : [];
};

const editLocalStorage = (id, value) => {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("groceryList", JSON.stringify(items));
};
const removeFromLocalStorage = (id) => {
  let items = getLocalStorage();
  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("groceryList", JSON.stringify(items));
};

const setUpItems = () => {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItems(item.id, item.value);
    });
    groceryContainer.classList.add("showGroceryContainer");
  }
};
const createListItems = (id, value) => {
  const element = document.createElement("article");
  const attr = document.createAttribute("dataId");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("groceryItems");
  element.innerHTML = `<p class="title">${value}</p>
  <div class="btn-container">
    <!-- edit btn -->
    <button type="button" class="editBtn">
    <i class="bi bi-pencil-square"></i>
    </button>
    <!-- delete btn -->
    <button type="button" class="deleteBtn">
    <i class="bi bi-trash"></i>
    </button>
  </div>`;
  const editBtn = element.querySelector(".editBtn");
  editBtn.addEventListener("click", editItem);
  const deleteBtn = element.querySelector(".deleteBtn");
  deleteBtn.addEventListener("click", deleteItem);
  groceryList.appendChild(element);
};
/* -----Event Listeners-----*/
form.addEventListener("submit", addItem);
clearItems.addEventListener("click", clearItemsFunc);
window.addEventListener("DOMContentLoaded", setUpItems);
