"use strict";

//Buttons to handle stesp
const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
//We need specifically the last next button, because after click on it, we change the content of the header that appears on the last step
const finalStepBtn = document.querySelector("#btn-last-next");

//Everything about progress bar handling
//Handle the line
const progressDiv = document.querySelector("#progress");
//Handle the circles with the step number
const progressStepsDiv = document.querySelectorAll(".progress-step");
//We need specifically the last step circle, because we change the content on it form 4 to "✔"
const lastProgressStepDiv = document.querySelector("#step-4");

//All the forms, for each step
const forms = document.querySelectorAll(".form-step");

//The headers that appears above the forms
const primaryHeader = document.querySelector("#primary-header--id");
const secondaryHeader = document.querySelector("#secondary-header--id");

//All input fields, from every form
const inputFields = document.querySelectorAll(".input-field");

let formStepsNum = 0;

const updateFormSteps = function () {
  forms.forEach(function (formStep) {
    formStep.classList.contains("form-step-active") && formStep.classList.remove("form-step-active");
  });
  forms[formStepsNum].classList.add("form-step-active");
};

const updateProgressBar = function () {
  progressStepsDiv.forEach(function (progressStep, index) {
    if (index < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");
  progressDiv.style.width = ((progressActive.length - 1) / (progressStepsDiv.length - 1)) * 100 + "%";
};

//Init again forgot password pop-up after closing
const init = function () {
  //Steps and progress bar start from the begin
  formStepsNum = 0;
  updateFormSteps();
  updateProgressBar();
  //clear all inputs from previous insertions
  inputFields.forEach(function (field) {
    field.value = "";
  });
  //Init texts
  primaryHeader.textContent = "Retrieve your account";
  secondaryHeader.textContent = "Four simple steps and your account is back!";
  lastProgressStepDiv.textContent = "4";
  //Init color to progress bar by removing the added class
  progressDiv.classList.remove("completed");
  progressStepsDiv.forEach(function (progressStep) {
    progressStep.classList.remove("completed");
  });
};

nextBtns.forEach(function (btn) {
  btn.addEventListener("click", function (evt) {
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();
  });
});

prevBtns.forEach(function (btn) {
  btn.addEventListener("click", function (evt) {
    formStepsNum--;
    updateFormSteps();
    updateProgressBar();
  });
});

//Extra handler for the last next button
finalStepBtn.addEventListener("click", function (evt) {
  primaryHeader.textContent = "Account recovered successfully!";
  secondaryHeader.textContent = "";
  lastProgressStepDiv.textContent = "✔";
  //Make all progress bar look as completed (we add class completed that changes the bg color to green)
  progressDiv.classList.add("completed");
  progressStepsDiv.forEach(function (progressStep) {
    progressStep.classList.add("completed");
  });
});

//Make pop-up appear and disappear
const forgotPassPopUp = document.querySelector(".pop-up--window");
const overlay = document.querySelector(".overlay");

const closeBtn = document.querySelector(".close-btn");

const logoBtn = document.querySelector("#logo-header");

const openPopUp = function () {
  forgotPassPopUp.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closePopUp = function () {
  forgotPassPopUp.classList.add("hidden");
  overlay.classList.add("hidden");
  init();
};

//To open pop-up for testing
logoBtn.addEventListener("click", function (evt) {
  openPopUp();
});

//Handlers to close the pop-up window for the forgot password functionality
closeBtn.addEventListener("click", closePopUp);

overlay.addEventListener("click", closePopUp);

document.addEventListener(
  "keydown",
  function (evt) {
    if (evt.key === "Escape" && !forgotPassPopUp.classList.contains("hidden")) {
      closePopUp();
    }
  },
  false
);
