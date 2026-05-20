import { useState, useEffect } from 'react';

export const Homepage = () => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const designWidth = 1400; // Total design width including sidebars
            if (width < designWidth) {
                setScale(width / designWidth);
            } else {
                setScale(1);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    return (
        <div className="min-h-screen h-full bg-black/20">
            <div className="absolute top-0 left-0 w-full h-10 header z-50"></div>
            <div
                className="flex justify-center transition-all duration-300 ease-out"
                style={{
                    transform: `scale(${scale - 0.1})`,
                    transformOrigin: 'top center',
                    width: '1400px',
                    position: 'absolute',
                    left: '50%',
                    marginLeft: '-700px', // Half of 1400px to center the absolute div
                    minHeight: '100vh'
                }}
            >
                <div className="flex mt-[50vh] w-187.5 mx-auto border-x border-amber-900/30 relative shadow-2xl min-h-200 bg-black/40">
                    <div className="left-side absolute -left-60 top-0 w-60">
                        {/* Ranking Section */}
                        <div className="w-full mb-4">
                            <h2 className="text-amber-100 text-lg font-bold uppercase text-center mb-4 tracking-widest border-b border-amber-900/20 pb-2">En İyiler</h2>
                            <div className="space-y-2">
                                {[
                                    { name: 'Revenge', level: 120, rank: 1 },
                                    { name: 'Alpha', level: 119, rank: 2 },
                                    { name: 'Warrior', level: 118, rank: 3 },
                                    { name: 'Legend', level: 115, rank: 4 },
                                    { name: 'Shadow', level: 112, rank: 5 },
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
                            <button className="w-full mt-4 py-1.5 text-[10px] uppercase tracking-widest text-amber-200/50 hover:text-amber-100 border border-amber-900/30 hover:border-amber-700 transition-all">
                                Tümünü Gör
                            </button>
                        </div>

                        <div className="glowing-divider"></div>

                        {/* Server Info Section */}
                        <div className="w-full mb-4">
                            <h2 className="text-amber-100 text-lg font-bold uppercase text-center mb-4 tracking-widest border-b border-amber-900/20 pb-2">Sunucu Bilgi</h2>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-black/40 p-2 border border-amber-900/20 text-center">
                                    <p className="text-[9px] text-amber-200/50 uppercase">Tecrübe</p>
                                    <p className="text-amber-100 font-bold text-xs">%200</p>
                                </div>
                                <div className="bg-black/40 p-2 border border-amber-900/20 text-center">
                                    <p className="text-[9px] text-amber-200/50 uppercase">Eşya</p>
                                    <p className="text-amber-100 font-bold text-xs">%150</p>
                                </div>
                                <div className="bg-black/40 p-2 border border-amber-900/20 text-center">
                                    <p className="text-[9px] text-amber-200/50 uppercase">Yang</p>
                                    <p className="text-amber-100 font-bold text-xs">%200</p>
                                </div>
                                <div className="bg-black/40 p-2 border border-amber-900/20 text-center">
                                    <p className="text-[9px] text-amber-200/50 uppercase">Zorluk</p>
                                    <p className="text-amber-100 font-bold text-xs">Orta</p>
                                </div>
                            </div>
                        </div>

                        <div className="glowing-divider"></div>

                        {/* Social Section */}
                        <div className="w-full">
                            <div className="flex justify-around items-center">
                                <a href="#" className="w-10 h-10 bg-amber-900/20 border border-amber-900/40 flex items-center justify-center hover:bg-amber-600/30 hover:border-amber-600 transition-all rounded-sm group">
                                    <span className="text-amber-100/50 group-hover:text-amber-100 text-xs">DC</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-amber-900/20 border border-amber-900/40 flex items-center justify-center hover:bg-amber-600/30 hover:border-amber-600 transition-all rounded-sm group">
                                    <span className="text-amber-100/50 group-hover:text-amber-100 text-xs">FB</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-amber-900/20 border border-amber-900/40 flex items-center justify-center hover:bg-amber-600/30 hover:border-amber-600 transition-all rounded-sm group">
                                    <span className="text-amber-100/50 group-hover:text-amber-100 text-xs">IG</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Main Body */}
                    <div className="flex-1 main-body-container px-12 relative">
                        <div className="sakarya2-overlay flex items-center justify-center" aria-hidden="true">
                            <img src="/logo.png" alt="SAKARYA2 Logo" className="sakarya2-logo" />
                        </div>
                        <div className="body-ribbon -mb-1">ÜCRETSİZ OYNA</div>
                        <div className="min-h-screen text-amber-50/80">
                            <img 
                                src="bodycontent-2.jpeg" 
                                alt="Body Content" 
                                className="w-full h-auto rounded-lg shadow-lg" 
                            />
                            <img 
                                src="bodycontent.jpeg" 
                                alt="Body Content" 
                                className="w-full h-auto rounded-lg shadow-lg" 
                            />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="right-side absolute -right-60 top-0 w-60">
                        <div className="w-full mb-4 -mt-4">
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
                                    <a href="#" className="hover:text-amber-400 transition-colors">Kayıt Ol</a>
                                    <a href="#" className="hover:text-amber-400 transition-colors">Şifremi Unuttum</a>
                                </div>
                            </div>
                        </div>

                        <div className="glowing-divider"></div>

                        {/* Navigation Section */}
                        <div className="w-full mb-4">
                            <h2 className="text-amber-100 text-lg font-bold uppercase text-center mb-1 tracking-widest border-b border-amber-900/20 pb-2">Menü</h2>
                            <ul className="space-y-1">
                                {['Ana Sayfa', 'İndir', 'Kaydol', 'Sıralama', 'Market', 'Destek'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="block w-full py-2 px-4 text-amber-200/80 hover:text-amber-50 hover:bg-amber-900/20 text-sm transition-all border-l-2 border-transparent hover:border-amber-600 uppercase tracking-wide">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glowing-divider"></div>

                        {/* Server Status Section */}
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