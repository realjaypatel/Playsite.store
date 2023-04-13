

let saveBtn = document.getElementById('saveBtn');
console.log(saveBtn);
let box = document.getElementById('box');
let backdrop = document.getElementById('backdrop');
saveBtn.addEventListener('click', (e) => {
    // e.preventDefault();
    backdrop.style.display = 'block';
    console.log("inside");
    box.style.display = 'flex';
    
})