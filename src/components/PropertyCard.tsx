// src/components/PropertyCard.tsx

// Kita definisikan tipe data untuk properti yang akan diterima komponen ini
type Property = {
  id: string;
  name: string;
  location: string;
  maxGuests: number;
  basePricePerNight: number;
};

// Komponen 'PropertyCard' menerima satu 'property' sebagai prop
export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      {/* Bagian Gambar */}
      <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">Gambar Properti</span>
      </div>

      {/* Bagian Detail Teks */}
      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-900 truncate">{property.name}</h3>
        <p className="text-md text-gray-500 mt-1">{property.location}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">{property.maxGuests} tamu</p>
          <p className="text-xl font-semibold text-gray-900">
            <span className="font-normal">Rp</span> {property.basePricePerNight.toLocaleString('id-ID')}
            <span className="text-sm font-normal text-gray-500">/malam</span>
          </p>
        </div>
      </div>
    </div>
  );
}
