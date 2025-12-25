var infoClose = document.getElementById("close-note-please");
var infoBox = document.getElementsByClassName("note-please");

const displayStatus = localStorage.getItem("notePleaseDisplay");

infoClose.addEventListener("click",() => {
    infoBox[0].style.display = "none";
    localStorage.setItem("notePleaseDisplay", "hidden");
});

if(displayStatus === "hidden") {
    infoBox[0].style.display = "none";
}