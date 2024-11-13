const inputs = document.querySelectorAll("input");
const pinCode1 = document.querySelectorAll("#pin1 input");
const pinCode2 = document.querySelectorAll("#pin2 input");
const submitButton = document.querySelector(".btn");
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

    console.log("Current PIN:", pin1);

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
    console.log("Updated PIN after backspace:", pin1);
  });
});

pinCode2.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    if (input.value.length === 1 && index < pinCode2.length - 1) {
      pinCode2[index + 1].focus();
    } else {
      input.value = input.value.slice(0, 1);
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && input.value === "") {
      if (index > 0) {
        pinCode2[index - 1].focus();
      }
    }
  });

  // input.addEventListener();
});

function pinCodeChecking() {
  let pin1 = "";
  let pin2 = "";
  pinCode1.forEach((input) => (pin1 += input.value));
  pinCode2.forEach((input) => (pin2 += input.value));

  if (pin1 === "" || pin1.length < 6 || pin2 === "" || pin2.length < 6) {
    alert("Enter 6 digit pin codes...");
    return false;
  }

  if (pin1 !== pin2) {
    alert("Pin codes do not match");
    return false;
  }

  pincode = pin1;
  return true;
}

submitButton.addEventListener("click", async () => {
  try {
    if (pinCodeChecking()) {
      alert(`Your entered PINcode: ${pincode}`);
      const response = await fetch(`${api}${pincode}`);
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
