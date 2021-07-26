module.exports = {
  "development": {
    "username": "hyperfocus-app-dbuser",
    "password": "timer-sql-backend-7227",
    "database": "hyperfocus-app-db",
    "host": "127.0.0.1",
	"dialect": "postgresql",
	"port": 5432
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgresql"
  }
}
