export const avgReview = (reviews) => {
    let avg = 0
    for(let i = 0; i < reviews.length; i++){
        avg += reviews[i].avgRating
    }
    return avg/reviews.length
}

export const getCity = (address) => {
    const split = address.split(",")
    return split[1]
}

export const specRevAvg = (reviews, revSec) => {
    let avg = 0
    // console.log(revSec)
    // console.log(reviews)
    reviews.forEach(review => {
        avg += review[revSec]
    })
    // console.log(avg/reviews.length)
    return (avg/reviews.length).toFixed(1)
}

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const bookedDates = (bookings) => {
    const dateArray = [];
    bookings.forEach(booking => {
        const startDate = new Date(booking.startDate.split(',').join(''))
        const endDate = new Date(booking.endDate.split(',').join(''))
        let currentDate = startDate;
        while (currentDate <= endDate) {
            dateArray.push(new Date (currentDate));
            // console.log(dateArray)
            currentDate = currentDate.addDays(1);
            // console.log(currentDate)
        }
        // console.log(dateArray)
    })
    return dateArray;
}