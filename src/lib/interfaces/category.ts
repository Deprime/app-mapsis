export default interface ICategory {
  id: number,
  parent_id: number,
  slug: string,
  order: number,
  is_active: boolean,
  mui_key: string,
  title_ru: string,
  title_en: string,
}
