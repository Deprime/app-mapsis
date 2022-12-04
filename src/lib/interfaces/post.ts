import type ICategory from "./category";

export default interface IPost {
  id: number|null,
  category: ICategory|null,
  category_id: number|null,
  title: string,
  description: string,
  price: string,
  address: string,
  suggested_address: string,
  coords: number[],
  created_at?: string|null,
  updated_at?: string|null,
}
