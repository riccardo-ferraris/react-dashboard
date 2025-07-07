const calendarData = [
  {
    id: 1,
    title: "Check inventory",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: 2,
    title: "Update database",
    date: new Date(new Date().setDate(new Date().getDate() + 3))
      .toISOString()
      .split("T")[0],
  },
  {
    id: 3,
    title: "Shipping order #453",
    date: new Date(new Date().setDate(new Date().getDate() + 5))
      .toISOString()
      .split("T")[0],
  },
  {
    id: 4,
    title: "Updated price list",
    date: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split("T")[0],
  },
];

export default calendarData;
