<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

NestJS Example repository for Postgres TypeORM integration with migrations

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Migrations

```bash
# Create a migration
$ npm run migration:create --name=roles

# Generate a migration from schema changes
$ npm run migration:generate --name=users

# Run migrations and checks for schema changes
$ npm run migration:run

# Revert migrations
$ npm run migration:revert

 const indexName = '"IDX_USER_TRANSACTION"';
 const constraintName = '"FK_USER_TRANSACTION"', '"UQ_USER_EMAIl"';
 const tableName = '"Transaction"';
 const newTableName ='"Transaction"';
 const oldColumn = '"productId"';
 const newColumn = '"productId"';
 const columnName = '"productId"';
 const columnType = 'uuid';
 const referencedTable = '"Product"';
 const referencedColumn = '"id"';

await queryRunner.query(``)

ALTER TABLE ${tableName} RENAME TO ${newTableName}
ALTER TABLE ${tableName} RENAME COLUMN ${oldColunm} TO ${nedColunm}`,

ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnType}
ALTER TABLE ${tableName} DROP COLUMN ${columnName}
ALTER TABLE  ${tableName} ALTER COLUMN ${columnName} TYPE ${columnType}

ALTER TABLE ${tableName}
ADD CONSTRAINT ${constraintName} FOREIGN KEY (${columnName})
REFERENCES ${referencedTable} (${referencedColumn});

ALTER TABLE ${tableName}
ADD CONSTRAINT ${constraintName} UNIQUE (${columnName});

CREATE INDEX `${indexName}`
ON `${tableName}` (`${columnName}`);

ALTER TABLE `${indexName}`
DROP CONSTRAINT `${constraintName}`;

DROP INDEX `${indexName}` ON `${indexName}`;