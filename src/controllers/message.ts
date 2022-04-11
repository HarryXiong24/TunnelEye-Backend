import { Context } from 'koa';
import SQLQuery from '../sql/query';
import paginate from '../utils/pagination';
import api from '../api/ip';

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

export const getIP = async (ctx: Context) => {
  try {
    const response = await api.getIP({
      key: 'SL5BZ-UEDCO-OLDWE-SAZNW-NFDVK-PWFK2',
    });
    const data = response.data;
    const ip = data?.result?.ip;
    const cityInfo = `${data?.result?.ad_info?.nation}-${data?.result?.ad_info?.province}-${data?.result?.ad_info?.city}`;

    // ctx.body = { cityInfo, ip };
    ctx.body = { cityInfo: '中国-四川省-成都市', ip: '183.221.76.142' };
  } catch (err) {
    console.log(err);
  }
};
