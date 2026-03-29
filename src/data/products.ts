import productImg1 from "@/assets/products/1.jpg";
import productImg2 from "@/assets/products/2.jpg";
import productImg3 from "@/assets/products/3.jpg";
import productImg4 from "@/assets/products/4.jpg";
import productImg5 from "@/assets/products/5.jpg";
import productImg6 from "@/assets/products/6.png";

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  category: string;
  image: string;
  details: string;
}

export const products: Product[] = [
  {
    id: "hazelnut-dome",
    name: "Hazelnut Dome",
    nameAr: "قبة البندق",
    description: "Dark chocolate dome filled with roasted hazelnut praline.",
    category: "Pralines",
    image: productImg1,
    details: "A silky dome of premium dark chocolate enveloping a heart of roasted hazelnut praline. Crafted with 100% pure cocoa butter for an unmatched melt-in-your-mouth experience.",
  },
  {
    id: "gold-collection",
    name: "Gold Collection Box",
    nameAr: "مجموعة الذهب",
    description: "An exquisite assortment of our finest pralines in a luxury gift box.",
    category: "Gift Boxes",
    image: productImg2,
    details: "Our signature gold box features a curated selection of 24 handcrafted pralines, each a masterpiece of flavor and texture. Finished with a satin ribbon and presented in a keepsake box.",
  },
  {
    id: "signature-assortment",
    name: "Signature Assortment",
    nameAr: "التشكيلة المميزة",
    description: "A curated selection of our most beloved chocolate creations.",
    category: "Assortments",
    image: productImg3,
    details: "Our signature assortment brings together the finest flavors from the Basem Ghrawi collection. From gold-dusted truffles to raspberry ganache, every piece tells a story of artisan craftsmanship.",
  },
  {
    id: "dark-truffle",
    name: "Dark Truffle Collection",
    nameAr: "مجموعة الترافل الداكن",
    description: "Intense dark chocolate truffles with a velvety ganache center.",
    category: "Pralines",
    image: productImg4,
    details: "For the true dark chocolate connoisseur. Each truffle is hand-rolled and dusted with premium cocoa powder, revealing a center of rich, silky ganache.",
  },
  {
    id: "premium-box",
    name: "Premium Gift Box",
    nameAr: "علبة هدايا فاخرة",
    description: "Elegant packaging with a selection of milk and dark pralines.",
    category: "Gift Boxes",
    image: productImg5,
    details: "The perfect gift for any occasion. Our premium box features a harmonious blend of milk and dark chocolate pralines, each crafted with 100% cocoa butter.",
  },
  {
    id: "classic-assortment",
    name: "Classic Assortment",
    nameAr: "التشكيلة الكلاسيكية",
    description: "Timeless flavors in our classic chocolate assortment.",
    category: "Assortments",
    image: productImg6,
    details: "A tribute to tradition. Our classic assortment features beloved recipes passed down through generations, made with the finest ingredients and pure cocoa butter.",
  },
];

export const categories = ["All", "Pralines", "Gift Boxes", "Assortments"];
