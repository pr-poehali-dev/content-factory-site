import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Tools = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const tools = [
    {
      id: "text",
      name: "Генератор текста",
      description: "Создание статей, постов, описаний",
      icon: "FileText",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: "image",
      name: "Генератор изображений",
      description: "Создание уникальных изображений по описанию",
      icon: "Image",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      id: "video",
      name: "Видео контент",
      description: "Создание видеороликов и анимаций",
      icon: "Video",
      color: "from-pink-500 to-pink-600"
    },
    {
      id: "audio",
      name: "Аудио контент",
      description: "Преобразование текста в речь",
      icon: "Mic",
      color: "from-green-500 to-green-600"
    },
    {
      id: "translate",
      name: "Переводчик",
      description: "Перевод контента на разные языки",
      icon: "Languages",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      id: "summarize",
      name: "Суммаризатор",
      description: "Краткое изложение длинных текстов",
      icon: "FileSearch",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const handleGenerate = async () => {
    if (!selectedTool || !prompt.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/d8a7f94a-1131-4a9f-992d-62de74ee4ecf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // Временный ID пользователя
          type: selectedTool,
          prompt: prompt,
          title: `Проект ${tools.find(t => t.id === selectedTool)?.name}`,
          description: `Создано через ${tools.find(t => t.id === selectedTool)?.name}`
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);
      } else {
        setResult("Ошибка при генерации контента. Попробуйте позже.");
      }
    } catch (error) {
      console.error("Ошибка генерации:", error);
      setResult("Ошибка соединения. Проверьте интернет-подключение.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Cpu" className="text-primary" size={32} />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Factory
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Главная
              </Link>
              <Link to="/tools" className="text-primary font-semibold">
                ИИ Инструменты
              </Link>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              Мои проекты
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ИИ Инструменты
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Выберите инструмент для создания контента с помощью искусственного интеллекта
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tools Selection */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6">Выберите инструмент</h2>
            <div className="space-y-4">
              {tools.map((tool) => (
                <Card 
                  key={tool.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedTool === tool.id 
                      ? 'ring-2 ring-primary bg-card/80' 
                      : 'bg-card/50 hover:bg-card/80'
                  }`}
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center`}>
                        <Icon name={tool.icon as any} className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{tool.name}</h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      {selectedTool === tool.id && (
                        <Badge className="bg-primary text-primary-foreground">
                          Выбрано
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Generation Interface */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Sparkles" className="text-primary" size={24} />
                  <span>Генерация контента</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedTool ? (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Описание для генерации
                      </label>
                      <Textarea
                        placeholder="Опишите, что вы хотите создать..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-32 bg-input/50 border-border/40"
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button 
                        onClick={handleGenerate}
                        disabled={!prompt.trim() || loading}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        {loading ? (
                          <>
                            <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                            Генерируем...
                          </>
                        ) : (
                          <>
                            <Icon name="Play" className="mr-2" size={16} />
                            Создать
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => setPrompt("")}>
                        <Icon name="RotateCcw" className="mr-2" size={16} />
                        Очистить
                      </Button>
                    </div>

                    {result && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Результат:</h3>
                        <Card className="bg-muted/50 border-border/40">
                          <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground">{result}</p>
                          </CardContent>
                        </Card>
                        <div className="flex items-center space-x-2 mt-4">
                          <Button variant="outline" size="sm">
                            <Icon name="Copy" className="mr-2" size={16} />
                            Копировать
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Download" className="mr-2" size={16} />
                            Скачать
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Save" className="mr-2" size={16} />
                            Сохранить в проект
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Icon name="MousePointerClick" className="mx-auto text-muted-foreground mb-4" size={48} />
                    <h3 className="text-xl font-semibold mb-2">Выберите инструмент</h3>
                    <p className="text-muted-foreground">
                      Выберите один из инструментов слева, чтобы начать создание контента
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Projects */}
            <Card className="mt-8 bg-card/50 border-border/40">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Clock" className="text-secondary" size={24} />
                  <span>Недавние проекты</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                          <Icon name="FileText" className="text-white" size={16} />
                        </div>
                        <div>
                          <h4 className="font-medium">Проект {i}</h4>
                          <p className="text-sm text-muted-foreground">Создан 2 часа назад</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Icon name="ExternalLink" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;