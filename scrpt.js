const inputs = document.querySelectorAll("input");
const pinCode1 = document.querySelectorAll("#pin1 input");
const pinCode2 = document.querySelectorAll("#pin2 input");
const submitButton = document.querySelector("#submit-button");
const submitButton2 = document.querySelector("#btn2");

const detail = document.getElementById("detail2");

const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");

let isBox1Visible = true;
let pincode = "";
let isMatched = false;

let pin1 = "";
let pin2 = "";

const api = "https://api.postalpincode.in/pincode/";

pinCode1.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    input.value = input.value.slice(0, 1);

    pin1 = Array.from(pinCode1)
      .map((input) => input.value)
      .join("");
    if (input.value.length === 1 && index < pinCode1.length - 1) {
      pinCode1[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      pinCode1[index - 1].focus();
    }

    pin1 = Array.from(pinCode1)
      .map((input) => input.value)
      .join("");
  });
});

// console.log(pinCode2);

pinCode2.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    input.value = input.value.slice(0, 1);

    pin2 = Array.from(pinCode2)
      .map((input) => input.value)
      .join("");
    if (input.value.length === 1 && index < pinCode2.length - 1) {
      pinCode2[index + 1].focus();
    }

    if (pin1 === pin2) {
      submitButton.style.backgroundColor = "#df1d1b";
      submitButton.style.cursor = "pointer";
      submitButton.disabled = false;
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "" && index > 0) {
      pinCode2[index - 1].focus();
    }

    pin2 = Array.from(pinCode2)
      .map((input) => input.value)
      .join("");
  });
});

submitButton.addEventListener("click", async () => {
  try {
    const response = await fetch(`${api}${pin1}`);
    const data = await response.json();

    if (data[0]) {
      box1.style.transform = "translateX(-100%)";
      box2.style.transform = "translateX(0)";

      if (data[0].Status == "Error") {
        detail.innerHTML = `
          <h2>It's an INVALID pin-code...</h2>
          <p>❌ Your pincode is not deliverable</p>
          `;
      } else {
        detail.innerHTML = `
          <h2>It's ${data[0].PostOffice[0].Name}</h2>
          <p>✅ Your pincode is deliverable</p>
          `;
      }

      isBox1Visible = !isBox1Visible;
    } else {
      box1.style.transform = "translateX(0)"; // Slide Box 1 in
      box2.style.transform = "translateX(100%)"; // Slide Box 2 out
    }
  } catch (error) {
    alert(error.message);
  }
});

submitButton2.addEventListener("click", (e) => {
  box1.style.transform = "translateX(0)";
  box2.style.transform = "translateX(100%)";
  inputs.forEach((input) => (input.value = ""));
  isBox1Visible = !isBox1Visible;
});
