# BZU-Room-Number

## Overview

This project creates a JSON file containing a list of rooms that have been reserved at BZU, along with the times they have been reserved for. It fetches data from a URL and processes it to generate the JSON file.

## Prerequisites

Before running this project, ensure you have `axios` installed:

```bash
npm install axios
```


Run the script:
```bash
node Room.js
```
Output:

The output should be a json file with name Rooms.json, Like this:

```bash
{
  "Al-Juraysi225": {
    "name": "Al-Juraysi225",
    "Monday": [
      "11:00 - 11:50",
      "12:00 - 12:50",
      "13:00 - 13:50",
      "14:00 - 15:20"
    ],
    "Tuesday": [
      "08:00 - 09:20",
      "09:30 - 10:50",
      "11:00 - 12:20",
      "14:00 - 15:20"
    ],
    "Wednesday": [
      "11:00 - 11:50",
      "12:00 - 12:50",
      "13:00 - 13:50",
      "14:00 - 15:20"
    ],
    "Thursday": [
      "08:00 - 09:20",
      "09:30 - 10:50",
      "11:00 - 12:20",
      "14:00 - 15:20"
    ],
    "Friday": [],
    "Saturday": [
      "08:00 - 10:50",
      "11:00 - 11:50",
      "12:00 - 12:50",
      "13:00 - 13:50",
      "14:00 - 16:50"
    ],
    "Sunday": []
  },
  .
  .
  .
}
```

