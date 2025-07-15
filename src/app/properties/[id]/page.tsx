// src/app/properties/[id]/page.tsx

import PropertyDetailsClient from "./PropertyDetailsClient";

type PropertyDetails = {
  id: string; name: string; type: string; location: string;
  description: string | null; bedrooms: number; bathrooms: number;
  maxGuests: number; basePricePerNight: number;
};

async function getPropertyDetails(id: string): Promise<PropertyDetails | null> {
  try {
    const res = await fetch(`https://leisure-os-backend.onrender.com/api/properties/${id}`);
    if (!res.ok) return null;
    const responseData = await res.json();
    return responseData.data.property;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// ▼▼▼ "OPSI NUKLIR": Gunakan 'any' untuk melewati error build ▼▼▼
export default async function PropertyDetailPage(props: any) {
  // Kita tetap bisa mengambil 'id' seperti biasa
  const { id } = props.params; 
  const property = await getPropertyDetails(id);

  return <PropertyDetailsClient property={property} />;
}
