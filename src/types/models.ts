/**
 * Product type data
 */
export type ProductType = {
  id: number;
  name: string;
  thumbnail: number;
  short_description: string;
  description: string;
  likes: number;
  stock: number;
  price: number;
  date_stamp?: string;
  variations: ProductVariation[];
}

/**
 * Product Variation data
 */
export type ProductVariation = {
  id: number;
  product_id: number;
  product_variation_types_id: number;
  photos_id: number;
  name: string;
}
