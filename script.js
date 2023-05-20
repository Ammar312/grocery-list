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
    element.classList.add("groceryItem");
    element.innerHTML = `<p class="title">${textInputValue}</p>
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
    displayAlert("item is added", "green");
    // container.classList.add("showGroceryContainer");
    // addToLocalStorage(id, value);
    setBackToDefault();
  } else if (textInputValue !== "" && editFlag === true) {
    editElement.innerHTML = textInputValue;
    displayAlert("Value Changed", "green");
    // editLocalStorage(editId, value);
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
  // removeFromLocalStorage(iD);
};
const clearItemsFunc = () => {};

/* -----Event Listeners-----*/
form.addEventListener("submit", addItem);
clearItems.addEventListener("click", clearItemsFunc);
