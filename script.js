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

Project.prototype.sitePath = function (endpoint = "master") {
  return `https://dhdbrud318.github.io/${this.id}/`;
};

Project.prototype.gitPath = function (endpoint = "") {
  return `https://github.com/dhdbrud318/${this.id}${endpoint}.git`;
};

const data = [
  new Project("youtube-clone", "Youtube Clone", "HTML", "CSS"),
  new Project(
    "ant",
    "Kneron Auto Notify aligating (ANT)",
    "React",
    "MongoDB",
    "Javascript"
  ),
  new Project("tic-tac-toe", "Tic Tac Toe", "HTML", "CSS", "Javascript"),
  new Project(
    "ip-address-tracker",
    "IP Address Tracker",
    "HTML",
    "CSS",
    "Javascript",
    "API"
  ),
  new Project(
    "galleria-slideshow-site",
    "Galleria",
    "HTML",
    "CSS",
    "Javascript",
    "JQuery"
  ),

  new Project(
    "ecommerce-product-page-main",
    "Sneakers Ecommerce Product Page",
    "HTML",
    "CSS",
    "Javascript",
    "JQuery"
  ),
  new Project(
    "tip-calculator-app-main",
    "Tip Calculator",
    "HTML",
    "CSS",
    "Javascript"
  ),
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

modalOverlay.addEventListener("click", () => {
  modal.setAttribute("data-visible", false);
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
    const index = parseInt(p.dataset.indexNumber);
    modalOverlay.classList.toggle("active");
    modal.setAttribute("data-visible", true);
    displayModal(data[index], index === 1);
    frames.forEach((f) => f.stop());
  });
});

function displayModal(project, ant) {
  title.innerText = project.title;
  thumbnail.setAttribute("src", project.previewGifPath());
  project.tags.forEach((tag) => {
    generateTag(tag);
  });
  if (ant) {
    modalSiteBtn.setAttribute("target", "_self");
    modalSiteBtn.setAttribute("href", "./work-project/ant/ant.html");
  } else {
    modalSiteBtn.setAttribute("target", "_blank");
    modalSiteBtn.setAttribute("href", project.sitePath());
  }
}

function generateTag(title) {
  const tag = document.createElement("p");
  tag.innerText = title;
  tag.classList.add("tag", "bg-gray", "fs-300");
  tagContainer.appendChild(tag);
}
