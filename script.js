const display = document.getElementById("display");
const keys    = document.querySelector(".keys");

/* ----- Helpers ------------------------------------------------- */
function cleanFloat(num, decimals = 12){
  const f = 10 ** decimals;
  return parseFloat((Math.round((num + Number.EPSILON) * f) / f).toString());
}

// Single “()” key toggles intelligently
function insertBracket(){
  const txt   = display.value;
  const opens = (txt.match(/\(/g) || []).length;
  const closes= (txt.match(/\)/g) || []).length;
  const last  = txt.slice(-1);

  if (opens === closes || /[+\-*/%(÷×]/.test(last) || txt === ""){
    display.value += "(";
  }else{
    display.value += ")";
  }
}
/* --------------------------------------------------------------- */

keys.addEventListener("click", e=>{
  if (!e.target.matches("button")) return;

  const { value, action } = e.target.dataset;

  switch(action){
    case "clear":
      display.value = "";
      break;

    case "backspace":
      display.value = display.value.slice(0,-1);
      break;

    case "equals":
      try{
        const expr = display.value.replace(/%/g,"/100*");
        const raw  = Function(`'use strict'; return (${expr})`)();
        display.value = cleanFloat(raw);
      }catch{
        display.value = "Error";
      }
      break;

    case "bracket":
      insertBracket();
      break;

    default:              // numbers, ops, dot, %
      display.value += value;
  }
});
