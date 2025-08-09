
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/UI/card';
import { Building2, Users, Package, Eye } from 'lucide-react';
import { projectsData } from '@/data/projects';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-semibold">Дашборд</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Всего проектов
            </CardTitle>
            <Package size={16} className="text-construction-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsData.length}</div>
            <p className="text-xs text-muted-foreground">
              Опубликовано на сайте
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Просмотры
            </CardTitle>
            <Eye size={16} className="text-construction-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              За последние 30 дней
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Заявки
            </CardTitle>
            <Users size={16} className="text-construction-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Новых обращений
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Типов домов
            </CardTitle>
            <Building2 size={16} className="text-construction-medium" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              Доступных проектов домов
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Последние заявки</CardTitle>
            <CardDescription>
              Недавние обращения клиентов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="font-medium">Андрей Смирнов</p>
                <p className="text-sm text-muted-foreground">
                  Интересует проект "Современный дом в скандинавском стиле"
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Сегодня, 10:25
                </p>
              </div>
              <div className="border-b pb-4">
                <p className="font-medium">Ирина Кузнецова</p>
                <p className="text-sm text-muted-foreground">
                  Хочу получить консультацию по дому с террасой
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Вчера, 15:42
                </p>
              </div>
              <div>
                <p className="font-medium">Дмитрий Новиков</p>
                <p className="text-sm text-muted-foreground">
                  Вопрос по срокам строительства и стоимости
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  2 дня назад, 09:17
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Популярные проекты</CardTitle>
            <CardDescription>
              Наиболее просматриваемые дома
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectsData.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center gap-4 border-b pb-4">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-16 h-16 object-cover rounded-md" 
                  />
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.location} • {project.area} м²
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.floor(Math.random() * 500) + 100} просмотров
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
