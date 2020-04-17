const moment = require("moment");

const ShowDate = (date) => {
    let formatDate;
    if (typeof date === "string") {
        if (date.includes("T") || date.includes("-")) {
            formatDate = new Date(date);
        } else {
            formatDate = new Date(Number(date));
        }
    } else {
        formatDate = new Date(date);
    }

    let emailDateYear = moment(formatDate).format("YYYY");
    let currentYear = moment().format("YYYY");
    if (emailDateYear === currentYear) {
        return moment(formatDate).format("MMM Do");
    } else {
        return moment(formatDate).format("MMM Do YYYY");
    }
}

export default ShowDate;