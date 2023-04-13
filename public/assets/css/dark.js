  const storageKey = 'theme-preference'

const onClick = () => {
// flip current value
theme.value = theme.value === 'light'? 'dark': 'light'

console.log(theme.value)
setPreference()
}

const getColorPreference = () => {
if (localStorage.getItem(storageKey))
  return localStorage.getItem(storageKey)
else
  return 'dark'
}

const setPreference = () => {
localStorage.setItem(storageKey, theme.value)
reflectPreference()
}

const reflectPreference = () => {
    console.log('theme wala')
document.firstElementChild
  .setAttribute('data-theme', theme.value)

// document
//   .querySelector('#theme-toggle')
//   ?.setAttribute('aria-label', theme.value)
body = document.getElementsByTagName('body')[0]
// let element = document.getElementById("myDIV");
body.classList.toggle("light");
}

const theme = {
value: getColorPreference(),
}

// set early so no page flashes / CSS is made aware
// reflectPreference()

window.onload = () => {
// set on load so screen readers can see latest value on the button

// now this script can find and listen for clicks on the control
document
  .getElementsByClassName('theme-toggle')[0]
  .addEventListener('click', onClick)
  document
  .getElementsByClassName('theme-toggle')[1]
  .addEventListener('click', onClick)
}

    if(localStorage.getItem(storageKey) == 'light' ){
        body = document.getElementsByTagName('body')[0]

body.classList.toggle("light");
    }

