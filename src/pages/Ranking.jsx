import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export const Ranking = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const rankingTab = searchParams.get('tab') === 'guild' ? 'guild' : 'player'

  useEffect(() => {
    if (searchParams.get('tab') !== 'guild' && searchParams.get('tab') !== 'player') {
      setSearchParams({ tab: 'player' }, { replace: true })
    }
  }, [searchParams, setSearchParams])

  const playerRankings = [
    { rank: 1, name: 'Redemption61', kingdom: 'Hükümdar', level: 86, guild: '-', exp: '0' },
    { rank: 2, name: 'MONGOL', kingdom: 'Hükümdar', level: 86, guild: 'HUKUMDAR', exp: '0' },
    { rank: 3, name: 'TONYUKUK', kingdom: 'Hükümdar', level: 86, guild: 'HUKUMDAR', exp: '0' },
    { rank: 4, name: 'IYEMLIHAI', kingdom: 'Hükümdar', level: 86, guild: 'HUKUMDAR', exp: '0' },
    { rank: 5, name: 'ImpeCCable', kingdom: 'Hükümdar', level: 86, guild: '-', exp: '0' },
    { rank: 6, name: 'Senkron1', kingdom: 'Hükümdar', level: 85, guild: '-', exp: '377304' },
    { rank: 7, name: 'xDarkBLAde', kingdom: 'Hükümdar', level: 85, guild: '-', exp: '187771' },
    { rank: 8, name: 'MrPuS', kingdom: 'Hükümdar', level: 85, guild: '-', exp: '42206' },
    { rank: 9, name: 'DaRKPaSaGe', kingdom: 'Asgard', level: 83, guild: 'ASGARD', exp: '246752258' },
    { rank: 10, name: 'DOKA', kingdom: 'Asgard', level: 83, guild: 'ASGARD', exp: '103985867' },
    { rank: 11, name: 'CEFZAB', kingdom: 'Hükümdar', level: 83, guild: 'HUKUMDAR', exp: '140432' }
  ]

  const guildRankings = [
    { rank: 1, name: 'HUKUMDAR', members: 45, power: 'S+', exp: '999M' },
    { rank: 2, name: 'ASGARD', members: 38, power: 'S', exp: '728M' },
    { rank: 3, name: 'KARA KARTAL', members: 34, power: 'A+', exp: '621M' },
    { rank: 4, name: 'GECE AVCILARI', members: 29, power: 'A', exp: '514M' },
    { rank: 5, name: 'FIRTINA', members: 24, power: 'B+', exp: '405M' }
  ]

  return (
    <div className="min-h-screen text-amber-50/80 pt-8">
        <h2 className="text-amber-900 font-pirata text-4xl tracking-widest uppercase font-semibold pb-8 text-center">
            {rankingTab === 'player' ? 'Oyuncu' : 'Lonca'} Sıralaması
        </h2>
      <div className="space-y-0">
        <div className="flex items-center justify-center gap-2 rounded-t-lg bg-black/50 border border-amber-900/30 p-2">
          <button
            type="button"
            onClick={() => setSearchParams({ tab: 'player' })}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest transition-all ${rankingTab === 'player' ? 'bg-amber-500 text-black shadow-lg' : 'bg-black/30 text-amber-200 hover:bg-amber-900/50'}`}>
            Oyuncu Sıralaması
          </button>
          <button
            type="button"
            onClick={() => setSearchParams({ tab: 'guild' })}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest transition-all ${rankingTab === 'guild' ? 'bg-amber-500 text-black shadow-lg' : 'bg-black/30 text-amber-200 hover:bg-amber-900/50'}`}>
            Lonca Sıralaması
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl rounded-t-none border border-amber-900/30 bg-black/20 shadow-xl p-4">
          <table className="min-w-full text-left text-xs text-amber-100/90">
            <thead>
              <tr className="bg-black/50 text-amber-100 uppercase tracking-widest text-[10px]">
                {rankingTab === 'player' ? (
                  <>
                    <th className="px-3 py-3">#</th>
                    <th className="px-3 py-3">Karakter Adı</th>
                    <th className="px-3 py-3">Krallık</th>
                    <th className="px-3 py-3">Seviye</th>
                    <th className="px-3 py-3">Lonca</th>
                    <th className="px-3 py-3">EXP</th>
                  </>
                ) : (
                  <>
                    <th className="px-3 py-3">#</th>
                    <th className="px-3 py-3">Lonca</th>
                    <th className="px-3 py-3">Üye</th>
                    <th className="px-3 py-3">Güç</th>
                    <th className="px-3 py-3">EXP</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/20">
              {(rankingTab === 'player' ? playerRankings : guildRankings).map((item) => (
                <tr key={`${rankingTab}-${item.rank}`} className="hover:bg-amber-900/10 transition-colors">
                  <td className="px-3 py-3 font-bold text-amber-200">{item.rank}</td>
                  {rankingTab === 'player' ? (
                    <>
                      <td className="px-3 py-3">{item.name}</td>
                      <td className="px-3 py-3">{item.kingdom}</td>
                      <td className="px-3 py-3">{item.level}</td>
                      <td className="px-3 py-3">{item.guild}</td>
                      <td className="px-3 py-3">{item.exp}</td>
                    </>
                  ) : (
                    <>
                      <td className="px-3 py-3">{item.name}</td>
                      <td className="px-3 py-3">{item.members}</td>
                      <td className="px-3 py-3">{item.power}</td>
                      <td className="px-3 py-3">{item.exp}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
