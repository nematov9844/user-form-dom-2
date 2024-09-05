const root = document.querySelector(".root");
const inputs = document.querySelectorAll(".inputs");
const form = document.querySelector("#form");

let data = JSON.parse(localStorage.getItem("users")) || [];

document.addEventListener("DOMContentLoaded", () => {
  render();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = { id: Date.now() };
  for (const input of inputs) {
    obj[input.name] = input.value;
  }
  data = [obj, ...data];
  addLocal();
  render();
  inputs[0].value = "";
  inputs[1].value = "";
});

function render() {
  root.innerHTML = "";
  data.forEach((item) => {
    root.innerHTML += `
        <div class="flex justify-between w-full bg-gray-100 p-4 gap-4 rounded-md shadow-md">
          <div class="flex flex-col gap-2">
            <h1 class="text-xl font-semibold text-gray-800">${item.first}</h1>
            <h1 class="text-lg text-gray-600">${item.second}</h1>
          </div>
          <div class="action flex gap-2 items-center">
            <button data-id=${item.id} class="edit bg-green-500 text-white font-bold py-1 px-4 rounded-md hover:bg-green-600 transition duration-200">Edit</button>
            <button data-id=${item.id} class="delete bg-red-500 text-white font-bold py-1 px-4 rounded-md hover:bg-red-600 transition duration-200">Delete</button>
          </div>
        </div>
    `;
  });

  document.querySelectorAll(".edit").forEach((button) => {
    button.addEventListener("click", (e) => {
      let dataId = e.target.dataset.id;
      let findData = data.find((item) => item.id == dataId);
      inputs[0].value = findData.first;
      inputs[1].value = findData.second;

      form.onsubmit = function (event) {
        event.preventDefault();
        findData.first = inputs[0].value;
        findData.second = inputs[1].value;
        addLocal();
        render();
        form.onsubmit = null;
        inputs[0].value = "";
        inputs[1].value = "";
      };
    });
  });

  document.querySelectorAll(".delete").forEach((button) => {
    button.addEventListener("click", (e) => {
      let dataId = e.target.dataset.id;
      data = data.filter((item) => item.id != dataId);
      addLocal();
      render();
    });
  });
}

function addLocal() {
  localStorage.setItem("users", JSON.stringify(data));
}
