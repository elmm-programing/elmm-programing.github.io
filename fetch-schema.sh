#!/bin/bash
# Load env vars or set them manually
source .env

TOKEN=$VITE_NOTION_TOKEN
USE_CASES_ID=$VITE_NOTION_DB_PROJECTS_ID
CERTS_ID=$VITE_NOTION_DB_CERTS_ID
SKILLS_ID=$VITE_NOTION_DB_SKILLS_ID

echo '{"skills":' > schema.json
curl -s -X POST "https://api.notion.com/v1/databases/$SKILLS_ID/query" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  --data '{"page_size": 1}' >> schema.json

echo ', "use_cases":' >> schema.json
curl -s -X POST "https://api.notion.com/v1/databases/$USE_CASES_ID/query" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  --data '{"page_size": 1}' >> schema.json

echo ', "certs":' >> schema.json
curl -s -X POST "https://api.notion.com/v1/databases/$CERTS_ID/query" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  --data '{"page_size": 1}' >> schema.json

echo '}' >> schema.json
