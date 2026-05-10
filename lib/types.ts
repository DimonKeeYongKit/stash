export type Translatable = string | { en: string; zh: string };

export type Category = {
  id: string;
  name: Translatable;
  icon?: string;
};

export type Resource = {
  id: string;
  title: Translatable;
  url: string;
  category: string;
  tags?: string[];
  description?: Translatable;
  password?: string;
};

export type ResourceData = {
  categories: Category[];
  resources: Resource[];
};
