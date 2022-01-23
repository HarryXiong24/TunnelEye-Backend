// 实现分页
// limit 为每页需要多少数据
export const paginate = (data: Array<any>, limit: number): Array<any[]> => {
  const length = data.length;
  const page_count = Math.floor(data.length / limit) + 1;
  const result: Array<any[]> = [];
  let point = 0;
  for (let i = 0; i < page_count; i++) {
    const temp = [];
    for (let j = 0; j < limit; j++) {
      if (point < length) {
        temp.push(data[point]);
        point++;
      }
    }
    result.push(temp);
  }
  return result;
};

export default paginate;
