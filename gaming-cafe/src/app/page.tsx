'use client';

import { useState } from 'react';

interface Computer {
  id: number;
  name: string;
  specs: string;
  pricePerHour: number;
  available: boolean;
}

interface Game {
  id: number;
  name: string;
  nameTH: string;
  genre: string;
  genreTH: string;
  playerCount: string;
  trending: boolean;
}

interface FriendActivity {
  id: number;
  friendName: string;
  currentGame: string;
  currentGameTH: string;
  computerNumber: string;
  startTime: string;
}

export default function Home() {
  // Mock data for popular games
  const [popularGames] = useState<Game[]>([
    {
      id: 1,
      name: 'Valorant',
      nameTH: 'วาโลแรนท์',
      genre: 'FPS',
      genreTH: 'ยิงมุมมองบุคคลที่หนึ่ง',
      playerCount: '5v5',
      trending: true
    },
    {
      id: 2,
      name: 'League of Legends',
      nameTH: 'ลีกออฟเลเจนด์',
      genre: 'MOBA',
      genreTH: 'ต่อสู้ออนไลน์',
      playerCount: '5v5',
      trending: true
    },
    {
      id: 3,
      name: 'PUBG',
      nameTH: 'พับจี',
      genre: 'Battle Royale',
      genreTH: 'แบทเทิลรอยัล',
      playerCount: '1-4',
      trending: true
    },
  ]);

  // Mock data for friend activity
  const [friendActivity] = useState<FriendActivity[]>([
    {
      id: 1,
      friendName: 'สมชาย',
      currentGame: 'Valorant',
      currentGameTH: 'วาโลแรนท์',
      computerNumber: 'PC-001',
      startTime: '14:30'
    },
    {
      id: 2,
      friendName: 'สมหญิง',
      currentGame: 'League of Legends',
      currentGameTH: 'ลีกออฟเลเจนด์',
      computerNumber: 'PC-004',
      startTime: '15:00'
    },
    {
      id: 3,
      friendName: 'ประยุทธ์',
      currentGame: 'PUBG',
      currentGameTH: 'พับจี',
      computerNumber: 'PC-002',
      startTime: '14:45'
    },
  ]);

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
    <div className="min-h-screen bg-gradient-to-br from-orange-950 via-black to-orange-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-900 to-orange-800 border-b border-orange-700">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            🎮 จองคอมเพื่อเล่นเกม
          </h1>
          <p className="text-center text-orange-200 mt-2">Gaming Cafe Reservation System</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Popular Games Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">🔥 เกมยอดนิยม</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularGames.map((game) => (
              <div
                key={game.id}
                className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-4 border border-orange-800 hover:border-orange-600 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white">{game.nameTH}</h3>
                  {game.trending && (
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full animate-pulse">
                      HOT
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-1">{game.name}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="px-2 py-1 bg-orange-900/50 text-orange-300 text-xs rounded">
                    {game.genreTH}
                  </span>
                  <span className="text-xs text-gray-400">{game.playerCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Friend Activity Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">👥 เพื่อนที่กำลังเล่น</h2>
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl p-4 border border-orange-800">
            <div className="space-y-3">
              {friendActivity.map((friend) => (
                <div
                  key={friend.id}
                  className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                      {friend.friendName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{friend.friendName}</p>
                      <p className="text-sm text-gray-400">{friend.currentGameTH}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-400 font-semibold text-sm">{friend.computerNumber}</p>
                    <p className="text-xs text-gray-400">เริ่ม {friend.startTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Computer List */}
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-800">
            <h2 className="text-2xl font-bold text-orange-400 mb-6">เครื่องคอมพิวเตอร์</h2>
            <div className="space-y-4">
              {computers.map((computer) => (
                <div
                  key={computer.id}
                  onClick={() => computer.available && setSelectedComputer(computer.id)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedComputer === computer.id
                      ? 'border-orange-500 bg-orange-900/30'
                      : computer.available
                      ? 'border-orange-800/50 bg-zinc-800 hover:border-orange-600'
                      : 'border-zinc-800 bg-zinc-900 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white">{computer.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{computer.specs}</p>
                      <p className="text-lg font-semibold text-orange-400 mt-2">
                        {computer.pricePerHour} บาท/ชั่วโมง
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        computer.available
                          ? 'bg-orange-500 text-white'
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
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-800">
            <h2 className="text-2xl font-bold text-orange-400 mb-6">ฟอร์มจอง</h2>
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  เลือกเครื่อง
                </label>
                <select
                  value={selectedComputer || ''}
                  onChange={(e) => setSelectedComputer(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-orange-700 focus:border-orange-500 focus:outline-none"
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
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-orange-700 focus:border-orange-500 focus:outline-none"
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
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-orange-700 focus:border-orange-500 focus:outline-none"
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
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white border border-orange-700 focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              {selectedComputer && (
                <div className="bg-orange-900/30 border border-orange-500 rounded-lg p-4">
                  <p className="text-white font-semibold">ราคารวม:</p>
                  <p className="text-3xl font-bold text-orange-400">
                    {computers.find(c => c.id === selectedComputer)!.pricePerHour * hours} บาท
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-4 rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all"
              >
                ยืนยันการจอง
              </button>
            </form>
          </div>
        </div>
      </main>

      <footer className="mt-12 py-6 text-center text-orange-300 border-t border-orange-900">
        <p>© 2025 Gaming Cafe - ระบบจองคอมเพื่อเล่นเกม</p>
      </footer>
    </div>
  );
}
