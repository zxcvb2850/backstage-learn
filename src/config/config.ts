interface CONFIG {
    PORT: 4000,
    mysql: {
        host: string,
        port: number,
        user: string,
        password: string,
        database: string,
        connectTimeout: number,
    }
    // jwt-token secret
    adminSecret: string,
    webSecret: string,

    [key: string]: any,
}

const config: CONFIG = {
    PORT: 4000,

    mysql: {
        host: "1.1.1.",
        port: 1234,
        user: "root",
        password : "",
        database: "root",
        connectTimeout: 500
    },

    // jwt-token secret
    adminSecret: 'pic-2850-admin*+-',
    webSecret: 'pic-2850-web*/+-=',
};

export default config;
