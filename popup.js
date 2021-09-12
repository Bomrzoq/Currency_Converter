const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate()

const inputField = document.querySelector('.chosen-value');
const dropdown = document.querySelector('.value-list');
const dropdownArray = [... document.querySelectorAll('li')];
console.log(typeof dropdownArray)
dropdown.classList.add('open');
inputField.focus(); // Demo purposes only
let valueArray = [];
dropdownArray.forEach(item => {
  valueArray.push(item.textContent);
});

const closeDropdown = () => {
  dropdown.classList.remove('open');
}

inputField.addEventListener('input', () => {
  dropdown.classList.add('open');
  let inputValue = inputField.value.toLowerCase();
  let valueSubstring;
  if (inputValue.length > 0) {
    for (let j = 0; j < valueArray.length; j++) {
      if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
        dropdownArray[j].classList.add('closed');
      } else {
        dropdownArray[j].classList.remove('closed');
      }
    }
  } else {
    for (let i = 0; i < dropdownArray.length; i++) {
      dropdownArray[i].classList.remove('closed');
    }
  }
});

dropdownArray.forEach(item => {
  item.addEventListener('click', (evt) => {
    inputField.value = item.textContent;
    dropdownArray.forEach(dropdown => {
      dropdown.classList.add('closed');
    });
  });
})

inputField.addEventListener('focus', () => {
   inputField.placeholder = 'Type to filter';
   dropdown.classList.add('open');
   dropdownArray.forEach(dropdown => {
     dropdown.classList.remove('closed');
   });
});

inputField.addEventListener('blur', () => {
   inputField.placeholder = 'Select state';
  dropdown.classList.remove('open');
});

document.addEventListener('click', (evt) => {
  const isDropdown = dropdown.contains(evt.target);
  const isInput = inputField.contains(evt.target);
  if (!isDropdown && !isInput) {
    dropdown.classList.remove('open');
  }
});




var input;
var cursor;
var hiddenInput;
var content = [];
var lastContent = "", targetContent = "";
var inputLock = false;
var autoWriteTimer;

var isMobile, isIE;

window.onload = function() {

    isMobile = navigator && navigator.platform && navigator.platform.match(/^(iPad|iPod|iPhone)$/);

    isIE = (navigator.appName == 'Microsoft Internet Explorer');

    input = document.getElementById('input');

    hiddenInput = document.getElementById('hiddenInput');
    hiddenInput.focus();

    cursor = document.createElement('cursor');
    cursor.setAttribute('class', 'blink');
    cursor.innerHTML = "|";

    if (!isMobile && !isIE) input.appendChild(cursor);

    function refresh() {

        inputLock = true;

        if (targetContent.length - lastContent.length == 0) return;

        var v = targetContent.substring(0, lastContent.length + 1);

        content = [];

        var blinkPadding = false;

        for (var i = 0; i < v.length; i++) {
            var l = v.charAt(i);

            var d = document.createElement('div');
            d.setAttribute('class', 'letterContainer');

            var d2 = document.createElement('div');

            var animClass = (i % 2 == 0) ? 'letterAnimTop' : 'letterAnimBottom';

            var letterClass = (lastContent.charAt(i) == l) ? 'letterStatic' : animClass;

            if (letterClass != 'letterStatic') blinkPadding = true;

            d2.setAttribute('class', letterClass);

            d.appendChild(d2);

            d2.innerHTML = l;
            content.push(d);
        }

        input.innerHTML = '';

        for (var i = 0; i < content.length; i++) {
            input.appendChild(content[i]);
        }

        cursor.style.paddingLeft = (blinkPadding) ? '22px' : '0';

        if (!isMobile && !isIE) input.appendChild(cursor);

        if (targetContent.length - lastContent.length > 1) setTimeout(refresh, 150);
        else inputLock = false;

        lastContent = v;
    }

    if (document.addEventListener) {

        document.addEventListener('touchstart', function(e) {
            clearInterval(autoWriteTimer);
            targetContent = lastContent;
        }, false);

        document.addEventListener('click', function(e) {
            clearInterval(autoWriteTimer);
            targetContent = lastContent;
            hiddenInput.focus();
        }, false);

        if (!isIE) {
            // Input event is buggy on IE, so don't bother
            // (https://msdn.microsoft.com/en-us/library/gg592978(v=vs.85).aspx#feedback)
            // We will use a timer instead (below)
            hiddenInput.addEventListener('input', function(e) {
                e.preventDefault();
                targetContent = hiddenInput.value;
                if (!inputLock) refresh();

            }, false);
        } else {
            setInterval(function() {
                targetContent = hiddenInput.value;

                if (targetContent != lastContent && !inputLock) refresh();
            }, 100);
        }

    }

    hiddenInput.value = "";

    autoWriteTimer = setTimeout(function() {
        if (lastContent != "") return;
        targetContent = "type something...";
        refresh();
    }, 2000);
}
