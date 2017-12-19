#!/bin/bash

# create
docker-compose -f docker-compose-dev.yml run exercises python manage.py recreate_db
docker-compose -f docker-compose-dev.yml run users-service python manage.py recreate_db
docker-compose -f docker-compose-dev.yml run scores python manage.py recreate_db
# seed
docker-compose -f docker-compose-dev.yml run exercises python manage.py seed_db
docker-compose -f docker-compose-dev.yml run users-service python manage.py seed_db
docker-compose -f docker-compose-dev.yml run scores python manage.py seed_db
