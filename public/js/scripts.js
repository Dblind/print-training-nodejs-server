const ul = document.body.querySelector("ul");
ul.addEventListener("click", toggle);

const params = document.body.querySelector("#params");
params.addEventListener("click", toggleHide);
ul.nextElementSibling.classList.toggle()
console.log(ul);

function toggle(event) {
  // if (event.target.matches("span")) event.target.nextElementSibling.hidden = !event.target.nextElementSibling.hidden;
  console.log(event.target.closest("[data-endpoint]"));
  const toggleTarget = event.target.closest("[data-endpoint]")
  if (toggleTarget) toggleTarget.nextElementSibling.hidden = !toggleTarget.nextElementSibling.hidden;
  // if (event.target.dataset.endpoint !== undefined) event.target.nextElementSibling.hidden = !event.target.nextElementSibling.hidden;
  console.log(toggleTarget.nextElementSibling);
}

function toggleHide(event) {
  // if (event.target.matches("span")) event.target.nextElementSibling.hidden = !event.target.nextElementSibling.hidden;
  console.log(event.target.closest("[data-endpoint]"));
  const toggleTarget = event.target.closest("[data-endpoint]")
  if (toggleTarget) toggleTarget.nextElementSibling.classList.toggle("hide");
  // if (event.target.dataset.endpoint !== undefined) event.target.nextElementSibling.hidden = !event.target.nextElementSibling.hidden;
  console.log(toggleTarget.nextElementSibling);
}