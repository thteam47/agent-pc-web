export interface Category {
  domain_id: string;
  name: string;
  category_id: string;
  position: number;
}

export interface CategoryRecommend {
  domain_id: string;
  name: string;
  category_id: string;
  position: number;
  process_data: number;
}
