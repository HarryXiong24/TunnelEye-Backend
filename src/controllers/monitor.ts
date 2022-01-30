import { Context } from 'koa';
import moment from 'moment';
import SQLQuery from '@/sql/query';

interface Sensor {
  importTime: string;
  sensorAdd: number;
  sensorId: number;
  sensorNo: string;
  sensorType: number;
  setUpAdd: string;
}

interface SensorValue {
  measureTime: string;
  sensorAdd: number;
  value: number;
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

export const getSensorData = async (ctx: Context) => {
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
