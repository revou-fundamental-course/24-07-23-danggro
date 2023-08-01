// Validation
function clickSend(event) {
  // Mencegah button untuk merefresh halaman
  event.preventDefault();

  //Define button send contact
  const button = document.getElementById("send");

  //Define input contact
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const interest = document.getElementById("interest");

  //Fromat valid email
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //Kondisi apabila input contact tidak valid
  if (
    valueInputName(name).length > 2 ||
    !name.value ||
    !email.value ||
    !email.value.match(mailformat) ||
    interest.value == "select"
  ) {
    //Kondisi input nama tidak boleh lebih dari 2 kata
    if (valueInputName(name).length > 2) {
      name.parentElement.setAttribute(
        "data-text",
        "*Nama tidak boleh lebih dari 2 kata"
      );
      name.parentElement.style.setProperty("--opacity", 100);
    }

    //Kondisi input nama tidak boleh kosong
    if (!name.value) {
      name.parentElement.setAttribute("data-text", "*Nama tidak boleh kosong");
      name.parentElement.style.setProperty("--opacity", 100);
    }

    //Kondisi input email tidak boleh kosong
    if (!email.value) {
      email.parentElement.style.setProperty("--opacity", 100);
      //   Kondisi input email harus valid
    } else if (!email.value.match(mailformat)) {
      email.parentElement.setAttribute(
        "data-text",
        "*Masukkan email yang valid"
      );
    }

    //Kondisi interest harus terpilih
    if (interest.value == "select")
      interest.parentElement.style.setProperty("--opacity", 100);
  } else {
    //Kondisi saat input contact valid
    sendContact(button).then((res) => {
      // Mengubah tulisan button menjadi SUCCSESS
      button.innerHTML = res;
      button.style.cursor = "default";
      setTimeout(() => {
        // Reset input menjadi kosong
        name.value = "";
        email.value = "";
        interest.value = "select";
        // Mengubah tulisan button menjadi SEND lagi
        button.innerHTML = "SEND";
        button.style.cursor = "pointer";
        button.removeAttribute("disabled");
      }, 1000);
    });
  }
}

//Fungsi untuk mengambil value input nama
function valueInputName(name) {
  let arrName = name.value.split(" ").filter((item) => item);
  return arrName;
}

// Fungsi sast button send diklik
function sendContact(button) {
  let result;
  return new Promise((resolve) => {
    // Mengubah tombol menjadi SENDING
    button.innerHTML = "SENDING";
    button.style.cursor = "wait";
    button.setAttribute("disabled", true);
    setTimeout(() => {
      resolve((result = "SUCCESS"));
    }, 1000);
  });
}

//Fungsi saat input sudah valid
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

// Fungsi auto slide review section
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

// Fungsi slide tiap item review
function slide(review, circle) {
  review.forEach((item) => {
    item.style.transform = `translateX(calc(-${i * 100}%))`;
  });
  circle.forEach((item) => {
    item.classList.remove("select");
  });
  circle[i].classList.add("select");
}

// Fungsi untuk memilih review
function selectReview(circle) {
  clearTimeout(myTimer);
  i = parseInt(circle.getAttribute("data-index"));
  autoSlide();
}

// Event listener untuk navigation saat halaman di scroll
document.addEventListener("scroll", () => {
  const nav = document.getElementById("navigation");
  if (window.scrollY > 0) {
    nav.style.paddingBlock = "0.6rem";
    nav.style.boxShadow = "0 0.05rem 1rem 0.1rem rgba(0,0,0,0.2)";
  } else {
    nav.style.paddingBlock = "1.5rem";
    nav.style.boxShadow = "0 0 0 0";
  }
});

// Fungsi untuk membuka navigasi pada tampilan mobile
function slideNav() {
  const navMobile = document.getElementById("nav-mobile");

  navMobile.style.transform = "translateX(0)";
}

// Fungsi untuk menutup navigasi pada tampilan mobile
function closeNav() {
  const navMobile = document.getElementById("nav-mobile");
  navMobile.style.transform = "translateX(100%)";
}
