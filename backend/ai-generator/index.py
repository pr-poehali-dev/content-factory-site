import json
from datetime import datetime

def handler(event, context):
    '''
    Business: Handles AI content generation requests and saves projects to database
    Args: event - dict with httpMethod, body containing user_id, type, prompt, title, description
          context - object with attributes: request_id, function_name, function_version
    Returns: HTTP response dict with generated content
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
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Only POST method allowed'})
        }
    
    # Parse request body
    try:
        body_data = json.loads(event.get('body', '{}'))
        user_id = body_data.get('user_id')
        content_type = body_data.get('type')
        prompt = body_data.get('prompt')
        title = body_data.get('title', f'AI Project {datetime.now().strftime("%Y-%m-%d %H:%M")}')
        description = body_data.get('description', '')
        
        if not all([user_id, content_type, prompt]):
            return {
                'statusCode': 400,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Missing required fields: user_id, type, prompt'})
            }
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid JSON in request body'})
        }
    
    # Generate content based on type
    try:
        result = generate_content(content_type, prompt)
        project_id = 1  # Placeholder for now
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'project_id': project_id,
                'result': result,
                'type': content_type,
                'title': title
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Generation failed: {str(e)}'})
        }


def generate_content(content_type, prompt):
    """Generate content based on type and prompt"""
    
    generators = {
        'text': generate_text_content,
        'image': generate_image_content,
        'video': generate_video_content,
        'audio': generate_audio_content,
        'translate': generate_translation,
        'summarize': generate_summary
    }
    
    generator = generators.get(content_type)
    if not generator:
        raise ValueError(f'Unsupported content type: {content_type}')
    
    return generator(prompt)


def generate_text_content(prompt):
    """Generate text content using AI"""
    return f"""Сгенерированный текст на основе промпта: "{prompt}"

Это пример ИИ-генерации текстового контента. В реальной реализации здесь будет:
- Подключение к OpenAI API для создания качественного текста
- Обработка различных типов запросов (статьи, посты, описания)
- Настройка стиля и тона под требования пользователя

Сгенерированный контент будет соответствовать современным стандартам качества и релевантности."""


def generate_image_content(prompt):
    """Generate image content description"""
    return f"""Изображение создано по запросу: "{prompt}"

URL: /generated-images/image_{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg

Характеристики:
- Разрешение: 1024x1024
- Стиль: Реалистичный
- Формат: JPEG
- Качество: Высокое

В продакшене здесь будет интеграция с DALL-E, Midjourney или Stable Diffusion."""


def generate_video_content(prompt):
    """Generate video content description"""
    return f"""Видео создано по запросу: "{prompt}"

URL: /generated-videos/video_{datetime.now().strftime('%Y%m%d_%H%M%S')}.mp4

Параметры:
- Длительность: 30 секунд
- Разрешение: 1920x1080
- Формат: MP4
- Качество: HD

Интеграция с RunwayML, Pika Labs или другими ИИ видео-генераторами."""


def generate_audio_content(prompt):
    """Generate audio content description"""
    return f"""Аудио создано по запросу: "{prompt}"

URL: /generated-audio/audio_{datetime.now().strftime('%Y%m%d_%H%M%S')}.mp3

Характеристики:
- Длительность: 2 минуты
- Качество: 320 kbps
- Формат: MP3
- Голос: Естественный русский

Интеграция с ElevenLabs, Murf или другими TTS сервисами."""


def generate_translation(prompt):
    """Generate translation"""
    return f"""Перевод текста: "{prompt}"

Исходный язык: Автоопределение
Целевой язык: Английский

Переведенный текст:
[Здесь будет качественный перевод с учетом контекста и культурных особенностей]

Интеграция с DeepL, Google Translate API или собственными языковыми моделями."""


def generate_summary(prompt):
    """Generate text summary"""
    return f"""Краткое изложение текста:

Исходный текст: "{prompt[:100]}..."

Ключевые моменты:
• Основная тема и идея
• Важные факты и данные  
• Выводы и рекомендации

Сжатие: 80% от исходного объема при сохранении ключевой информации."""