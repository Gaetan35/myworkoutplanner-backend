#!/bin/bash
set -e

PG_CONTAINER="myworkoutplanner_dev_db_server";
PG_DB="myworkoutplanner_development";
PG_USER="postgres"

export POSTGRES_CONTAINER=$PG_CONTAINER
export POSTGRES_DB=$PG_DB
export POSTGRES_USER=$PG_USER

docker-compose -f local-dev/development_db.yml up -d

echo "========================================"
echo "Database is up and running"
