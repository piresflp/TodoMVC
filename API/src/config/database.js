module.exports = {
    dialect: 'postgres',
    dialectOptions: {
        options: {
            encrypt: false,
            validateBulkLoadParameters: true
        },
    },
    host: 'brightcitiesdb.cjxnue9s2rb0.us-east-2.rds.amazonaws.com',
    username: 'brightcitiesdb',
    password: 'dbpostgres',
    database: 'postgres',
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: false,
    }
};