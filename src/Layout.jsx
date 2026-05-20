import { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { FaDiscord, FaYoutube, FaInstagram } from 'react-icons/fa'

export const Layout = () => {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const designWidth = 1400
      setScale(width < designWidth ? width / designWidth : 1)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen h-full relative bg-cover bg-center overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-10 header z-50" />
      <div className="sakarya2-overlay flex items-center justify-center" aria-hidden="true">
        <img src="/logo.png" alt="SAKARYA2 Logo" className="sakarya2-logo" />
      </div>

      <div
        className="flex justify-center transition-all duration-300 ease-out pb-48"
        style={{
          transform: `scale(${scale - 0.1})`,
          transformOrigin: 'top center',
          width: '1400px',
          position: 'absolute',
          left: '50%',
          marginLeft: '-700px',
          minHeight: '100vh'
        }}
      >
        <div className="flex mt-[50vh] w-187.5 mx-auto border-x border-amber-900/30 relative shadow-2xl min-h-200 bg-black/40">
          <div className="left-side absolute -left-60 top-0 w-60">
            <div className="w-full mb-4">
              <h2 className="text-amber-100 text-lg font-bold uppercase text-center mb-4 tracking-widest border-b border-amber-900/20 pb-2">En İyi Oyuncular</h2>
              <div className="space-y-2">
                {[
                  { name: 'Revenge', level: 120, rank: 1 },
                  { name: 'Alpha', level: 119, rank: 2 },
                  { name: 'Warrior', level: 118, rank: 3 },
                  { name: 'Legend', level: 115, rank: 4 },
                  { name: 'Shadow', level: 112, rank: 5 }
                ].map((player) => (
                  <div key={player.name} className="flex justify-between items-center px-2 py-1 bg-black/20 border border-amber-900/10 hover:border-amber-700/30 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ${player.rank <= 3 ? 'bg-amber-600 text-black' : 'bg-zinc-800 text-amber-100/50'}`}>
                        {player.rank}
                      </span>
                      <span className="text-amber-100 text-xs truncate w-20">{player.name}</span>
                    </div>
                    <span className="text-amber-400 text-[10px] font-mono">Lv. {player.level}</span>
                  </div>
                ))}
              </div>
              <Link to="/ranking?tab=player" className="block w-full mt-4 py-1.5 text-[10px] uppercase tracking-widest text-amber-200/50 hover:text-amber-100 border border-amber-900/30 hover:border-amber-700 transition-all text-center">
                Tümünü Gör
              </Link>
            </div>

            <div className="glowing-divider"></div>

            <div className="w-full mb-4">
              <h2 className="text-amber-100 text-lg font-bold uppercase text-center mb-4 tracking-widest border-b border-amber-900/20 pb-2">En İyi Loncalar</h2>
              <div className="space-y-2">
                {[
                  { name: 'Kara Kartallar', members: 84, power: 'A+' },
                  { name: 'Gümüş Ejder', members: 76, power: 'A' },
                  { name: 'Kırmızı Aslan', members: 68, power: 'B+' },
                  { name: 'Gece Avcıları', members: 59, power: 'B' },
                  { name: 'Fırtına Klanı', members: 51, power: 'B-' }
                ].map((guild, index) => (
                  <div key={guild.name} className="flex justify-between items-center px-2 py-1 bg-black/20 border border-amber-900/10 hover:border-amber-700/30 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full ${index < 3 ? 'bg-amber-600 text-black' : 'bg-zinc-800 text-amber-100/50'}`}>
                        {index + 1}
                      </span>
                      <span className="text-amber-100 text-xs truncate w-28">{guild.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-400 text-[10px] font-mono">Üye {guild.members}</p>
                      <p className="text-amber-200 text-[10px] uppercase">Güç {guild.power}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/ranking?tab=guild" className="block w-full mt-4 py-1.5 text-[10px] uppercase tracking-widest text-amber-200/50 hover:text-amber-100 border border-amber-900/30 hover:border-amber-700 transition-all text-center">
                Tümünü Gör
              </Link>
            </div>

            <div className="glowing-divider"></div>

            <div className="w-full">
              <div className="flex justify-around items-center">
                <a href="#" className="w-10 h-10 bg-amber-900/20 border border-amber-900/40 flex items-center justify-center hover:bg-amber-600/30 hover:border-amber-600 transition-all rounded-sm group">
                  <span className="text-amber-100/50 group-hover:text-amber-100 text-3xl"><FaDiscord /></span>
                </a>
                <a href="#" className="w-10 h-10 bg-amber-900/20 border border-amber-900/40 flex items-center justify-center hover:bg-amber-600/30 hover:border-amber-600 transition-all rounded-sm group">
                  <span className="text-amber-100/50 group-hover:text-amber-100 text-3xl"><FaYoutube /></span>
                </a>
                <a href="#" className="w-10 h-10 bg-amber-900/20 border border-amber-900/40 flex items-center justify-center hover:bg-amber-600/30 hover:border-amber-600 transition-all rounded-sm group">
                  <span className="text-amber-100/50 group-hover:text-amber-100 text-3xl"><FaInstagram /></span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 main-body-container px-12 relative">
            <div className="body-ribbon -mb-1">ÜCRETSİZ OYNA</div>
            <Outlet />
          </div>

          <div className="right-side overflow-y-hidden! absolute -right-60 top-0 w-60 h-max">
            <div className="w-full">
              <h2 className="text-amber-100 text-xl font-bold uppercase text-center mb-4 tracking-widest border-b border-amber-900/20 pb-2">Giriş Yap</h2>
              <div className="space-y-3">
                <div className="relative">
                  <input type="text" placeholder="Kullanıcı Adı" className="w-full bg-black/60 border border-amber-900/50 p-2 pl-3 text-sm text-amber-50 focus:outline-none focus:border-amber-600 transition-colors placeholder:text-amber-100/30" />
                </div>
                <div className="relative">
                  <input type="password" placeholder="Şifre" className="w-full bg-black/60 border border-amber-900/50 p-2 pl-3 text-sm text-amber-50 focus:outline-none focus:border-amber-600 transition-colors placeholder:text-amber-100/30" />
                </div>
                <button className="w-full bg-linear-to-b from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-amber-50 font-bold py-2.5 transition-all uppercase text-xs tracking-widest border border-amber-600/30 shadow-lg">Giriş Yap</button>
                <div className="flex justify-between text-[10px] text-amber-200/50 uppercase tracking-tighter pt-1">
                  <Link to="/register" className="hover:text-amber-400 transition-colors">Kayıt Ol</Link>
                  <a href="#" className="hover:text-amber-400 transition-colors">Şifremi Unuttum</a>
                </div>
              </div>
            </div>

            <div className="glowing-divider"></div>

            <div className="w-full mb-4">
              <h2 className="text-amber-100 text-lg font-bold uppercase text-center mb-1 tracking-widest border-b border-amber-900/20 pb-2">Menü</h2>
              <ul className="space-y-1">
                <li>
                  <Link to="/" className="block w-full py-2 px-4 text-amber-200/80 hover:text-amber-50 hover:bg-amber-900/20 text-sm transition-all border-l-2 border-transparent hover:border-amber-600 uppercase tracking-wide">Ana Sayfa</Link>
                </li>
                <li>
                  <a href="#" className="block w-full py-2 px-4 text-amber-200/80 hover:text-amber-50 hover:bg-amber-900/20 text-sm transition-all border-l-2 border-transparent hover:border-amber-600 uppercase tracking-wide">İndir</a>
                </li>
                <li>
                  <Link to="/register" className="block w-full py-2 px-4 text-amber-200/80 hover:text-amber-50 hover:bg-amber-900/20 text-sm transition-all border-l-2 border-transparent hover:border-amber-600 uppercase tracking-wide">Kaydol</Link>
                </li>
                <li>
                  <Link to="/ranking" className="block w-full py-2 px-4 text-amber-200/80 hover:text-amber-50 hover:bg-amber-900/20 text-sm transition-all border-l-2 border-transparent hover:border-amber-600 uppercase tracking-wide">Sıralama</Link>
                </li>
                <li>
                  <a href="#" className="block w-full py-2 px-4 text-amber-200/80 hover:text-amber-50 hover:bg-amber-900/20 text-sm transition-all border-l-2 border-transparent hover:border-amber-600 uppercase tracking-wide">Market</a>
                </li>
                <li>
                  <a href="#" className="block w-full py-2 px-4 text-amber-200/80 hover:text-amber-50 hover:bg-amber-900/20 text-sm transition-all border-l-2 border-transparent hover:border-amber-600 uppercase tracking-wide">Destek</a>
                </li>
              </ul>
            </div>

            <div className="glowing-divider"></div>

            <div className="w-full pt-2">
              <h2 className="text-amber-100 text-lg font-bold uppercase text-center mb-4 tracking-widest">Sunucu Durumu</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <span className="text-amber-200/70 text-xs">Durum:</span>
                  <span className="text-green-500 text-xs font-bold uppercase">Online</span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className="text-amber-200/70 text-xs">Oyuncu:</span>
                  <span className="text-amber-50 text-xs">1,245</span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className="text-amber-200/70 text-xs">Pazar:</span>
                  <span className="text-amber-50 text-xs">450</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
