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
        sensoraddress: sensorAdd,
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
  const nodeId = Number(ctx.query.nodeId);
  const sensorAdd = Number(ctx.query.sensorAdd);

  try {
    const sql = `select * from sensors where nodeid = ${nodeId} and sensoraddress = ${sensorAdd}`;
    const data = (await SQLQuery(ctx.mysql, sql)) as Array<Record<string, any>>;
    const result: Sensor[] = [];
    data.forEach((value) => {
      const {
        importtime: importTime,
        sensoraddress: sensorAdd,
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
