// tambahin onclick di sini
document.getElementById("clear-canvas").onclick = () => {clearCanvas()}
document.getElementById("save-button").onclick = () => {saveFile()}
document.getElementById("load-file").onchange = () => {loadFile()}
document.getElementById("shading").onchange = () => {handleClickShading()}
document.getElementById("reset-view").onclick = () => {resetToDefaultView()}