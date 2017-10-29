# Knex Migrations Around the World: Altering Tables

For this exercise, you will be altering the following tables using migrations.

```sql
CREATE TABLE continents (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL DEFAULT ''
);

CREATE TABLE countries (
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL DEFAULT '',
  government_type varchar(255) NOT NULL DEFAULT ''
);
```

To complete:

- Write a migration that adds both `created_at` and `updated_at` to the `continents` table.
- Write a migration that removes the `government_type` column from `countries`

In both cases, make sure that the `down()` function restores the database to the previous state.

## Setup

1. Fork & Clone this repository
1. Run `npm install`
1. Run `npm test` to run the tests
