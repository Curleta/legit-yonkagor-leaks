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
