import { Context } from 'koa';
import SQLQuery from '../sql/query';

interface Node {
  devAddress: string;
  devInfo: string;
  devName: string;
  devNo: number;
  nodeId: number;
  status: number;
}

interface uwbBase {
  baseName: string;
  baseNumber: number;
  xcoor: number;
  ycoor: number;
  zcoor: number;
}

interface DrawingInfo {
  sysName: string;
  address: string;
  ploygon: Record<string, any>;
  uwbBaseCoor: uwbBase[];
  uwbBaseCount: number;
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

export const getDrawingInfo = async (ctx: Context) => {
  const sysId = ctx.query.sysId as string;

  try {
    const sql_uwbsys = `select * from uwbsys where sysId = ${sysId}`;
    const sql_mapinfo = `select * from mapinfo where sysId = ${sysId}`;
    const sql_uwbbaseinfo = `select * from uwbbaseinfo where sysId = ${sysId}`;

    const data_uwbsys = (await SQLQuery(ctx.mysql, sql_uwbsys)) as Array<Record<string, any>>;
    const data_mapinfo = (await SQLQuery(ctx.mysql, sql_mapinfo)) as Array<Record<string, any>>;
    const data_uwbbaseinfo = (await SQLQuery(ctx.mysql, sql_uwbbaseinfo)) as Array<Record<string, any>>;

    const { sysname: sysName, setupadd: address } = data_uwbsys[0];

    const coorGroup: any[] = [];
    const coorGroupCount: number = data_mapinfo.length;
    data_mapinfo.forEach((value) => {
      const group_num = value.coorgroup.replace(/[^\d.]/g, '');
      console.log(group_num);
      const group: any[] = [];
      let i = 0;
      while (i <= group_num.length - 1) {
        const array = [];
        let count = 0;
        while (count < 2 && i <= group_num.length - 1) {
          array.push(Number(group_num[i]));
          i++;
          count++;
        }
        group.push(array);
      }
      coorGroup.push(group);
    });
    const ploygon: Record<string, any> = {
      coorGroup,
      coorGroupCount,
    };

    const uwbBaseCoor: uwbBase[] = [];
    const uwbBaseCount: number = data_uwbbaseinfo.length;
    data_uwbbaseinfo.forEach((value) => {
      const {
        basenumber: baseNumber,
        basename: baseName,
        basexcoor: xcoor,
        baseycoor: ycoor,
        basezcoor: zcoor,
      } = value;
      uwbBaseCoor.push({
        baseNumber,
        baseName,
        xcoor,
        ycoor,
        zcoor,
      });
    });

    const result: DrawingInfo = {
      sysName,
      address,
      ploygon,
      uwbBaseCoor,
      uwbBaseCount,
    };

    ctx.body = result;
  } catch (err) {
    console.log(err);
  }
};

export const getSysId = async (ctx: Context) => {
  const nodeId = ctx.query.nodeId as string;

  try {
    const sql = `select * from uwbsys where nodeid = ${nodeId}`;
    const data = (await SQLQuery(ctx.mysql, sql)) as Array<Record<string, any>>;
    const result: number[] = [];

    data.forEach((value) => {
      result.push(value.sysid);
    });

    ctx.body = result;
  } catch (err) {
    console.log(err);
  }
};
