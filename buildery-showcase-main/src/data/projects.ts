
export interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  area: string;
  price: string;
  image: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Современный дом в скандинавском стиле",
    description: "Минималистичный дизайн с открытой планировкой и панорамными окнами",
    location: "Подмосковье",
    area: "145",
    price: "5.8 млн ₽",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Семейный дом с террасой",
    description: "Просторный дом для большой семьи с уютной террасой и садом",
    location: "Ленинградская область",
    area: "210",
    price: "7.2 млн ₽",
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Компактный дачный дом",
    description: "Функциональный дом для сезонного проживания с продуманной планировкой",
    location: "Тверская область",
    area: "85",
    price: "2.9 млн ₽",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Двухэтажный коттедж с гаражом",
    description: "Просторный коттедж с гаражом на 2 автомобиля и большим участком",
    location: "Московская область",
    area: "220",
    price: "8.5 млн ₽",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Дом в стиле барнхаус",
    description: "Современный дом в популярном стиле барнхаус с просторными помещениями",
    location: "Калужская область",
    area: "180",
    price: "6.3 млн ₽",
    image: "https://images.unsplash.com/photo-1487452066049-a710f7296400?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Уютный дом с мансардой",
    description: "Компактный дом с мансардным этажом и эргономичной планировкой",
    location: "Владимирская область",
    area: "120",
    price: "4.7 млн ₽",
    image: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Загородный коттедж под ключ",
    description: "Двухэтажный загородный коттедж с панорамными окнами",
    location: "Ярославская область",
    area: "195",
    price: "6.9 млн ₽",
    image: "https://images.unsplash.com/photo-1574739782594-db4ead022697?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "Экологичный дом из бруса",
    description: "Теплый и экологичный дом из клееного бруса с современным дизайном",
    location: "Московская область",
    area: "160",
    price: "5.5 млн ₽",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    title: "Минималистичный дом с плоской крышей",
    description: "Современный дом в стиле минимализм с эксплуатируемой плоской крышей",
    location: "Ленинградская область",
    area: "170",
    price: "7.8 млн ₽",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
  }
];
