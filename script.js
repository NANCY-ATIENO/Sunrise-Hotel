
function validateBooking(event) {
  let valid = true;

  const showError = (id, msg) => {
    document.getElementById(id).textContent = msg;
    valid = false;
  };
  const clearError = (id) => {
    document.getElementById(id).textContent = "";
  };

  const name = document.querySelector('input[name="fullname"]').value.trim();
  if (!name) showError("errName", "Full name is required.");
  else clearError("errName");

  const email = document.querySelector('input[name="email"]').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) showError("errEmail", "Enter a valid email address.");
  else clearError("errEmail");

  const phone = document.querySelector('input[name="phone"]').value.trim();
  if (!/^\d{10}$/.test(phone)) showError("errPhone", "Phone must be exactly 10 digits.");
  else clearError("errPhone");

  const nights = parseInt(document.querySelector('input[name="nights"]').value);
  if (!nights || nights < 1 || nights > 14) showError("errNights", "Nights must be between 1 and 14.");
  else clearError("errNights");

  const guests = parseInt(document.querySelector('input[name="guests"]').value);
  if (!guests || guests <= 0) showError("errGuests", "Number of guests must be greater than zero.");
  else clearError("errGuests");

  const roomType = document.querySelector('select[name="room_type"]').value;
  if (!roomType) showError("errRoom", "Please select a room type.");
  else clearError("errRoom");

  if (!valid) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}


const roomCapacities = { single: 1, double: 2, family: 4 };

function checkRoomCapacity() {
  const roomSelect = document.querySelector('select[name="room_type"]');
  const guestsInput = document.querySelector('input[name="guests"]');
  const roomInfo = document.getElementById("roomInfo");
  const guestWarning = document.getElementById("guestWarning");

  const selected = roomSelect.value;
  const guests = parseInt(guestsInput.value);

  if (selected) {
    roomInfo.textContent = `Maximum guests allowed: ${roomCapacities[selected]}`;
    if (guests > roomCapacities[selected]) {
      guestWarning.textContent = "⚠️ Guests exceed room capacity!";
    } else {
      guestWarning.textContent = "";
    }
  } else {
    roomInfo.textContent = "";
    guestWarning.textContent = "";
  }
}

const roomRates = { single: 3500, double: 5000, family: 7500 };
const breakfastRate = 700;
const transferRate = 2000;
const conferenceRate = 5000; 

function calculateBill() {
  const nights = parseInt(document.querySelector('input[name="nights"]').value) || 0;
  const room = document.querySelector('select[name="room_type"]').value;
  const guests = parseInt(document.querySelector('input[name="guests"]').value) || 0;
  const breakfast = document.querySelector('input[name="breakfast"]:checked')?.value;
  const transfer = document.querySelector('input[name="transfer"]').checked;
  const conference = document.querySelector('input[name="conference"]').checked; // NEW
  const totalBox = document.getElementById("totalCost");

  let total = 0;
  if (room && nights > 0) total += roomRates[room] * nights;
  if (breakfast === "yes" && guests > 0 && nights > 0) {
    total += breakfastRate * guests * nights;
  }
  if (transfer) total += transferRate;
  if (conference) total += conferenceRate; 

  totalBox.textContent = `Estimated Total: KSh ${total.toLocaleString()}`;
}


function updateSummary() {
  const name = document.querySelector('input[name="fullname"]').value;
  const nights = document.querySelector('input[name="nights"]').value;
  const room = document.querySelector('select[name="room_type"]').value;
  const guests = document.querySelector('input[name="guests"]').value;
  const breakfast = document.querySelector('input[name="breakfast"]:checked')?.value || "Not selected";
  const transfer = document.querySelector('input[name="transfer"]').checked ? "Yes" : "No";
  const conference = document.querySelector('input[name="conference"]').checked ? "Yes" : "No"; // NEW
  const summaryBox = document.getElementById("summary");

  summaryBox.textContent =
    `Booking Summary:
    Name: ${name || "N/A"}
    Nights: ${nights || "N/A"}
    Room: ${room || "N/A"}
    Guests: ${guests || "N/A"}
    Breakfast: ${breakfast}
    Airport Transfer: ${transfer}
    Conference Room: ${conference}`;
}


document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const roomSelect = document.querySelector('select[name="room_type"]');
  const guestsInput = document.querySelector('input[name="guests"]');
  const nightsInput = document.querySelector('input[name="nights"]');
  const breakfastRadios = document.querySelectorAll('input[name="breakfast"]');
  const transferCheckbox = document.querySelector('input[name="transfer"]');
  const conferenceCheckbox = document.querySelector('input[name="conference"]'); // NEW

  
  form.addEventListener("submit", validateBooking);

  
  roomSelect.addEventListener("change", () => {
    checkRoomCapacity();
    updateSummary();
    calculateBill();
  });

  
  guestsInput.addEventListener("input", () => {
    checkRoomCapacity();
    updateSummary();
    calculateBill();
  });

  
  nightsInput.addEventListener("input", () => {
    updateSummary();
    calculateBill();
  });


  breakfastRadios.forEach(radio => radio.addEventListener("change", () => {
    updateSummary();
    calculateBill();
  }));

  
  transferCheckbox.addEventListener("change", () => {
    const transferOptions = document.getElementById("transferOptions");
    transferOptions.style.display = transferCheckbox.checked ? "block" : "none";
    updateSummary();
    calculateBill();
  });

  
  conferenceCheckbox.addEventListener("change", () => {
    updateSummary();
    calculateBill();
  });
});
