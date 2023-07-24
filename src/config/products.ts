import { ProductType } from "~/types/models";

/**
 * Product data
 * @type {ProductType[]}
 * NOTE: This is a sample product data. This may be removed in the future.
 */
const products: ProductType[] = [
  {
    id: 1,
    name: "T-Shirt",
    thumbnail: 123456789,
    short_description: "A comfortable and stylish t-shirt.",
    description: "This t-shirt is made from 100% cotton and is available in a variety of colors and sizes. It's perfect for everyday wear or for a special occasion.",
    likes: 100,
    stock: 100,
    price: 20,
    date_stamp: "2023-07-24",
    variations: [
      {
        id: 1,
        product_id: 1,
        product_variation_types_id: 1,
        photos_id: 123456790,
        name: "Black"
      },
      {
        id: 2,
        product_id: 1,
        product_variation_types_id: 1,
        photos_id: 123456791,
        name: "White"
      },
      {
        id: 3,
        product_id: 1,
        product_variation_types_id: 1,
        photos_id: 123456792,
        name: "Red"
      }
    ]
  },
  {
    id: 2,
    name: "Hoodie",
    thumbnail: 123456793,
    short_description: "A warm and comfortable hoodie.",
    description: "This hoodie is made from 100% cotton and is available in a variety of colors and sizes. It's perfect for keeping you warm on a cold day.",
    likes: 50,
    stock: 50,
    price: 30,
    date_stamp: "2023-07-23",
    variations: [
      {
        id: 1,
        product_id: 2,
        product_variation_types_id: 1,
        photos_id: 123456794,
        name: "Black"
      },
      {
        id: 2,
        product_id: 2,
        product_variation_types_id: 1,
        photos_id: 123456795,
        name: "White"
      },
      {
        id: 3,
        product_id: 2,
        product_variation_types_id: 1,
        photos_id: 123456796,
        name: "Red"
      }
    ]
  },
  {
    id: 3,
    name: "Hat",
    thumbnail: 123456797,
    short_description: "A stylish and comfortable hat.",
    description: "This hat is made from 100% cotton and is available in a variety of colors and sizes. It's perfect for keeping the sun out of your eyes or for adding a touch of style to your outfit.",
    likes: 20,
    stock: 20,
    price: 15,
    date_stamp: "2023-07-22",
    variations: [
      {
        id: 1,
        product_id: 3,
        product_variation_types_id: 1,
        photos_id: 123456798,
        name: "Black"
      },
      {
        id: 2,
        product_id: 3,
        product_variation_types_id: 1,
        photos_id: 123456799,
        name: "White"
      },
      {
        id: 3,
        product_id: 3,
        product_variation_types_id: 1,
        photos_id: 123456800,
        name: "Red"
      }
    ]
  },
  {
    id: 4,
    name: "Mug",
    thumbnail: 123456801,
    short_description: "A stylish and functional mug.",
    description: "This mug is made from ceramic and is available in a variety of colors and designs. It's perfect for keeping your coffee or tea hot or for adding a touch of personality to your kitchen.",
    likes: 10,
    stock: 10,
    price: 10,
    date_stamp: "2023-07-21",
    variations: [
      {
        id: 1,
        product_id: 4,
        product_variation_types_id: 1,
        photos_id: 123456802,
        name: "Black"
      },
      {
        id: 2,
        product_id: 4,
        product_variation_types_id: 1,
        photos_id: 123456803,
        name: "White"
      },
      {
        id: 3,
        product_id: 4,
        product_variation_types_id: 1,
        photos_id: 123456804,
        name: "Red"
      }
    ]
  },
  {
    id: 5,
    name: "Sticker",
    thumbnail: 123456805,
    short_description: "A colorful and fun sticker.",
    description: "This sticker is made from vinyl and is available in a variety of designs. It's perfect for decorating your laptop, water bottle, or anything else you can think of.",
    likes: 5,
    stock: 5,
    price: 5,
    date_stamp: "2023-07-20",
    variations: [
      {
        id: 1,
        product_id: 5,
        product_variation_types_id: 1,
        photos_id: 123456806,
        name: "Cat"
      },
      {
        id: 2,
        product_id: 5,
        product_variation_types_id: 1,
        photos_id: 123456807,
        name: "Dog"
      },
      {
        id: 3,
        product_id: 5,
        product_variation_types_id: 1,
        photos_id: 123456808,
        name: "Heart"
      }
    ]
  },
  {
    id: 6,
    name: "Poster",
    thumbnail: 123456809,
    short_description: "A high-quality poster.",
    description: "This poster is made from high-quality paper and is available in a variety of sizes and designs. It's perfect for adding a touch of art to your home or office.",
    likes: 1,
    stock: 1,
    price: 20,
    date_stamp: "2023-07-19",
    variations: [
      {
        id: 1,
        product_id: 6,
        product_variation_types_id: 1,
        photos_id: 123456810,
        name: "Mona Lisa"
      },
      {
        id: 2,
        product_id: 6,
        product_variation_types_id: 1,
        photos_id: 123456811,
        name: "Starry Night"
      },
      {
        id: 3,
        product_id: 6,
        product_variation_types_id: 1,
        photos_id: 123456812,
        name: "The Scream"
      }
    ]
  },
  {
    id: 7,
    name: "Phone Case",
    thumbnail: 123456813,
    short_description: "A stylish and protective phone case.",
    description: "This phone case is made from durable materials and is available in a variety of colors and designs. It's perfect for protecting your phone from scratches and drops.",
    likes: 0,
    stock: 0,
    price: 15,
    date_stamp: "2023-07-18",
    variations: [
      {
        id: 1,
        product_id: 7,
        product_variation_types_id: 1,
        photos_id: 123456814,
        name: "Black"
      },
      {
        id: 2,
        product_id: 7,
        product_variation_types_id: 1,
        photos_id: 123456815,
        name: "White"
      },
      {
        id: 3,
        product_id: 7,
        product_variation_types_id: 1,
        photos_id: 123456816,
        name: "Clear"
      }
    ]
  },
  {
    id: 8,
    name: "Keychain",
    thumbnail: 123456817,
    short_description: "A stylish and functional keychain.",
    description: "This keychain is made from metal and is available in a variety of colors and designs. It's perfect for keeping your keys organized and for adding a touch of personality to your EDC.",
    likes: 0,
    stock: 0,
    price: 10,
    date_stamp: "2023-07-17",
    variations: [
      {
        id: 1,
        product_id: 8,
        product_variation_types_id: 1,
        photos_id: 123456818,
        name: "Metal"
      },
      {
        id: 2,
        product_id: 8,
        product_variation_types_id: 1,
        photos_id: 123456819,
        name: "Wood"
      },
      {
        id: 3,
        product_id: 8,
        product_variation_types_id: 1,
        photos_id: 123456820,
        name: "Plastic"
      }
    ]
  }
];

export default products;