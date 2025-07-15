// src/app/properties/[id]/page.tsx

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

// Fungsi ini mengambil detail SATU properti dari backend
async function getPropertyDetails(id: string): Promise<PropertyDetails | null> {
  try {
    const res = await fetch(`https://leisure-os-backend.onrender.com/api/properties/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.data.property; // Sesuaikan dengan struktur respons Anda
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Komponen Halaman Detail
export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await getPropertyDetails(params.id);

  if (!property) {
    return <div className="text-center py-20">Properti tidak ditemukan.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Gambar Utama */}
      <div className="w-full h-96 bg-gray-200 rounded-lg mb-8"></div>
      
      {/* Judul dan Lokasi */}
      <h1 className="text-4xl font-bold text-gray-900">{property.name}</h1>
      <p className="text-lg text-gray-500 mt-2">{property.location}</p>

      <hr className="my-8" />

      {/* Deskripsi */}
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Tentang Properti Ini</h2>
        <p>{property.description || 'Tidak ada deskripsi.'}</p>
      </div>
      
      <hr className="my-8" />

      {/* Detail Fasilitas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <span className="text-2xl">🛏️</span>
          <p>{property.bedrooms} Kamar Tidur</p>
        </div>
        <div>
          <span className="text-2xl">🛁</span>
          <p>{property.bathrooms} Kamar Mandi</p>
        </div>
        <div>
          <span className="text-2xl">👥</span>
          <p>{property.maxGuests} Tamu</p>
        </div>
      </div>

      {/* Booking & Harga (TODO di langkah selanjutnya) */}
      <div className="mt-12 p-6 border rounded-lg">
        <h3 className="text-2xl font-bold">Rp {property.basePricePerNight.toLocaleString('id-ID')} / malam</h3>
        {/* Di sini nanti akan ada form untuk booking */}
      </div>
    </div>
  );
}
