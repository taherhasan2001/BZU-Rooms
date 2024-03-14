const axios = require('axios');
const fs = require('fs');

function sortTimeSlots(timeA, timeB) {
    const startTimeA = timeA.split(' - ')[0];
    const startTimeB = timeB.split(' - ')[0];

    const dateA = new Date(`2000-01-01 ${startTimeA}`);
    const dateB = new Date(`2000-01-01 ${startTimeB}`);

    return dateA - dateB;
}

class PlaceBZU {
    constructor(name) {
        this.name = name;
        this.Monday = [];
        this.Tuesday = [];
        this.Wednesday = [];
        this.Thursday = [];
        this.Friday = [];
        this.Saturday = [];
        this.Sunday = [];
    }
}

async function fetchData() {
    try {
        const response = await axios.get('https://www.bzu-hub.com/schedule-main/BZU/BZU.json'); // Please note that the URL provided may change over time.

        const data = response.data;

        const AllRooms = {};

        for (const course of data) {
            const place = course.place;
            const days = course.days.split(', ');
            const time = course.time.split(', '); 
            let obj;
            if (!(place in AllRooms)) {
                obj = new PlaceBZU(place);
                AllRooms[place] = obj;
            } else {
                obj = AllRooms[place];
            }
            for (const day of days) {
                if (day === "M") {
                    obj.Monday.push(...time); 
                } else if (day === "T") {
                    obj.Tuesday.push(...time);
                } else if (day === "W") {
                    obj.Wednesday.push(...time);
                } else if (day === "R") {
                    obj.Thursday.push(...time);
                } else if (day === "F") {
                    obj.Friday.push(...time);
                } else if (day === "S") {
                    obj.Saturday.push(...time);
                } else if (day === "N") {
                    obj.Sunday.push(...time);
                }
            }
        }

        for (const key of Object.keys(AllRooms)) { // The times should be sorted in ascending order.
            const obj = AllRooms[key];
            obj.Monday = obj.Monday.sort(sortTimeSlots);
            obj.Tuesday = obj.Tuesday.sort(sortTimeSlots);
            obj.Wednesday = obj.Wednesday.sort(sortTimeSlots);
            obj.Thursday = obj.Thursday.sort(sortTimeSlots);
            obj.Friday = obj.Friday.sort(sortTimeSlots);
            obj.Saturday = obj.Saturday.sort(sortTimeSlots);
            obj.Sunday = obj.Sunday.sort(sortTimeSlots);
        }

        // Convert AllRooms object to JSON string
        const jsonData = JSON.stringify(AllRooms, null, 2);

        // Write JSON string to Rooms.json file
        fs.writeFileSync('Rooms.json', jsonData);

        console.log('Data has been written to Rooms.json');
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

fetchData();
