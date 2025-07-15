// src/app/page.tsx

// Fungsi untuk mengambil data properti dari backend kita
async function getProperties() {
  try {
    // Kita memanggil alamat API backend kita yang sudah live di Render
    const res = await fetch('https://leisure-os-backend.onrender.com/api/properties', {
      next: { revalidate: 10 } // Cache data selama 10 detik
    });

    if (!res.ok) {
      throw new Error('Gagal mengambil data properti');
    }
    
    const data = await res.json();
    return data.properties; // Kita ambil array 'properties' dari respons

  } catch (error) {
    console.error(error);
    return []; // Kembalikan array kosong jika terjadi error
  }
}

// Ini adalah komponen halaman utama kita
export default async function HomePage() {
  const properties = await getProperties();

  return (
    <main className="bg-gray-100 text-gray-800">
      {/* Bagian Hero Section (sesuai desain Framer) */}
      <section className="text-center py-20 bg-gray-900 text-white">
        <h1 className="text-5xl font-bold mb-4">Find Your Next Luxurious Escape</h1>
        <p className="text-xl text-gray-300 mb-8">Unforgettable properties for the discerning traveler.</p>
        {/* Di sini nanti kita akan letakkan komponen search bar */}
      </section>

      {/* Bagian Daftar Properti */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
        
        {/* Tampilkan pesan jika tidak ada properti */}
        {properties.length === 0 && (
          <p className="text-center">Saat ini tidak ada properti yang tersedia.</p>
        )}

        {/* Grid untuk menampilkan semua card properti */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {properties.map((property: any) => (
            // Ini adalah 'card' untuk setiap properti
            // Nanti kita bisa buat ini menjadi komponen terpisah
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-64 bg-gray-300">
                {/* Nanti di sini kita akan tampilkan gambar */}
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
