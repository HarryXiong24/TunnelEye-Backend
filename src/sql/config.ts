import mysql from 'mysql';

export const options: string | mysql.ConnectionConfig = {
  host: '182.92.221.129',
  // 可选，默认式3306
  port: 3306,
  user: 'root',
  password: '',
  database: 'uwb',
};

export default options;
