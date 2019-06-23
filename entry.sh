#!/bin/bash

echo Starting Django-React Blueprint with Gunicorn!
exec gunicorn --bind 0.0.0.0:8000 --workers 3 wsgi:application