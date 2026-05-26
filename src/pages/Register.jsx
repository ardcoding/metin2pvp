import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const navigate = useNavigate()
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    deleteCode: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler uyuşmuyor!')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: formData.username,
          email: formData.email,
          password: formData.password,
          repassword: formData.confirmPassword,
          social_id: formData.deleteCode,
          name_surname: formData.fullName,
          phone: formData.phone,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Kayıt sırasında bir hata oluştu.')
      }

      setSuccess(data.message || 'Kayıt başarıyla oluşturuldu! Yönlendiriliyorsunuz...')

      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        deleteCode: '',
      })
      setAgree(false)

      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Signika+Negative:wght@400;600&display=swap');
        
        .m2-container {
          font-family: 'Signika Negative', sans-serif;
        }

        .m2-heading {
          font-family: 'Cinzel', serif;
          color: #f1cb46; 
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.9), 0px 0px 10px rgba(241, 203, 70, 0.4);
        }

        .m2-label-text {
          color: #d1a84b; 
          font-weight: 600;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
        }

        .m2-input {
          background-color: #090503;
          border: 1px solid #4a3319;
          color: #e2d1bc;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8);
          transition: all 0.3s ease;
        }

        .m2-input:focus {
          border-color: #d1a84b;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(209, 168, 75, 0.3);
          outline: none;
        }

        .m2-input::placeholder {
          color: #594531;
        }

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

      <div className="min-h-screen m2-container flex items-center justify-center p-4">
        <div className="w-full max-w-xl p-4 bg-transparent">
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

          {error && (
            <div className="p-3 mb-4 rounded-sm border border-red-900/50 bg-red-950/60 text-red-200 text-center text-sm font-semibold shadow-lg">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="p-3 mb-4 rounded-sm border border-green-900/50 bg-green-950/60 text-green-200 text-center text-sm font-semibold shadow-lg">
              ✨ {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-5">
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

            <div className="grid grid-cols-1 gap-5">
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

            <div className="grid grid-cols-1 gap-5">
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
                disabled={loading}
                className="w-full m2-btn font-bold py-3.5 px-4 rounded-sm uppercase tracking-widest text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'KAYIT EDİLİYOR...' : 'KAYIT OL'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}