source .env
# Skills DB ID from .env
DB_ID=$VITE_NOTION_DB_SKILLS_ID
curl -X POST "https://api.notion.com/v1/databases/$DB_ID/query" \
  -H "Authorization: Bearer $VITE_NOTION_TOKEN" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  --data '{"page_size": 1}'
