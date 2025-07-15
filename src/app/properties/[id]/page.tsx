import PropertyDetailsClient from "./PropertyDetailsClient";

// Tipe data yang kita gunakan
type PropertyDetails = {
  id: string;
  name: string;
  type: string;
  location: string;
  description: string | null;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  basePricePerNight: number;
};
type Props = { 
  params: { 
    id: string; 
  }; 
};
type ApiResponse = { 
  data: { 
    property: PropertyDetails; 
  }; 
};

// Fungsi generateStaticParams sudah dihapus karena kita menggunakan mode SSR

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

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = params;
  const property = await getPropertyDetails(id);

  return <PropertyDetailsClient property={property} />;
}
