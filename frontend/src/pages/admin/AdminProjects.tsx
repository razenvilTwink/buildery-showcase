
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/UI/button';
import { Card, CardContent } from '@/components/UI/card';
import { Plus, Trash2, Edit, Search } from 'lucide-react';
import { useProjectsStore } from '@/hooks/useProjectsStore';
import { Project, REGIONS } from '@/data/projects';
import { Input } from '@/components/UI/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/UI/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/UI/dialog';
import { Label } from '@/components/UI/label';

const AdminProjects = () => {
  const { projects, addProject, updateProject, deleteProject } = useProjectsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Состояние для формы
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    location: '',
    region: REGIONS.STAVROPOL, // Default to Stavropol region
    area: '',
    price: '',
    image: '',
  });
  
  // Фильтрация проектов по поисковому запросу
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Обработчики событий для формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegionChange = (value: string) => {
    setFormData(prev => ({ ...prev, region: value }));
  };
  
  // Обработчик добавления проекта
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка заполнения обязательных полей
    if (!formData.title || !formData.description || !formData.image) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    // Добавление проекта
    addProject(formData);
    
    // Сброс формы и закрытие диалога
    setFormData({
      title: '',
      description: '',
      location: '',
      region: REGIONS.STAVROPOL,
      area: '',
      price: '',
      image: '',
    });
    
    setIsAddDialogOpen(false);
    toast.success('Проект успешно добавлен');
  };
  
  // Обработчик редактирования проекта
  const handleEditProject = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProject) return;
    
    // Проверка заполнения обязательных полей
    if (!formData.title || !formData.description || !formData.image) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    // Обновление проекта
    updateProject(selectedProject.id, formData);
    
    // Закрытие диалога
    setIsEditDialogOpen(false);
    setSelectedProject(null);
    toast.success('Проект успешно обновлен');
  };
  
  // Обработчик удаления проекта
  const handleDeleteProject = () => {
    if (!selectedProject) return;
    
    deleteProject(selectedProject.id);
    setIsDeleteDialogOpen(false);
    setSelectedProject(null);
    toast.success('Проект успешно удален');
  };
  
  // Подготовка к редактированию проекта
  const handleEditClick = (project: Project) => {
    setSelectedProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      location: project.location,
      region: project.region,
      area: project.area,
      price: project.price,
      image: project.image,
    });
    setIsEditDialogOpen(true);
  };
  
  // Подготовка к удалению проекта
  const handleDeleteClick = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-serif font-semibold">Управление проектами</h1>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-construction-dark hover:bg-construction-dark/90"
        >
          <Plus size={16} className="mr-2" />
          Добавить проект
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Поиск проектов..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4">Изображение</th>
                  <th className="text-left p-4">Название</th>
                  <th className="text-left p-4 hidden md:table-cell">Расположение</th>
                  <th className="text-left p-4 hidden md:table-cell">Площадь</th>
                  <th className="text-left p-4 hidden lg:table-cell">Цена</th>
                  <th className="text-right p-4">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="border-b last:border-0">
                      <td className="p-4">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-16 h-12 object-cover rounded-md" 
                        />
                      </td>
                      <td className="p-4">
                        <div className="font-medium">{project.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {project.description}
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">{project.location}</td>
                      <td className="p-4 hidden md:table-cell">{project.area} м²</td>
                      <td className="p-4 hidden lg:table-cell">{project.price}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleEditClick(project)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteClick(project)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      Проекты не найдены
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Диалог добавления проекта */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleAddProject}>
            <DialogHeader>
              <DialogTitle>Добавить новый проект</DialogTitle>
              <DialogDescription>
                Заполните информацию о новом проекте
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Название <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Современный дом в скандинавском стиле"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">
                  Описание <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Минималистичный дизайн с открытой планировкой и панорамными окнами"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Расположение</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Подмосковье"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="area">Площадь (м²)</Label>
                  <Input
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="145"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="region">
                  Регион <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.region}
                  onValueChange={handleRegionChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите регион" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={REGIONS.STAVROPOL}>Ставропольский край</SelectItem>
                    <SelectItem value={REGIONS.MOSCOW}>Московская область</SelectItem>
                    <SelectItem value={REGIONS.LENINGRAD}>Ленинградская область</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Цена</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="5.8 млн ₽"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">
                  URL изображения <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Отмена
              </Button>
              <Button type="submit" className="bg-construction-dark hover:bg-construction-dark/90">
                Добавить проект
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Диалог редактирования проекта */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleEditProject}>
            <DialogHeader>
              <DialogTitle>Редактировать проект</DialogTitle>
              <DialogDescription>
                Измените информацию о проекте
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">
                  Название <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="edit-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">
                  Описание <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Расположение</Label>
                  <Input
                    id="edit-location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-area">Площадь (м²)</Label>
                  <Input
                    id="edit-area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-region">
                  Регион <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.region}
                  onValueChange={handleRegionChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите регион" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={REGIONS.STAVROPOL}>Ставропольский край</SelectItem>
                    <SelectItem value={REGIONS.MOSCOW}>Московская область</SelectItem>
                    <SelectItem value={REGIONS.LENINGRAD}>Ленинградская область</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-price">Цена</Label>
                <Input
                  id="edit-price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-image">
                  URL изображения <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="edit-image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Отмена
              </Button>
              <Button type="submit" className="bg-construction-dark hover:bg-construction-dark/90">
                Сохранить изменения
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Диалог удаления проекта */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить проект</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить проект "{selectedProject?.title}"?
              Это действие невозможно отменить.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteProject}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
