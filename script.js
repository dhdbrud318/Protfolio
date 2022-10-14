const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

const modal = document.querySelector(".modal");
const [modalCloseBtn, modalSiteBtn] = document.querySelectorAll(".modal__btn");
const modalOverlay = document.querySelector(".modal__overlay");

const projects = document.querySelectorAll(".project");

const title = document.querySelector(".modal__title");
const thumbnail = document.querySelector(".modal__thumbnail>img");
const tagContainer = document.querySelector(".modal__tag-row");

function Project(id, title, ...arg) {
  this.id = id;
  this.title = title;
  this.tags = arg;
}

Project.prototype.previewGifPath = function () {
  return `./work-project/${this.id}/preview.gif`;
};

Project.prototype.previewImgPath = function () {
  return `./work-project/${this.id}/preview.png`;
};

Project.prototype.sitePath = function (endpoint = "master") {
  return `https://dhdbrud318.github.io/${this.id}/`;
};

Project.prototype.gitPath = function (endpoint = "") {
  return `https://github.com/dhdbrud318/${this.id}${endpoint}.git`;
};

const data = [
  new Project("galleria", "Galleria", "HTML", "CSS", "Javascript", "JQuery"),
  new Project(
    "ip-address-tracker",
    "IP Address Tracker",
    "HTML",
    "CSS",
    "Javascript",
    "API"
  ),
  new Project("tic-tac-toe", "Tic Tac Toe", "HTML", "CSS", "Javascript"),
  new Project(
    "ant",
    "Kneron Auto Notify aligating (ANT)",
    "React",
    "MongoDB",
    "Javascript"
  ),
  new Project("youtube-clone", "Youtube Clone", "HTML", "CSS"),
];

navToggle.addEventListener("click", () => {
  const visibility = nav.getAttribute("data-visible");
  console.log(visibility);

  if (visibility === "false") {
    nav.setAttribute("data-visible", true);
  } else {
    nav.setAttribute("data-visible", false);
  }
});

modalCloseBtn.addEventListener("click", () => {
  modal.setAttribute("data-visible", false);
  let childTag = tagContainer.lastElementChild;
  while (childTag) {
    tagContainer.removeChild(childTag);
    childTag = tagContainer.lastElementChild;
  }
  modalOverlay.classList.toggle("active");
});

projects.forEach((p, index) => {
  p.addEventListener("mouseenter", () => {
    frames[index].start();
  });

  p.addEventListener("mouseleave", () => {
    frames[index].stop();
  });
});

projects.forEach((p) => {
  p.addEventListener("click", () => {
    modalOverlay.classList.toggle("active");
    modal.setAttribute("data-visible", true);
    displayModal(data[parseInt(p.dataset.indexNumber)]);
    frames.forEach((f) => f.stop());
  });
});

function displayModal(project) {
  title.innerText = project.title;
  thumbnail.setAttribute("src", project.previewGifPath());
  project.tags.forEach((tag) => {
    generateTag(tag);
  });
  modalSiteBtn.setAttribute("href", project.sitePath());
}

function generateTag(title) {
  const tag = document.createElement("p");
  tag.innerText = title;
  tag.classList.add("tag", "bg-gray", "fs-300");
  tagContainer.appendChild(tag);
}
