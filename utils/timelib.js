const getTimeStamp = (date = true, time = true) => {
    const currentDateTime = new Date();

    if (date && time) {
        return currentDateTime.toISOString();
    }

    if (!time) {

    }

    if (!date) {

    }
};

const getISOTimeStamp = () => {
    const currentDateTime = new Date();
    return currentDateTime.toISOString();
};

const getDateDiff = (dateStr1, dateStr2) => {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);


};

console.log(getTimeStamp());

// module.exports = {
//     getTimeStamp,
//     getDateDiff
// };