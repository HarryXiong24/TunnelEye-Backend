import { Context } from 'koa';
import SQLQuery from '@/sql/query';

interface Sensor {
  importTime: string;
  sensorAdd: number;
  sensorId: number;
  sensorNo: string;
  sensorType: number;
  setUpAdd: string;
}

export const getSensors = async (ctx: Context) => {
  const nodeId = Number(ctx.query.nodeId);
  const type = Number(ctx.query.type);

  try {
    const sql = `select * from sensors where nodeid = ${nodeId} and sensortype = ${type}`;
    const data = (await SQLQuery(ctx.mysql, sql)) as Array<Record<string, any>>;
    const result: Sensor[] = [];
    data.forEach((value) => {
      const {
        importtime: importTime,
        sensoradd: sensorAdd,
        sensorid: sensorId,
        sensorno: sensorNo,
        sensortype: sensorType,
        setupadd: setUpAdd,
      } = value;
      result.push({
        importTime,
        sensorAdd,
        sensorId,
        sensorNo,
        sensorType,
        setUpAdd,
      });
    });
    ctx.body = result;
  } catch (err) {
    console.log(err);
  }
};

export const getSensorDetail = async (ctx: Context) => {
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
