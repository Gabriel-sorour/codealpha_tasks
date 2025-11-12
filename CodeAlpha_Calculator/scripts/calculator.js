let result = '';
let isResult = false;


const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const plus = document.querySelector('.plus');
const four = document.querySelector('.four')
const five = document.querySelector('.five')
const six = document.querySelector('.six')
const minus = document.querySelector('.minus')
const seven = document.querySelector('.seven')
const eight = document.querySelector('.eight')
const nine = document.querySelector('.nine')
const multiply = document.querySelector('.multiply')
const zero = document.querySelector('.zero');
const point = document.querySelector('.point');
const equal = document.querySelector('.equal');
const devide = document.querySelector('.devide');
const leftPar = document.querySelector('.leftPar');
const rightPar = document.querySelector('.rightPar');
const clear = document.querySelector('.clear')
const deleteBtn = document.querySelector('.delete');


function appendValue(val) {
  const isNumberOrDot = /[0-9.]/.test(val);

  if (isResult && isNumberOrDot) {
    result = '';
    isResult = false;
  } else if (isResult && !isNumberOrDot) {
    isResult = false;
  }

  result += val;
  document.querySelector('p').innerText = result;
}


one.addEventListener('click', () => appendValue('1'));
two.addEventListener('click', () => appendValue('2'));
three.addEventListener('click', () => appendValue('3'));
plus.addEventListener('click', () => appendValue('+'));

four.addEventListener('click', () => appendValue('4'));
five.addEventListener('click', () => appendValue('5'));
six.addEventListener('click', () => appendValue('6'));
minus.addEventListener('click', () => appendValue('-'));

seven.addEventListener('click', () => appendValue('7'));
eight.addEventListener('click', () => appendValue('8'));
nine.addEventListener('click', () => appendValue('9'));
multiply.addEventListener('click', () => appendValue('*'));

zero.addEventListener('click', () => appendValue('0'));
point.addEventListener('click', () => appendValue('.'));

devide.addEventListener('click', () => appendValue('/'));

leftPar.addEventListener('click', () => appendValue('('));
rightPar.addEventListener('click', () => appendValue(')'));



equal.addEventListener('click', () => {
  try {
    let res = eval(result);

    if (!Number.isInteger(res)) {
      res = res.toFixed(2);
    }

    result = res.toString();
    document.querySelector('p').innerText = result;
    isResult = true;
  } catch {
    document.querySelector('p').innerText = 'Error';
    result = '';
    isResult = false;
  }
});


clear.addEventListener('click', () => {
  result = '';
  console.log('cleared');
  document.querySelector('p').innerText = '00';
});

deleteBtn.addEventListener('click', () => {
  result = result.slice(0, -1); // remove last character
  document.querySelector('p').innerText = result || '00';
});

//local storage ---------------------------------------------------------------------------

function setLocalResult() {
  localStorage.setItem('local-result', result);
}

function getLocalResult() {
  result = localStorage.getItem('local-result') || '';
  document.querySelector('p').innerText = result || '00';
}


getLocalResult();
document.querySelectorAll('button').forEach(item => item.addEventListener('click', () => setLocalResult()))

//toggle ---------------------------------------------------------------------------
document.querySelector('.mode').addEventListener('click', () => {
  document.body.classList.toggle('light');
  document.querySelector('svg').classList.toggle('light');
});
