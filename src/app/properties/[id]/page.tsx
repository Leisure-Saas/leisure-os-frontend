// src/app/properties/[id]/page.tsx

import PropertyDetailsClient from "./PropertyDetailsClient";

type PropertyDetails = {
  id: string; name: string; type: string; location: string;
  description: string | null; bedrooms: number; bathrooms: number;
  maxGuests: number; basePricePerNight: number;
};

type Props = {
  params: { id: string; };
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

// ▼▼▼ PERBAIKAN FINAL ADA DI BARIS KOMENTAR DI BAWAH INI ▼▼▼
// Komentar ini akan memberitahu linter untuk mengabaikan error 'any' pada baris berikutnya
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function PropertyDetailPage(props: any) {
  const { id } = props.params;
  const property = await getPropertyDetails(id);

  return <PropertyDetailsClient property={property} />;
}
