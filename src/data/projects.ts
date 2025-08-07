
export interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  city?: string;
  region: string;
  area: string;
  price: string;
  image: string;
}

export const REGIONS = {
  MOSCOW: 'Московская область',
  LENINGRAD: 'Ленинградская область',
  STAVROPOL: 'Ставропольский край',
};

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Современный дом в скандинавском стиле",
    description: "Минималистичный дизайн с открытой планировкой и панорамными окнами",
    location: "Подмосковье",
    city: "Одинцово",
    region: REGIONS.MOSCOW,
    area: "145",
    price: "5.8 млн ₽",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Семейный дом с террасой",
    description: "Просторный дом для большой семьи с уютной террасой и садом",
    location: "Ленинградская область",
    city: "Выборг",
    region: REGIONS.LENINGRAD,
    area: "210",
    price: "7.2 млн ₽",
    image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Компактный дачный дом",
    description: "Функциональный дом для сезонного проживания с продуманной планировкой",
    location: "Тверская область",
    city: "Конаково",
    region: "Тверская область",
    area: "85",
    price: "2.9 млн ₽",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Двухэтажный коттедж с гаражом",
    description: "Просторный коттедж с гаражом на 2 автомобиля и большим участком",
    location: "Московская область",
    city: "Королев",
    region: REGIONS.MOSCOW,
    area: "220",
    price: "8.5 млн ₽",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Дом в стиле барнхаус",
    description: "Современный дом в популярном стиле барнхаус с просторными помещениями",
    location: "Калужская область",
    city: "Калуга",
    region: "Калужская область",
    area: "180",
    price: "6.3 млн ₽",
    image: "https://images.unsplash.com/photo-1487452066049-a710f7296400?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Уютный дом с мансардой",
    description: "Компактный дом с мансардным этажом и эргономичной планировкой",
    location: "Владимирская область",
    city: "Владимир",
    region: "Владимирская область",
    area: "120",
    price: "4.7 млн ₽",
    image: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Загородный коттедж под ключ",
    description: "Двухэтажный загородный коттедж с панорамными окнами",
    location: "Ярославская область",
    city: "Ярославль",
    region: "Ярославская область",
    area: "195",
    price: "6.9 млн ₽",
    image: "https://images.unsplash.com/photo-1574739782594-db4ead022697?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "Экологичный дом из бруса",
    description: "Теплый и экологичный дом из клееного бруса с современным дизайном",
    location: "Московская область",
    city: "Дмитров",
    region: REGIONS.MOSCOW,
    area: "160",
    price: "5.5 млн ₽",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    title: "Минималистичный дом с плоской крышей",
    description: "Современный дом в стиле минимализм с эксплуатируемой плоской крышей",
    location: "Ленинградская область",
    city: "Гатчина",
    region: REGIONS.LENINGRAD,
    area: "170",
    price: "7.8 млн ₽",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    title: "Современная вилла в Ставрополе",
    description: "Роскошная вилла с бассейном и прекрасным видом на окрестности",
    location: "Ставропольский край",
    city: "Ставрополь",
    region: REGIONS.STAVROPOL,
    area: "280",
    price: "12.5 млн ₽",
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    title: "Коттедж в Пятигорске",
    description: "Уютный коттедж в живописном районе Пятигорска с видом на горы",
    location: "Ставропольский край",
    city: "Пятигорск",
    region: REGIONS.STAVROPOL,
    area: "190",
    price: "8.3 млн ₽",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    title: "Таунхаус в Кисловодске",
    description: "Современный таунхаус в курортном городе с близостью к минеральным источникам",
    location: "Ставропольский край",
    city: "Кисловодск",
    region: REGIONS.STAVROPOL,
    area: "150",
    price: "6.7 млн ₽",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
  }
];

// Получаем уникальные регионы из проектов
export const getUniqueRegions = (): string[] => {
  const regions = new Set<string>();
  projectsData.forEach(project => {
    regions.add(project.region);
  });
  return Array.from(regions);
};

// Получаем уникальные города для выбранного региона
export const getCitiesByRegion = (region: string): string[] => {
  const cities = new Set<string>();
  projectsData
    .filter(project => project.region === region && project.city)
    .forEach(project => {
      if (project.city) {
        cities.add(project.city);
      }
    });
  return Array.from(cities);
};
