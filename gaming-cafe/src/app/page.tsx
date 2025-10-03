'use client';

import { useState } from 'react';

interface Computer {
  id: number;
  name: string;
  specs: string;
  pricePerHour: number;
  available: boolean;
}

export default function Home() {
  const [computers] = useState<Computer[]>([
    { id: 1, name: 'PC-001', specs: 'RTX 4070, i7-13700K, 32GB RAM', pricePerHour: 60, available: true },
    { id: 2, name: 'PC-002', specs: 'RTX 4060, i5-13600K, 16GB RAM', pricePerHour: 50, available: true },
    { id: 3, name: 'PC-003', specs: 'RTX 4070, i7-13700K, 32GB RAM', pricePerHour: 60, available: false },
    { id: 4, name: 'PC-004', specs: 'RTX 4080, i9-13900K, 64GB RAM', pricePerHour: 80, available: true },
    { id: 5, name: 'PC-005', specs: 'RTX 4060, i5-13600K, 16GB RAM', pricePerHour: 50, available: true },
    { id: 6, name: 'PC-006', specs: 'RTX 4070, i7-13700K, 32GB RAM', pricePerHour: 60, available: false },
  ]);

  const [selectedComputer, setSelectedComputer] = useState<number | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [hours, setHours] = useState(1);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedComputer && bookingDate && bookingTime) {
      const computer = computers.find(c => c.id === selectedComputer);
      alert(`จองเรียบร้อย!\n${computer?.name}\nวันที่: ${bookingDate}\nเวลา: ${bookingTime}\nระยะเวลา: ${hours} ชั่วโมง\nราคา: ${computer ? computer.pricePerHour * hours : 0} บาท`);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            🎮 จองคอมเพื่อเล่นเกม
          </h1>
          <p className="text-center text-gray-400 mt-2">Gaming Cafe Reservation System</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Computer List */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-6">เครื่องคอมพิวเตอร์</h2>
            <div className="space-y-4">
              {computers.map((computer) => (
                <div
                  key={computer.id}
                  onClick={() => computer.available && setSelectedComputer(computer.id)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedComputer === computer.id
                      ? 'border-green-500 bg-zinc-800'
                      : computer.available
                      ? 'border-zinc-700 bg-zinc-800 hover:border-zinc-600'
                      : 'border-zinc-800 bg-zinc-900 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">{computer.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{computer.specs}</p>
                      <p className="text-lg font-semibold text-green-400 mt-2">
                        {computer.pricePerHour} บาท/ชั่วโมง
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        computer.available
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {computer.available ? 'ว่าง' : 'ไม่ว่าง'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-6">ฟอร์มจอง</h2>
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  เลือกเครื่อง
                </label>
                <select
                  value={selectedComputer || ''}
                  onChange={(e) => setSelectedComputer(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-green-500 focus:outline-none"
                  required
                >
                  <option value="">-- เลือกเครื่องคอมพิวเตอร์ --</option>
                  {computers.filter(c => c.available).map((computer) => (
                    <option key={computer.id} value={computer.id} className="bg-zinc-800">
                      {computer.name} - {computer.pricePerHour} บาท/ชม.
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  วันที่
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-green-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  เวลา
                </label>
                <input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-green-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  ระยะเวลา (ชั่วโมง)
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-green-500 focus:outline-none"
                  required
                />
              </div>

              {selectedComputer && (
                <div className="bg-zinc-800 border border-green-500 rounded-lg p-4">
                  <p className="text-white font-semibold">ราคารวม:</p>
                  <p className="text-3xl font-bold text-green-400">
                    {computers.find(c => c.id === selectedComputer)!.pricePerHour * hours} บาท
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-all"
              >
                ยืนยันการจอง
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="mt-12 py-6 text-center text-gray-500 border-t border-zinc-800">
        <p>© 2025 Gaming Cafe - ระบบจองคอมเพื่อเล่นเกม</p>
      </footer>
    </div>
  );
}
