// src/app/properties/[id]/page.tsx

import PropertyDetailsClient from "./PropertyDetailsClient";

// Mendefinisikan tipe data untuk properti
type PropertyDetails = {
  id: string; name: string; type: string; location: string;
  description: string | null; bedrooms: number; bathrooms: number;
  maxGuests: number; basePricePerNight: number;
};

// ▼▼▼ PERBAIKAN DI SINI ▼▼▼
// Mendefinisikan tipe untuk keseluruhan respons dari API kita
type ApiResponse = {
  status: string;
  data: {
    property: PropertyDetails;
  };
};

// Fungsi untuk mengambil data
async function getPropertyDetails(id: string): Promise<PropertyDetails | null> {
  try {
    const res = await fetch(`https://leisure-os-backend.onrender.com/api/properties/${id}`);
    if (!res.ok) return null;
    
    // Memberitahu TypeScript bahwa hasil json() akan memiliki bentuk 'ApiResponse'
    const responseData: ApiResponse = await res.json();
    return responseData.data.property;

  } catch (error) {
    console.error(error);
    return null;
  }
}

// Komponen Halaman (Server Component)
export default async function PropertyDetailPage(props: any) {
  const { id } = props.params;
  const property = await getPropertyDetails(id);

  // Mengirim data ke Client Component untuk ditampilkan
  return <PropertyDetailsClient property={property} />;
}
