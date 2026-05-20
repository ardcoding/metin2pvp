import { useState } from 'react'

export const Register = () => {
  const [agree, setAgree] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    pinCode: '',
    phone: '',
    deleteCode: '',
    source: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Şifreler uyuşmuyor!')
      return
    }
    console.log('Kayıt Verileri:', { ...formData, agree })
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Signika+Negative:wght@400;600&display=swap');
        
        .m2-container {
          font-family: 'Signika Negative', sans-serif;
        }

        /* Görseldeki parlayan sarı antik başlık efekti */
        .m2-heading {
          font-family: 'Cinzel', serif;
          color: #f1cb46; 
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.9), 0px 0px 10px rgba(241, 203, 70, 0.4);
        }

        /* Görseldeki o meşhur sarı-altın input etiketleri */
        .m2-label-text {
          color: #d1a84b; 
          font-weight: 600;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
        }

        /* TAM GÖRSELDEKİ GİBİ: Parşömenin üzerine oturan derin, koyu inputlar */
        .m2-input {
          background-color: #090503; /* Orijinal derin mistik siyah */
          border: 1px solid #4a3319; /* Parşömen tonlarında gömülü çerçeve */
          color: #e2d1bc; /* Yazarken okunması kolay antik krem rengi */
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8);
          transition: all 0.3s ease;
        }

        .m2-input:focus {
          border-color: #d1a84b; /* Odaklanınca etiket renginde parlar */
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(209, 168, 75, 0.3);
          outline: none;
        }

        /* Placeholder rengi sönük ve mistik */
        .m2-input::placeholder {
          color: #594531;
        }

        /* Görseldeki alt buton: Derin kahve/bronz gradyanı */
        .m2-btn {
          background: linear-gradient(180deg, #593e1f 0%, #3a2611 100%);
          border: 1px solid #73532c;
          color: #ffffff;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
          box-shadow: 0 4px 6px rgba(0,0,0,0.4);
        }

        .m2-btn:hover {
          background: linear-gradient(180deg, #6b4c29 0%, #462f16 100%);
          border-color: #d1a84b;
        }
      `}</style>

      {/* Eğer form zaten kendi oluşturduğun arka plan div'inin içindeyse, 
        en dıştaki min-h-screen katmanını kaldırıp sadece formu da yerleştirebilirsin.
      */}
      <div className="min-h-screen m2-container flex items-center justify-center p-4">
        {/* Form Alanı (Arka planındaki parşömene tam oturması için transparan yapıldı) */}
        <div className="w-full max-w-xl p-4 bg-transparent">
          
          {/* Başlık Bölümü */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl m2-heading tracking-wide uppercase">YENİ HESAP OLUŞTUR</h1>
            <div className="w-full flex items-center justify-center mt-3">
              <div className="h-[1px] w-1/4 bg-gradient-to-r from-transparent to-[#4a3319]"></div>
              <div className="mx-3 text-[#574417] text-xs">✦</div>
              <div className="h-[1px] w-1/4 bg-gradient-to-l from-transparent to-[#4a3319]"></div>
            </div>
            <p className="text-xs text-[#594531] mt-3 italic">
                Maceraya atılmak için ilk adımı at! Hesap oluştur ve destan yazmaya başla!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
              
            {/* Ad Soyad & Kullanıcı Adı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-lg m2-label-text mb-1.5 tracking-wide">AD SOYAD</label>
                <input 
                  type="text" 
                  name="fullName"
                  required 
                  placeholder="Örn: Ahmet Yılmaz" 
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 text-sm rounded-sm m2-input"
                />
              </div>
              <div>
                <label className="block text-lg m2-label-text mb-1.5 tracking-wide">KULLANICI ADI (ID)</label>
                <input 
                  type="text" 
                  name="username"
                  required 
                  placeholder="Oyuna giriş ID'niz" 
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 text-sm rounded-sm m2-input"
                />
              </div>
            </div>

            {/* E-Mail Adresi */}
            <div>
              <label className="block text-lg m2-label-text mb-1.5 tracking-wide">MAİL ADRESİ</label>
              <input 
                type="email" 
                name="email"
                required 
                placeholder="ornek@eposta.com" 
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 text-sm rounded-sm m2-input"
              />
            </div>

            {/* Şifre & Şifre Tekrar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-lg m2-label-text mb-1.5 tracking-wide">ŞİFRE</label>
                <input 
                  type="password" 
                  name="password"
                  required 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 text-sm rounded-sm m2-input"
                />
              </div>
              <div>
                <label className="block text-lg m2-label-text mb-1.5 tracking-wide">TEKRAR ŞİFRE</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  required 
                  placeholder="••••••••" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 text-sm rounded-sm m2-input"
                />
              </div>
            </div>

            {/* Pin Şifresi & Karakter Silme Kodu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-lg m2-label-text mb-1.5 tracking-wide">PİN ŞİFRESİ (DEPO)</label>
                <input 
                  type="password" 
                  name="pinCode"
                  maxLength="6" 
                  required 
                  placeholder="6 Haneli Depo Şifresi" 
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="w-full p-3 text-sm rounded-sm m2-input"
                />
              </div>
              <div>
                <label className="block text-lg m2-label-text mb-1.5 tracking-wide">KARAKTER SİLME KODU</label>
                <input 
                  type="text" 
                  name="deleteCode"
                  maxLength="7" 
                  required 
                  placeholder="7 Haneli Kod" 
                  value={formData.deleteCode}
                  onChange={handleChange}
                  className="w-full p-3 text-sm rounded-sm m2-input"
                />
              </div>
            </div>

            {/* Telefon Numarası */}
            <div>
              <label className="block text-lg m2-label-text mb-1.5 tracking-wide">TELEFON NUMARANIZ</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="05xx xxx xx xx" 
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 text-sm rounded-sm m2-input"
              />
            </div>

            {/* Bizi Nereden Buldunuz? */}
            <div>
              <label className="block text-lg m2-label-text mb-1.5 tracking-wide">BİZİ NEREDEN BULDUNUZ?</label>
              <select 
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full p-3 text-sm rounded-sm m2-input cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23d1a84b%22%20d%3D%22M10.293%203.293L6%207.586%201.707%203.293A1%201%200%2000.293%204.707l5%205a1%201%200%20001.414%200l5-5a1%201%200%2010-1.414-1.414z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]"
              >
                <option value="" disabled className="bg-[#090503]">Seçiniz...</option>
                <option value="youtube" className="bg-[#090503]">YouTube</option>
                <option value="tiktok" className="bg-[#090503]">TikTok / Instagram</option>
                <option value="forum" className="bg-[#090503]">Metin2 Forumları</option>
                <option value="tanitım" className="bg-[#090503]">PVP Tanıtım Siteleri</option>
                <option value="arkadas" className="bg-[#090503]">Arkadaş Tavsiyesi</option>
              </select>
            </div>

            <div className="flex items-center mt-6 pt-2">
              <div className="flex items-center h-5">
                <input 
                  id="sozlesme" 
                  type="checkbox" 
                  required 
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  style={{ accentColor: '#593e1f' }}
                  className="w-4 h-4 rounded-sm cursor-pointer border-[#4a3319] bg-[#090503]"
                />
              </div>
              <div className="ml-2 text-lg">
                <label htmlFor="sozlesme" className="text-[#594531] font-semibold cursor-pointer select-none">
                  <span className="m2-label-text underline hover:text-[#f1cb46]">Üyelik Sözleşmesi</span>'ni okudum ve kabul ediyorum.
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full m2-btn font-bold py-3.5 px-4 rounded-sm uppercase tracking-widest text-sm transition-all duration-200 cursor-pointer"
              >
                KAYIT OL
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}