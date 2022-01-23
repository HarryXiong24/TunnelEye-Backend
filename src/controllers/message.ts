import { Context } from 'koa';
import SQLQuery from '@/sql/query';
import paginate from '@/utils/pagination';

interface Info {
  infoAuthor: string;
  infoId: number;
  infoSource: string;
  infoTime: string;
  infoTitle: string;
  infoType: string;
  level: string;
  state: number;
}

export const getInfos = async (ctx: Context) => {
  const limit = Number(ctx.query.limit);
  const page = Number(ctx.query.page);
  const type: 0 | 1 = Number(ctx.query.type) as 0 | 1;

  try {
    const sql = `select * from information where infotype = ${type}`;
    const data = (await SQLQuery(ctx.mysql, sql)) as Array<Record<string, any>>;
    const length = data.length;
    const filter_data: Info[] = [];
    data.forEach((value) => {
      const {
        infoid: infoId,
        infotype: infoType,
        infotitle: infoTitle,
        infosource: infoSource,
        infoauthor: infoAuthor,
        infotime: infoTime,
        level,
        state,
      } = value;
      filter_data.push({
        infoId,
        infoType,
        infoTitle,
        infoSource,
        infoAuthor,
        infoTime,
        level,
        state,
      });
    });
    const result = paginate(filter_data, limit);
    console.log(result);
    ctx.body = { count: length, data: result[page] };
  } catch (err) {
    console.log(err);
  }
};

export const getInfoDetail = async (ctx: Context) => {
  const params = Number(ctx.query.infoId);

  try {
    const sql = `select * from information where infoid = ${params}`;
    const data = (await SQLQuery(ctx.mysql, sql)) as Array<Record<string, any>>;
    const {
      infoid: infoId,
      infotype: infoType,
      infotitle: infoTitle,
      infosource: infoSource,
      infoauthor: infoAuthor,
      infocontent: infoContent,
      infotime: infoTime,
      level,
    } = data[0];
    ctx.body = {
      infoId,
      infoType,
      infoTitle,
      infoSource,
      infoAuthor,
      infoContent,
      infoTime,
      level,
    };
  } catch (err) {
    console.log(err);
  }
};
