import mysql, {Connection} from "mysql";
import config from "./config";

// 连接 mysql
const connect: () => Connection = () => {
    const connection = mysql.createConnection(config.mysql);

    return connection;
}

// 新建查询
export const querySql: (sql: string) => Promise<any> = (sql) => {
    const conn = connect();
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, result) => {
                if (err) reject(err);

                resolve(result);
            })
        } catch (err) {
            reject(err);
        } finally {
            conn.end(); // 释放连接
        }
    })
}

// 查询一个结果的
export const queryOne: (sql: string) => Promise<any> = (sql) => {
    const conn = connect();

    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, result) => {
                if (err) reject(err);

                if (result && result[0]) {
                    resolve(result[0])
                } else {
                    reject("mysql select query one is null");
                }
            })
        } catch (err) {
            reject(err);
        }
    })
}

