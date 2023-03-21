// tambahin onclick di sini
document.getElementById("load-file").onchange = () => {loadFile();}
document.getElementById("shading").onchange = () => {handleClickShading()}
document.getElementById("reset-view").onclick = () => {resetToDefaultView()}
document.getElementById("color-picker").onchange = () => {handleClickColor()}