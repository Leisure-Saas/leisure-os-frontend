// src/app/properties/[id]/page.tsx

import PropertyDetailsClient from "./PropertyDetailsClient";

// Tipe data yang kita gunakan
type Property = { id: string; name: string; };
type PropertyDetails = {
  id: string; name: string; type: string; location: string;
  description: string | null; bedrooms: number; bathrooms: number;
  maxGuests: number; basePricePerNight: number;
};
type Props = { params: { id: string; }; };
type ApiResponse = { data: { property: PropertyDetails; }; };
type ApiListResponse = { properties: Property[]; };

// ▼▼▼ FUNGSI BARU UNTUK MEMBERI DAFTAR ID KE NEXT.JS ▼▼▼
export async function generateStaticParams() {
  try {
    // Ambil semua properti untuk mendapatkan ID-nya
    const res = await fetch('https://leisure-os-backend.onrender.com/api/properties');
    const data: ApiListResponse = await res.json();
    const properties = data.properties || [];

    // Kembalikan dalam format yang dimengerti Next.js: [{ id: '1' }, { id: '2' }]
    return properties.map((property) => ({
      id: property.id,
    }));
  } catch (error) {
    console.error("Failed to fetch properties for static params", error);
    return [];
  }
}

async function getPropertyDetails(id: string): Promise<PropertyDetails | null> {
  try {
    const res = await fetch(`https://leisure-os-backend.onrender.com/api/properties/${id}`);
    if (!res.ok) return null;
    const responseData: ApiResponse = await res.json();
    return responseData.data.property;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Menggunakan kembali tipe 'Props' yang benar
export default async function PropertyDetailPage({ params }: Props) {
  const { id } = params;
  const property = await getPropertyDetails(id);

  return <PropertyDetailsClient property={property} />;
}
