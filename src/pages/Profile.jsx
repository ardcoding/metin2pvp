import { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'

export const Profile = () => {
  const { user } = useOutletContext()
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Standard Metin2 Dummy Data for dates and coins if not provided by backend
  const dummyMetadata = {
    coins: 1450,
    registeredAt: '15.05.2026',
    lastLoginAt: '31.05.2026 17:15',
  }

  useEffect(() => {
    // If user is not logged in, redirect immediately to homepage
    if (!user) {
      navigate('/')
      return
    }

    const fetchProfile = async () => {
      setLoading(true)
      try {
        // Try to fetch full profile from backend
        const response = await fetch(`http://localhost:8000/me/${user.login}`)
        if (response.ok) {
          const data = await response.json()
          setProfileData(data)
        } else {
          // If backend is down or fails, use the active localStorage user object
          setProfileData(user)
        }
      } catch (err) {
        console.error('Profil verileri backendden alınamadı, yerel veriler kullanılıyor:', err)
        setProfileData(user)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user, navigate])

  if (!user || loading) {
    return (
      <div className="min-h-120 flex items-center justify-center">
        <div className="text-amber-700 font-bold uppercase tracking-widest text-sm animate-pulse">
          YÜKLENİYOR...
        </div>
      </div>
    )
  }

  // Merge backend data with dummy metadata
  const mergedProfile = {
    ...dummyMetadata,
    ...profileData,
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Signika+Negative:wght@400;600&display=swap');
        
        .profile-container {
          font-family: 'Signika Negative', sans-serif;
        }

        .profile-heading {
          font-family: 'Cinzel', serif;
          color: #785226; /* Elegant bronze/brown for title on light parchment */
          text-shadow: 0px 1px 2px rgba(255, 255, 255, 0.6);
        }

        /* Rich deep warm brown for labels - perfect contrast on light parchment */
        .profile-label-text {
          color: #5c3e1f;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        /* Deep, soft charcoal-brown for values - sharp and highly legible */
        .profile-value-text {
          color: #292524;
          font-weight: 600;
        }

        /* Highly readable green for Active status on light bg */
        .profile-status-active {
          color: #15803d;
          font-weight: 700;
        }

        /* Rich, warm amber-orange for EP - readable on light bg */
        .profile-ep-text {
          color: #b45309;
        }

        /* Clean, soft brown divider line */
        .faint-divider {
          border-bottom: 1px solid rgba(92, 62, 31, 0.18);
        }
      `}</style>

      <div className="profile-container py-10 min-h-150 flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-10 w-full">
          <h1 className="text-2xl profile-heading tracking-widest uppercase font-bold">HESAP PANELİ</h1>
          <div className="w-full flex items-center justify-center mt-2">
            <div className="h-[1px] w-20 bg-[#785226]/30"></div>
            <div className="mx-2 text-[#785226]/60 text-[10px]">✦</div>
            <div className="h-[1px] w-20 bg-[#785226]/30"></div>
          </div>
        </div>

        {/* Completely Backgroundless Details Container */}
        <div className="w-full max-w-md px-6 sm:px-0">
          <div className="space-y-1">
            {/* 1. Kullanıcı Adı */}
            <div className="flex justify-between items-center py-4 faint-divider">
              <span className="text-xs uppercase tracking-wider profile-label-text">Kullanıcı Adı</span>
              <span className="text-sm profile-value-text">{mergedProfile.login || mergedProfile.username}</span>
            </div>

            {/* 2. Ad Soyad */}
            <div className="flex justify-between items-center py-4 faint-divider">
              <span className="text-xs uppercase tracking-wider profile-label-text">Ad Soyad</span>
              <span className="text-sm profile-value-text">{mergedProfile.name_surname || 'Belirtilmemiş'}</span>
            </div>

            {/* 3. E-Posta Adresi */}
            <div className="flex justify-between items-center py-4 faint-divider">
              <span className="text-xs uppercase tracking-wider profile-label-text">E-Posta Adresi</span>
              <span className="text-sm profile-value-text truncate max-w-[180px] sm:max-w-[240px]" title={mergedProfile.email}>
                {mergedProfile.email || 'Belirtilmemiş'}
              </span>
            </div>

            {/* 4. Hesap Durumu */}
            <div className="flex justify-between items-center py-4 faint-divider">
              <span className="text-xs uppercase tracking-wider profile-label-text">Hesap Durumu</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                <span className="text-xs uppercase profile-status-active">{mergedProfile.status || 'Aktif'}</span>
              </div>
            </div>

            {/* 5. Kayıt Tarihi */}
            <div className="flex justify-between items-center py-4 faint-divider">
              <span className="text-xs uppercase tracking-wider profile-label-text">Kayıt Tarihi</span>
              <span className="text-sm profile-value-text">{mergedProfile.registeredAt || 'Belirtilmemiş'}</span>
            </div>

            {/* 6. Son Giriş Tarihi */}
            <div className="flex justify-between items-center py-4 faint-divider">
              <span className="text-xs uppercase tracking-wider profile-label-text">Son Giriş Tarihi</span>
              <span className="text-sm profile-value-text">{mergedProfile.lastLoginAt || 'Belirtilmemiş'}</span>
            </div>

            {/* 7. Oyun Parası (EP) */}
            <div className="flex justify-between items-center py-4">
              <span className="text-xs uppercase tracking-wider text-amber-800 font-bold">Oyun Parası (EP)</span>
              <span className="text-base font-black profile-ep-text">{mergedProfile.coins || 0} EP</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
