import json
import os
import psycopg2

def handler(event, context):
    '''
    Business: API для генерации контента с помощью ИИ и сохранения в БД
    Args: event - HTTP запрос с типом генерации и промптом
          context - контекст выполнения функции
    Returns: JSON с результатом генерации
    '''
    method = event.get('httpMethod', 'GET')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        try:
            body_data = json.loads(event.get('body', '{}'))
            
            # Базовая валидация
            required_fields = ['user_id', 'type', 'prompt', 'title']
            for field in required_fields:
                if field not in body_data:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': f'Missing field: {field}'})
                    }
            
            user_id = body_data['user_id']
            content_type = body_data['type']
            prompt = body_data['prompt']
            title = body_data['title']
            description = body_data.get('description')
            
            # Подключение к базе данных
            database_url = os.environ.get('DATABASE_URL')
            if not database_url:
                return {
                    'statusCode': 500,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Database connection not configured'})
                }
            
            conn = psycopg2.connect(database_url)
            cur = conn.cursor()
            
            # Создание записи проекта в БД
            cur.execute("""
                INSERT INTO projects (user_id, title, description, type, prompt, status)
                VALUES (%s, %s, %s, %s, %s, 'processing')
                RETURNING id
            """, (user_id, title, description, content_type, prompt))
            
            project_id = cur.fetchone()[0]
            
            # Симуляция генерации контента
            if content_type == 'text':
                result = f"Сгенерированный текст на основе промпта: '{prompt}'"
            elif content_type == 'image':
                result = f"URL изображения: https://example.com/generated_image_{project_id}.jpg"
            elif content_type == 'video':
                result = f"URL видео: https://example.com/generated_video_{project_id}.mp4"
            elif content_type == 'audio':
                result = f"URL аудио: https://example.com/generated_audio_{project_id}.mp3"
            elif content_type == 'translate':
                result = f"Переведенный текст: [TRANSLATION] {prompt}"
            else:  # summarize
                result = f"Краткое содержание: {prompt[:100]}..."
            
            # Обновление записи с результатом
            cur.execute("""
                UPDATE projects 
                SET result = %s, status = 'completed'
                WHERE id = %s
            """, (result, project_id))
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'project_id': project_id,
                    'result': result,
                    'type': content_type,
                    'status': 'completed'
                })
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)})
            }
    
    elif method == 'GET':
        # Получение списка проектов пользователя
        user_id = event.get('queryStringParameters', {}).get('user_id')
        if not user_id:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'user_id parameter required'})
            }
        
        try:
            database_url = os.environ.get('DATABASE_URL')
            conn = psycopg2.connect(database_url)
            cur = conn.cursor()
            
            cur.execute("""
                SELECT id, title, description, type, status, created_at, updated_at
                FROM projects 
                WHERE user_id = %s 
                ORDER BY created_at DESC 
                LIMIT 50
            """, (user_id,))
            
            projects = []
            for row in cur.fetchall():
                projects.append({
                    'id': row[0],
                    'title': row[1],
                    'description': row[2],
                    'type': row[3],
                    'status': row[4],
                    'created_at': row[5].isoformat() if row[5] else None,
                    'updated_at': row[6].isoformat() if row[6] else None
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'projects': projects})
            }
            
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': str(e)})
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }