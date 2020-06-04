#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Created on Sun May 31 11:37:27 2020

@author: devaraj
"""
'''
sudo apt-get install libpq-dev
pip install psycopg2Collecting psycopg2'''

import configparser
config=configparser.ConfigParser()
import pandas as pd
import pandas.io.sql as sqlio
import psycopg2

config.read('datatable.ini')

con = psycopg2.connect(host=config['pgsql']['host'],database=config['pgsql']['database'], 
                       user=config['pgsql']['user'],password=config['pgsql']['password'])
query='''
select table_schema, 
       table_name, 
       (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
from (
  select table_name, table_schema, 
         query_to_xml(format('select count(*) as cnt from %I.%I', table_schema, table_name), false, true, '') as xml_count
  from information_schema.tables
  where table_schema = 'public' and table_catalog='{}'
  and table_name in ('{}','{}','{}','{}','{}','{}','{}','{}')
) t;'''.format(config['psql']['database'],config['table']['block_master'],
config['table']['cluster_master'],config['table']['district_master'],
config['table']['school_master'],config['table']['inspection_master'],
config['table']['semester'],config['table']['student_attendance'],
config['table']['user_location_master'])

dat = sqlio.read_sql_query(query, con)
print(dat)
con=None

conn = psycopg2.connect("host='{}' port={} dbname='{}' user={} password={}".format(config['pgsql']['host'],
                        config['pgsql']['port'],config['pgsql']['database'],
                        config['pgsql']['user'],config['pgsql']['password']))

query='''
select table_schema, 
       table_name, 
       (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
from (
  select table_name, table_schema, 
         query_to_xml(format('select count(*) as cnt from %I.%I', table_schema, table_name), false, true, '') as xml_count
  from information_schema.tables
  where table_schema = 'public' and table_catalog='cqubedev'
) t;'''

dat = sqlio.read_sql_query(query, conn)
