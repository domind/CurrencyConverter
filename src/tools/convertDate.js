export function convertDate(date) {
  const current_datetime = new Date(date);
  return (
    (current_datetime.getDate() < 10
      ? "0" + current_datetime.getDate()
      : current_datetime.getDate()) +
    "." +
    (current_datetime.getMonth() + 1 < 10
      ? "0" + (parseInt(current_datetime.getMonth()) + 1)
      : current_datetime.getMonth() + 1) +
    "." +
    current_datetime.getFullYear()
  );
}
