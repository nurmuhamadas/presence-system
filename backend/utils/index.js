const getDay = (numberDay) => {
  const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  return day[numberDay];
};

const addZero = (number) => (number < 10 ? `0${number}` : number);

const getObjectTime = () => {
  const d = new Date();

  return {
    day: getDay(d.getDay()),
    date: addZero(d.getDate()),
    month: addZero(d.getMonth()),
    year: d.getFullYear(),
    time: `${addZero(d.getHours())}:${addZero(d.getMinutes())}`,
  };
};

module.exports = { getDay, getObjectTime };
