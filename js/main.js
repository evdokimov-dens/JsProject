const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date().getDay();

week.forEach((item, index) => {
  let output = item;

  if (index === 0 || index === 6) output = `*${output}*`;
  if (index === today) output = `**${output}**`;

  console.log(output);
});
