import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Index = () => {
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
              <Link to="/tools" className="text-foreground hover:text-primary transition-colors">
                ИИ Инструменты
              </Link>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              Начать создавать
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Фабрика ИИ
              </span>
              <br />
              <span className="text-foreground">контента</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Создавайте уникальный контент с помощью передовых ИИ-моделей. 
              Генерируйте тексты, изображения и видео одним кликом.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold">
                <Icon name="Sparkles" className="mr-2" size={20} />
                Создать проект
              </Button>
              <Button variant="outline" size="lg" className="border-border hover:bg-muted px-8 py-4 text-lg">
                <Icon name="Play" className="mr-2" size={20} />
                Посмотреть демо
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-6 mb-20">
        <div className="container mx-auto">
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-3xl"></div>
            <img 
              src="/img/613f8de1-bf1c-4ad2-87df-bf1694d801ea.jpg" 
              alt="AI Factory"
              className="relative w-full rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Мощные возможности
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Все инструменты для создания контента в одном месте
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border/40 hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="FileText" className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Генерация текстов</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Создавайте статьи, посты, сценарии и любой другой текстовый контент с помощью ИИ
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40 hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="Image" className="text-background" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Создание изображений</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Генерируйте уникальные изображения, иллюстрации и артворки по текстовому описанию
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40 hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="Video" className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Видео контент</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Создавайте видеоролики, анимации и презентации с помощью ИИ-алгоритмов
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40 hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="Mic" className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Голосовой контент</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Преобразуйте текст в речь или создавайте подкасты с естественными голосами
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40 hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="Languages" className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Перевод контента</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Переводите контент на множество языков с сохранением контекста и стиля
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/40 hover:bg-card/80 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="Database" className="text-background" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Управление проектами</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Сохраняйте, организуйте и управляйте всеми вашими ИИ-проектами в одном месте
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-border/40">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Готовы начать создавать?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Присоединяйтесь к тысячам создателей контента, которые уже используют нашу платформу
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold">
                <Icon name="Rocket" className="mr-2" size={20} />
                Запустить фабрику
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Icon name="Cpu" className="text-primary" size={24} />
              <span className="text-xl font-bold">AI Factory</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 AI Factory. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;