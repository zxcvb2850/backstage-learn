import mysql, {Connection} from "mysql";
import config from "./config";
/*

const sql = mysql.createConnection(config.mysql);

sql.connect((err) => {
    if (err) {
        console.error("connect mysql error: ", err);
        return;
    }

    console.info("connect mysql success");
});

export const query: () => Promise<MysqlError | any> = () => {
    return new Promise(async (resolve, reject) => {
        sql.query(`select * from \`i_admin_users\``, (err, result) => {
            if (err) {
                reject(err);
            }

            resolve(result);
        });
    })
}

export default sql;*/


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

