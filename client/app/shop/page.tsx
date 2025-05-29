'use client'
import { useState } from "react";
import { data_products } from "../assets/data";
import Image from "next/image";
import Link from "next/link";

export default function Shop() {
  const [hoveredId, setHoveredId] = useState('');

  return (
    <div className="p-4">
      <h1 className="bg-red-500 w-fit mx-auto">
        Shop
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start mt-10">
        {data_products.map(item => (
          <Link href={`/productDetails/${item.id}`} key={item.id}>
            <Image src={item.image} alt={item.title} width={400} height={400} className="w-full h-full object-cover" />
            <h1
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId('')}
              style={{ textDecoration: hoveredId === item.id ? 'underline' : 'none' }}
            >
              {item.title}
            </h1>
            <h1 style={{ fontSize: 25 }}>{item.price}$</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}