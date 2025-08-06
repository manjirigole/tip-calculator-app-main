document.addEventListener("DOMContentLoaded", () => {
  const billAmount = document.querySelector(".bill-amt");
  const peopleInput = document.querySelector(".people-input");
  let tipPercent = ["btn-5p", "btn-10p", "btn-15p", "btn-25p", "btn-50p"];
  const calculatedTipAmount = document.querySelector(".calc-tip-amt");
  const calculatedSplitAmount = document.querySelector(".calc-total-amt");
  const resetBtn = document.querySelector(".reset-btn");
  const errorMsg = document.querySelector(".error-msg");

  // Looping through tip btns and attaching event listeners
  tipPercent.forEach((tipBtns) => {
    const btn = document.querySelector(`.${tipBtns}`);
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        // Remove "selected" class from all buttons
        tipPercent.forEach((tip) => {
          const otherBtn = document.querySelector(`.${tip}`);
          if (otherBtn) {
            otherBtn.classList.remove("selected");
          }
        });

        // Add "selected" class only to the clicked button
        btn.classList.add("selected");
        console.log(`Button ${tipBtns} clicked`);

        // Extract the text from the btn
        const tipText = btn.textContent.trim(); // "5%"
        const tipValue = parseFloat(tipText.replace("%", "")); // 5

        // Convert input values to numbers
        const bill = parseFloat(billAmount.value);
        const people = parseInt(peopleInput.value);

        if (bill && people > 0) {
          const tipAmount = (bill * tipValue) / 100;
          const total = bill + tipAmount;
          const perPerson = total / people;

          calculatedTipAmount.textContent = `$ ${tipAmount.toFixed(2)}`;
          calculatedSplitAmount.textContent = `$ ${perPerson.toFixed(2)}`;
        } else {
          calculatedTipAmount.textContent = `$0.00`;
          calculatedSplitAmount.textContent = `$0.00`;
        }
      });
    }
  });

  resetBtn.addEventListener("click", () => {
    billAmount.value = "";
    peopleInput.value = "";
    calculatedTipAmount.textContent = `$0.00`;
    calculatedSplitAmount.textContent = `$0.00`;

    // Remove selected class from all buttons
    tipPercent.forEach((tip) => {
      const btn = document.querySelector(`.${tip}`);
      if (btn) {
        btn.classList.remove("selected");
      }
    });

    if (peopleInput.value.trim() === "") {
      errorMsg.style.display = "flex";
    }
  });
});
