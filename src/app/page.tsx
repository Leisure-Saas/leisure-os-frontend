// src/app/page.tsx

// 1. Kita definisikan "bentuk" data properti di sini
type Property = {
  id: string;
  name: string;
  location: string;
  maxGuests: number;
  basePricePerNight: number;
};

// Fungsi untuk mengambil data properti dari backend kita
async function getProperties(): Promise<Property[]> { // Memberi tahu fungsi ini akan mengembalikan array of Property
  try {
    const res = await fetch('https://leisure-os-backend.onrender.com/api/properties', {
      next: { revalidate: 10 }
    });

    if (!res.ok) {
      throw new Error('Gagal mengambil data properti');
    }

    const data = await res.json();
    // Respons dari backend kita adalah { properties: [...], ... }, jadi kita ambil array-nya
    return data.properties || []; 

  } catch (error) {
    console.error(error);
    return [];
  }
}

// Ini adalah komponen halaman utama kita
export default async function HomePage() {
  const properties = await getProperties();

  return (
    <main className="bg-gray-100 text-gray-800">
      {/* Bagian Hero Section */}
      <section className="text-center py-20 bg-gray-900 text-white">
        <h1 className="text-5xl font-bold mb-4">Find Your Next Luxurious Escape</h1>
        <p className="text-xl text-gray-300 mb-8">Unforgettable properties for the discerning traveler.</p>
      </section>

      {/* Bagian Daftar Properti */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>

        {properties.length === 0 && (
          <p className="text-center">Saat ini tidak ada properti yang tersedia.</p>
        )}

        {/* Grid untuk menampilkan semua card properti */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* 2. Kita gunakan tipe 'Property' di sini, bukan 'any' */}
          {properties.map((property: Property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-64 bg-gray-300">
                {/* Placeholder untuk gambar */}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{property.name}</h3>
                <p className="text-gray-600 mb-4">{property.location}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    Rp {property.basePricePerNight.toLocaleString('id-ID')} / malam
                  </span>
                  <span className="text-sm text-gray-500">
                    {property.maxGuests} tamu
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
