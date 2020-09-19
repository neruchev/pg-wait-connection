# pg-wait-connection

Wait PostgreSQL connection with [node-postgres](https://www.npmjs.com/package/pg).

## Installation

```
npm install --save pg-wait-connection
```
or
```
yarn add pg-wait-connection
```

## Usage

```ts
import { Pool } from 'pg';
import { PgWaitConnection } from 'pg-wait-connection';

const pool = new Pool({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
});

const waitConnection = new PgWaitConnection({ pool });

await waitConnection.check();
```

## Options

| Name  | Type    | Required | Default value  | Description |
|------ |---------|----------|----------------|-------------|
| pool  | Pool    | yes      | -              | Pg Pool (see [documentation](https://node-postgres.com/features/pooling)) |
| query | string  | no       | `SELECT NOW()` | SQL-query, which is executed on every check. You can check that the database is available or that the database contains the table/data you need (for example after run migrations) |
| retry | number  | no       | `10`           | The number of attempts after which checks are stopped |
| debug | boolean | no       | `false`        | Enable logs |
