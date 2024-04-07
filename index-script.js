const jobPost = [
  "Web developer",
  "Front-end developer",
  "React developer",
  "Angular developer",
];
const displayContent = document.getElementById("jobDisplay");
let wordIndex = 0;
let timeoutId;

function displayWordByWord() {
  const word = jobPost[wordIndex];
  let letterIndex = 0;

  // Display word letter by letter from left to right
  timeoutId = setInterval(() => {
    if (letterIndex <= word.length) {
      displayContent.textContent = word.substring(0, letterIndex);
      letterIndex++;
    } else {
      // Word fully displayed, start reducing it letter by letter from right to left
      clearInterval(timeoutId);
      reduceWord(word);
    }
  }, 100);
}

function reduceWord(word) {
  let letterIndex = word.length;

  // Reduce word letter by letter from right to left
  timeoutId = setInterval(() => {
    if (letterIndex >= 0) {
      displayContent.textContent = word.substring(0, letterIndex);
      letterIndex--;
    } else {
      // Word fully reduced, move to the next word
      clearInterval(timeoutId);
      wordIndex = (wordIndex + 1) % jobPost.length;
      displayWordByWord();
    }
  }, 100);
}

// Start displaying words
displayWordByWord();

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// const jobPost = [
//   "Web developer",
//   "front-end developer",
//   "React developer",
//   "Angular developer",
// ];
// const displayContent = document.getElementById("jobDisplay");
// let wordIndex = 0;
// let letterIndex = 0;
// let timeoutId;
// function displayWordByWord() {
//   const word = jobPost[wordIndex];
//   if (timeoutId) {
//     clearTimeout(timeoutId);
//   }
//   if (letterIndex <= word.length) {
//     if (letterIndex === 0) {
//       displayContent.textContent = word.substring(0, letterIndex + 1);
//     } else {
//       displayContent.textContent = word.substring(0, letterIndex);
//     }
//     letterIndex++;
//     timeoutId = setTimeout(displayWordByWord, 100);
//   } else {
//     timeoutId = setTimeout(() => {
//       displayContent.textContent = "";
//       letterIndex = 0;
//       wordIndex = (wordIndex + 1) % jobPost.length;
//       displayWordByWord();
//     }, 1000);
//   }
// }

// displayWordByWord();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//pdf download concept

document.getElementById("downloadCV").addEventListener("click", function () {
  var pdfURL = "./Saran_React.pdf";
  var a = document.createElement("a");
  a.href = pdfURL;
  a.download = "Saran-React.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var animationTriggered = false;

// window.addEventListener("scroll", function () {
//   var imageContainer = document.querySelector(".image-container");
//   var containerPosition = document
//     .querySelector(".container")
//     .getBoundingClientRect();

//   if (
//     containerPosition.top < window.innerHeight &&
//     containerPosition.bottom >= 0
//   ) {
//     if (!animationTriggered) {
//       imageContainer.classList.add("animated");
//       animationTriggered = true;
//     } else {
//       imageContainer.classList.remove("animated");
//       animationTriggered = false;
//     }
//   }
// });

var animationTriggered = false; // Initialize animationTriggered flag
var threshold = 0.5; // Set threshold to 50% of container's height

window.addEventListener("scroll", function () {
  var imageContainer = document.querySelector(".image-container");
  var container = document.querySelector(".container");
  var containerHeight = container.clientHeight;
  var containerPosition = container.getBoundingClientRect();

  // Calculate the threshold position
  var thresholdPosition = containerPosition.top + containerHeight * threshold;

  // Check if the threshold position is within the viewport
  if (thresholdPosition < window.innerHeight && containerPosition.bottom >= 0) {
    // If container is in view and animation hasn't triggered yet
    if (!animationTriggered) {
      imageContainer.classList.add("animated");
      animationTriggered = true; // Set animationTriggered to true
    }
  } else {
    // If container is out of view
    imageContainer.classList.remove("animated");
    animationTriggered = false; // Reset animationTriggered to false
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////
const form = document.querySelector("form");
const fullName = document.getElementById("name-page6");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");
function sendEmail() {
  const bodyMessage = `Full Name : ${fullName.value}<br> 
  Email:${email.value}<br> 
  Phone Number:${phone.value}<br>
  Message:${message.value}`;
  Email.send({
    SecureToken: "f4dc7b60-dcb5-4f5c-a2ac-04e632f9d414",
    To: "saranrio21@gmail.com",
    From: "saranrio21@gmail.com",
    Subject: subject.value,
    Body: bodyMessage,
  }).then((message) => {
    if (message == "OK") {
      Swal.fire({
        title: "Success!",
        text: "Message send successfully!",
        icon: "success",
      });
    }
  });
}
function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }
    if (items[1].value != "") {
      checkEmail();
    }
    items[1].addEventListener("keyup", () => {
      checkEmail();
    });
    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}
function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTxtEmail = document.querySelector(".error-txt.email");
  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");
    if (email.value != "") {
      errorTxtEmail.innerHTML = "Enter a valid email address";
    } else {
      errorTxtEmail.innerHTML = "Email Address can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
  if (
    !fullName.classList.contains("error") &&
    !email.classList.contains("error") &&
    !phone.classList.contains("error") &&
    !message.classList.contains("error")
  ) {
    sendEmail();
    form.reset();
    return false;
  }
});
