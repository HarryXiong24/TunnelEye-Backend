import { Context } from 'koa';
import moment from 'moment';
import SQLQuery from '../sql/query';

interface SensorValue {
  measureTime: string;
  sensorAdd: number;
  value: number;
}

export const getPersonInfo = async (ctx: Context) => {
  const nodeId = Number(ctx.query.nodeId);
  const type = Number(ctx.query.type);
  const sensorAdd = Number(ctx.query.sensorAdd);

  const startTime = (ctx.query.startTime as string).replace(/(.*)-/, '$1 ');
  const endTime = (ctx.query.endTime as string).replace(/(.*)-/, '$1 ');

  try {
    const sql = `select * from sensordata where nodeid = ${nodeId} and sensortype = ${type} and sensoradd = ${sensorAdd} and measuretime between '${startTime}' and '${endTime}'`;
    const data = (await SQLQuery(ctx.mysql, sql)) as Array<Record<string, any>>;
    const length = data.length;
    const result: SensorValue[] = [];
    data.forEach((data) => {
      const { measuretime, sensoradd: sensorAdd, value } = data;
      const measureTime = moment(measuretime).format('YYYY-MM-DD HH:mm:ss');
      result.push({
        measureTime,
        sensorAdd,
        value,
      });
    });
    ctx.body = { count: length, data: result };
  } catch (err) {
    console.log(err);
  }
};
