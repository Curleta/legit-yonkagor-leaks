const mainOutput = document.getElementById("posts");

var fullTimeAndDate;

function decode(date, time) {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const OFFSET = 10

    const [day, month, year] = date.split("-").map(Number);
    const [hour, minute, second] = time.split(":").map(Number);

    const d = new Date();
    d.setUTCFullYear(2000 + year);
    d.setUTCMonth(month - 1);
    d.setUTCDate(day);
    d.setUTCHours(hour - OFFSET, minute, second);

    const h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, "0");
    const s = d.getSeconds().toString().padStart(2, "0");

    const period = h >= 12 ? "PM" : "AM";
    const displayH = h % 12 === 0 ? 12 : h % 12;

    fullTimeAndDate =`${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} at ` + `${displayH}:${m}:${s} ${period}`;
}

fetch("/assets/data.json")
    .then(response => {
        if(!response.ok) {
            console.error("Error loading data:", response.status);
        }
        return response.json();
    })
    .then(data => {
        for(let i = 0; i < data.length; i++) {
            decode(data[i].date, data[i].time);
            const postContainer = document.createElement("div");
            const postDate = document.createElement("p");
            const postDesciption = document.createElement("p");
            const imgContainer = document.createElement("div");
            const postImg1 = document.createElement("img");
            const postImg2 = document.createElement("img");

            mainOutput.appendChild(postContainer);
            postContainer.className = "post-container";

            postContainer.appendChild(postDate);
            postDate.className = "post-date";
            postDate.innerHTML = fullTimeAndDate;
            
            postContainer.appendChild(postDesciption);
            postDesciption.className = "post-description";
            postDesciption.innerHTML = data[i].content;

            postContainer.appendChild(imgContainer);
            imgContainer.className = "img-container";

            postContainer.appendChild(postImg1);
            postImg1.src = `/assets/post-img/post${i + 1}/post${i + 1}_img1.png`;
            postImg1.className = "post-img";

            postContainer.appendChild(postImg2);
            postImg2.src = `/assets/post-img/post${i + 1}/post${i + 1}_img2.png`;
            postImg2.className = "post-img";
        }
    })
    .catch(err => {
        console.error("Problem importing data: ", err);
    });