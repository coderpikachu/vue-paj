export const processCounter = (counter) => {
  const counterInfos = [];
  const top5Ids = [];
  counter
    .slice(1, counter.length - 1)
    .split('&')
    .forEach((p) => {
      const two = p.split(',');
      counterInfos.push({
        id: two[0],
        win: two[1],
      });
    });
  // counterInfos.sort((a, b) => {
  //   return parseFloat(a.win) - parseFloat(b.win);
  // });
  counterInfos
    .sort((a, b) => a.win - b.win)
    .forEach((info) => {
      top5Ids.push(info.id);
    });
  //console.log(counterInfos);
  return [top5Ids, counterInfos];
};
