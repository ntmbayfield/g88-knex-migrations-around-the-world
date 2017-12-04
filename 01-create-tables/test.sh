#!/bin/bash

# must match the name of the service for the database in
# the docker-compose.yml file
DATABASE_SERVICE=db
COUNTER=0
EXITCODE=1

# check to see if script is running in docker
if [ -f /.dockerenv ]; then
    # get tool to check if database is ready

    # spin until database is ready

    while [ $EXITCODE -ne 0 ]
    do

      pg_isready -h $DATABASE_SERVICE
      EXITCODE=$?
      COUNTER=`expr $COUNTER + 1`

      sleep 1

      if [ $COUNTER -ge 59 ]; then
        echo "Timed Out - Database not Found"
        exit 1
      fi

    done
fi



npm test
