#!/bin/bash

# must match the name of the service for the database in
# the docker-compose.yml file
DATABASE_SERVICE=db

# check to see if script is running in docker
if [ -f /.dockerenv ]; then
    # get tool to check if database is ready
    apt-get update && apt-get install -y postgresql-client

    # spin until database is ready
    while
      pg_isready -h $DATABASE_SERVICE
      [ $? -ne 0 ]
    do :;  done
fi


# run test
npm test
