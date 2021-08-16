const date = document.querySelector("#date");
const submit = document.querySelector("#submit");
const output = document.querySelector("#output");

function reverse(dob) {
  return dob.split("").reverse().join("");
}

function valid(dobOutput) {
  const reversedValue = reverse(dobOutput);

  if (reversedValue === dobOutput) {
    return true;
  }
  return false;
}

function submitHandler() {
  const dob = date.value;
  const dobOutput = dob.replaceAll("-", "");

  const isPalindrome = valid(dobOutput);

  if (isPalindrome) {
    output.innerText = "Yayy!! Your Birthday is a Palindrome";
  } else {
    output.innerText = "OOps!! Your Birthday is not a palindrome";
  }

  // const isPalindrome = check(dob)
}

submit.addEventListener("click", submitHandler);
