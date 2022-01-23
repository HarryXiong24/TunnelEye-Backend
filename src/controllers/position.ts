import { Context } from 'koa';
import SQLQuery from '@/sql/query';

interface Node {
  devAddress: string;
  devInfo: string;
  devName: string;
  devNo: number;
  nodeId: number;
  status: number;
}

export const getNode = async (ctx: Context) => {
  try {
    const sql = 'select * from devnode';
    const data = (await SQLQuery(ctx.mysql, sql)) as Array<Record<string, any>>;
    const result: Node[] = [];
    data.forEach((value) => {
      const { devaddress: devAddress, devname: devName, devno: devNo, nodeid: nodeId, status } = value;
      result.push({
        devAddress,
        devInfo: devName + devAddress,
        devName,
        devNo,
        nodeId,
        status,
      });
    });
    ctx.body = result;
  } catch (err) {
    console.log(err);
  }
};
