// src/app/properties/[id]/PropertyDetailsClient.tsx

'use client'; // <-- Tandai ini sebagai Client Component

// Definisikan tipe data untuk properti
type PropertyDetails = {
  id: string; name: string; type: string; location: string;
  description: string | null; bedrooms: number; bathrooms: number;
  maxGuests: number; basePricePerNight: number;
};

// Komponen ini menerima 'property' sebagai prop dan hanya menampilkannya
export default function PropertyDetailsClient({ property }: { property: PropertyDetails | null }) {

  if (!property) {
    return <div className="text-center py-20">Properti tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="w-full h-96 bg-gray-200 rounded-lg mb-8"></div>
      <h1 className="text-4xl font-bold text-gray-900">{property.name}</h1>
      <p className="text-lg text-gray-500 mt-2">{property.location}</p>
      <hr className="my-8" />
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Tentang Properti Ini</h2>
        <p>{property.description || 'Tidak ada deskripsi.'}</p>
      </div>
      <hr className="my-8" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div><span className="text-2xl">🛏️</span><p>{property.bedrooms} Kamar Tidur</p></div>
        <div><span className="text-2xl">🛁</span><p>{property.bathrooms} Kamar Mandi</p></div>
        <div><span className="text-2xl">👥</span><p>{property.maxGuests} Tamu</p></div>
      </div>
      <div className="mt-12 p-6 border rounded-lg">
        <h3 className="text-2xl font-bold">Rp {property.basePricePerNight.toLocaleString('id-ID')} / malam</h3>
      </div>
    </div>
  );
}
