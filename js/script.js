// Validation
function clickSend(event) {
  event.preventDefault();
  const button = document.getElementById("send");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const interest = document.getElementById("interest");

  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (
    valueInputName(name).length > 2 ||
    !name.value ||
    !email.value ||
    !email.value.match(mailformat) ||
    interest.value == "select"
  ) {
    if (valueInputName(name).length > 2) {
      name.parentElement.setAttribute(
        "data-text",
        "*Nama tidak boleh lebih dari 2 kata"
      );
      name.parentElement.style.setProperty("--opacity", 100);
    }
    if (!name.value) {
      name.parentElement.setAttribute("data-text", "*Nama tidak boleh kosong");
      name.parentElement.style.setProperty("--opacity", 100);
    }
    if (!email.value) {
      email.parentElement.style.setProperty("--opacity", 100);
    } else if (!email.value.match(mailformat)) {
      email.parentElement.setAttribute(
        "data-text",
        "*Masukkan email yang valid"
      );
      email.parentElement.style.setProperty("--opacity", 100);
    }
    if (interest.value == "select")
      interest.parentElement.style.setProperty("--opacity", 100);
  } else {
    sendContact(button).then((res) => {
      button.innerHTML = res;
      button.style.cursor = "default";
      setTimeout(() => {
        name.value = "";
        email.value = "";
        interest.value = "select";
        button.innerHTML = "SEND";
        button.style.cursor = "pointer";
        button.removeAttribute("disabled");
      }, 1000);
    });
  }
}

function valueInputName(name) {
  let arrName = name.value.split(" ").filter((item) => item);
  return arrName;
}

function sendContact(button) {
  let result;
  return new Promise((resolve, reject) => {
    button.innerHTML = "SENDING";
    button.style.cursor = "wait";
    button.setAttribute("disabled", true);
    setTimeout(() => {
      resolve((result = "SUCCESS"));
    }, 1000);
  });
}

function removeValidation(event) {
  if (event.target.value || valueInputName(event.target).length <= 2) {
    event.target.parentElement.style.setProperty("--opacity", 0);
  }
  if (
    event.target.attributes.id.value == "email" &&
    event.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
  ) {
    event.target.parentElement.style.setProperty("--opacity", 0);
  }
}

let i = 0;
let myTimer;
function autoSlide() {
  const review = Array.from(document.getElementsByClassName("review-item"));
  const circle = Array.from(document.getElementsByClassName("circle"));

  slide(review, circle);

  i = i + 1;
  if (i > review.length - 1) {
    i = 0;
  }
  myTimer = setTimeout(autoSlide, 3000);
}
autoSlide();

function slide(review, circle) {
  review.forEach((item) => {
    item.style.transform = `translateX(calc(-${i * 100}%))`;
  });
  circle.forEach((item) => {
    item.classList.remove("select");
  });
  circle[i].classList.add("select");
}

function selectReview(circle) {
  clearTimeout(myTimer);
  i = parseInt(circle.getAttribute("data-index"));
  autoSlide();
}
