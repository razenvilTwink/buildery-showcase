
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
    title: "Современный дом",
    description: "Минималистичный дизайн с открытой планировкой",
    location: "Ставропольский Край",
    city: "Ставрополь",
    region: REGIONS.STAVROPOL,
    area: "123.20",
    price: "8.0 млн ₽",
    image: "/images/photo_2025-08-07_17-33-08.jpg"
  },
  {
    id: 2,
    title: "Двухэтажный жилой дом",
    description: "Просторный дом для большой семьи с садом",
    location: "Ставропольский Край",
    city: "Ставрополь",
    region: REGIONS.STAVROPOL,
    area: "396",
    price: "7.2 млн ₽",
    image: "/images/dom2.jpg"
  },
  {
    id: 3,
    title: "Компактный дачный дом",
    description: "Функциональный дом для сезонного проживания с продуманной планировкой",
    location: "Ставропольский Край, село Татарка ",
    city: "Ставрополь",
    region: REGIONS.STAVROPOL,
    area: "85",
    price: "3.0 млн ₽",
    image: "/images/dom3.jpg"
  },
  {
    id: 4,
    title: "Двухэтажный коттедж с гаражом",
    description: "Просторный коттедж с гаражом на 2 автомобиля и большим участком",
    location: "Ставропольский Край",
    city: "Михайловск",
    region: REGIONS.STAVROPOL,
    area: "220",
    price: "5.0 млн ₽",
    image: "/images/dom4.jpg"
  },
  {
    id: 5,
    title: "Дом в стиле барнхаус",
    description: "Современный дом в популярном стиле барнхаус с просторными помещениями",
    location: "Ставропольский Край",
    city: "Ставрополь",
    region: REGIONS.STAVROPOL ,
    area: "140",
    price: "6.3 млн ₽",
    image: "/images/dom5.jpg"
  },
  {
    id: 6,
    title: "Проект двух домов",
    description: "Компактный дом с мансардным этажом и эргономичной планировкой",
    location: "Ставропольский Край",
    city: "Село Татарка",
    region: REGIONS.STAVROPOL ,
    area: "140",
    price: "3.3 млн ₽",
    image: "/images/dom62.jpg"
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
