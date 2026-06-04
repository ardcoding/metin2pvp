import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js'
import { COUNTRIES } from '../utils/countries'

export const Register = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeField, setActiveField] = useState(null)

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneCountry: 'TR',
      phone: '',
      deleteCode: '',
      agree: false
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, 'Ad soyad en az 3 karakter olmalıdır.')
        .max(50, 'Ad soyad en fazla 50 karakter olmalıdır.')
        .matches(/^[a-zA-ZçÇğĞıİöÖşŞüÜ]+(?:\s[a-zA-ZçÇğĞıİöÖşŞüÜ]+)+$/, 'Lütfen geçerli bir ad ve soyad girin (Örn: Mert Yılmaz).')
        .required('Ad soyad alanı zorunludur.'),
      username: Yup.string()
        .min(4, 'Kullanıcı adı en az 4 karakter olmalıdır.')
        .max(16, 'Kullanıcı adı en fazla 16 karakter olmalıdır.')
        .matches(/^[a-zA-Z0-9]+$/, 'Kullanıcı adı boşluk, Türkçe veya özel karakter içeremez. Sadece İngilizce harf ve rakamlar kullanılabilir.')
        .required('Kullanıcı adı (ID) zorunludur.'),
      email: Yup.string()
        .email('Geçersiz e-posta adresi formatı.')
        .max(64, 'E-posta en fazla 64 karakter olmalıdır.')
        .required('E-posta alanı zorunludur.'),
      password: Yup.string()
        .min(6, 'Şifre en az 6 karakter olmalıdır.')
        .max(20, 'Şifre en fazla 20 karakter olmalıdır.')
        .matches(/^[^çÇğĞıİöÖşŞüÜ]*$/, 'Şifre Türkçe karakterler (ç, Ç, ğ, Ğ, ı, İ, ö, Ö, ş, Ş, ü, Ü) içeremez.')
        .required('Şifre alanı zorunludur.'),
      confirmPassword: Yup.string()
        .max(20, 'Şifre tekrarı en fazla 20 karakter olmalıdır.')
        .oneOf([Yup.ref('password'), null], 'Şifreler birbiriyle uyuşmuyor.')
        .required('Şifre tekrarı zorunludur.'),
      deleteCode: Yup.string()
        .matches(/^[a-zA-Z0-9]{7}$/, 'Karakter silme kodu tam olarak 7 haneli İngilizce harf ve rakamlardan oluşmalıdır.')
        .required('Karakter silme kodu zorunludur.'),
      phoneCountry: Yup.string().required(),
      phone: Yup.string()
        .nullable()
        .max(20, 'Telefon numarası en fazla 20 karakter olmalıdır.')
        .test('phone-validation', 'Geçersiz telefon numarası.', function (value) {
          if (!value) return true; // Optional field
          const { phoneCountry } = this.parent;
          try {
            const phoneNumber = parsePhoneNumberFromString(value, phoneCountry);
            return phoneNumber ? phoneNumber.isValid() : false;
          } catch {
            return false;
          }
        }),
      agree: Yup.boolean()
        .oneOf([true], 'Üyelik Sözleşmesini kabul etmelisiniz.')
        .required('Üyelik Sözleşmesini kabul etmelisiniz.')
    }),
    onSubmit: async (values) => {
      setError('')
      setSuccess('')
      setLoading(true)

      try {
        const response = await fetch('http://localhost:8000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: values.username,
            email: values.email,
            password: values.password,
            repassword: values.confirmPassword,
            social_id: values.deleteCode,
            name_surname: values.fullName,
            phone: values.phone ? `${COUNTRIES.find(c => c.code === values.phoneCountry)?.dialCode}${values.phone.replace(/\D/g, '')}` : '',
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.detail || 'Kayıt sırasında bir hata oluştu.')
        }

        setSuccess(data.message || 'Kayıt başarıyla oluşturuldu! Yönlendiriliyorsunuz...')
        formik.resetForm()

        setTimeout(() => {
          navigate('/')
        }, 3000)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
  })

  const isPhoneValid = () => {
    if (!formik.values.phone) return true;
    try {
      const phoneNumber = parsePhoneNumberFromString(formik.values.phone, formik.values.phoneCountry);
      return phoneNumber ? phoneNumber.isValid() : false;
    } catch {
      return false;
    }
  }

  const getValidationRules = () => {
    switch (activeField) {
      case 'fullName':
        return {
          title: 'AD SOYAD KURALLARI',
          rules: [
            { label: 'En az 3 karakter olmalı', met: formik.values.fullName.length >= 3 },
            { label: 'En fazla 50 karakter olmalı', met: formik.values.fullName.length <= 50 && formik.values.fullName.length > 0 },
            { label: 'Ad ve Soyad içermeli (boşluk bırakın)', met: formik.values.fullName.trim().includes(' ') && formik.values.fullName.trim().split(' ').filter(Boolean).length >= 2 },
            { label: 'Sadece harflerden oluşmalı', met: formik.values.fullName.length > 0 && /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/.test(formik.values.fullName) }
          ]
        }
      case 'username':
        return {
          title: 'KULLANICI ADI ŞARTLARI',
          rules: [
            { label: '4 - 16 karakter uzunluğunda olmalı', met: formik.values.username.length >= 4 && formik.values.username.length <= 16 },
            { label: 'Türkçe karakter içermemeli', met: formik.values.username.length > 0 && !/[çÇğĞıİöÖşŞüÜ]/.test(formik.values.username) },
            { label: 'Özel karakter veya boşluk içermemeli', met: formik.values.username.length > 0 && !/[^a-zA-Z0-9çÇğĞıİöÖşŞüÜ]/.test(formik.values.username) },
            { label: 'Sadece İngilizce harf ve sayılar', met: formik.values.username.length > 0 && /^[a-zA-Z0-9]+$/.test(formik.values.username) }
          ]
        }
      case 'email':
        return {
          title: 'E-POSTA ŞARTLARI',
          rules: [
            { label: 'Geçerli bir e-posta adresi olmalı', met: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formik.values.email) },
            { label: 'En fazla 64 karakter olmalı', met: formik.values.email.length > 0 && formik.values.email.length <= 64 }
          ]
        }
      case 'password':
        return {
          title: 'ŞİFRE ŞARTLARI',
          rules: [
            { label: '6 - 20 karakter uzunluğunda olmalı', met: formik.values.password.length >= 6 && formik.values.password.length <= 20 },
            { label: 'Türkçe karakter içermemeli (ç, ğ, ı, ö, ş, ü)', met: formik.values.password.length > 0 && !/[çÇğĞıİöÖşŞüÜ]/.test(formik.values.password) }
          ]
        }
      case 'confirmPassword':
        return {
          title: 'ŞİFRE TEKRAR ŞARTLARI',
          rules: [
            { label: 'Şifreniz ile birebir uyuşmalı', met: formik.values.confirmPassword.length > 0 && formik.values.confirmPassword === formik.values.password }
          ]
        }
      case 'deleteCode':
        return {
          title: 'KARAKTER SİLME KODU',
          rules: [
            { label: 'Tam olarak 7 karakter olmalı', met: formik.values.deleteCode.length === 7 },
            { label: 'Sadece İngilizce harf ve rakamlar', met: formik.values.deleteCode.length > 0 && /^[a-zA-Z0-9]+$/.test(formik.values.deleteCode) }
          ]
        }
      case 'phone':
        return {
          title: 'TELEFON NUMARASI',
          rules: [
            { label: 'Geçerli bir telefon numarası olmalı', met: isPhoneValid() }
          ]
        }
      default:
        return null;
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

        .m2-input-error {
          border-color: #c23131 !important;
        }
        
        .m2-input-error:focus {
          border-color: #f87171 !important;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.8), 0 0 8px rgba(248, 113, 113, 0.3) !important;
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

        .m2-rules-box {
          background: #090503;
          border: 1px solid #4a3319;
          box-shadow: 0 4px 20px rgba(0,0,0,0.8), inset 0 0 15px rgba(74, 51, 25, 0.2);
          transition: all 0.3s ease;
        }

        .m2-rules-header {
          font-family: 'Cinzel', serif;
          color: #f1cb46;
          text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.9);
          border-bottom: 1px dashed #4a3319;
        }

        .rule-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.825rem;
          line-height: 1.3;
          transition: all 0.2s ease;
        }
      `}</style>

      <div className="min-h-screen m2-container flex items-center justify-center p-4">
        <div className="w-full max-w-4xl p-4 bg-transparent flex flex-col md:flex-row gap-6 items-start justify-center">
          
          {/* Sol Panel: Form */}
          <div className="flex-1 w-full max-w-xl">
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

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="grid gap-5">
                <div>
                  <label className="block text-lg m2-label-text mb-1.5 tracking-wide">AD SOYAD</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Örn: Ahmet Yılmaz"
                    maxLength={50}
                    value={formik.values.fullName}
                    onChange={(e) => {
                      const rawVal = e.target.value;
                      if (rawVal.length <= 50) {
                        const words = rawVal.split(' ');
                        const formattedWords = words.map((word) => {
                          if (!word) return '';
                          let first = word.charAt(0);
                          if (first === 'i') first = 'İ';
                          else if (first === 'ı') first = 'I';
                          else first = first.toUpperCase();

                          const rest = word.slice(1).toLowerCase()
                            .replace(/I/g, 'ı')
                            .replace(/İ/g, 'i');
                          return first + rest;
                        });
                        formik.setFieldValue('fullName', formattedWords.join(' '));
                      }
                    }}
                    onFocus={() => setActiveField('fullName')}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      setActiveField(null);
                    }}
                    className={`w-full p-3 text-sm rounded-sm m2-input ${formik.touched.fullName && formik.errors.fullName ? 'm2-input-error' : ''
                      }`}
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <div className="text-red-400 text-xs mt-1 block font-semibold italic">
                      ⚠️ {formik.errors.fullName}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-lg m2-label-text mb-1.5 tracking-wide">KULLANICI ADI (ID)</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Oyuna giriş ID'niz"
                    maxLength={16}
                    value={formik.values.username}
                    onChange={(e) => {
                      if (e.target.value.length <= 16) {
                        formik.handleChange(e);
                      }
                    }}
                    onFocus={() => setActiveField('username')}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      setActiveField(null);
                    }}
                    className={`w-full p-3 text-sm rounded-sm m2-input ${formik.touched.username && formik.errors.username ? 'm2-input-error' : ''
                      }`}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="text-red-400 text-xs mt-1 block font-semibold italic">
                      ⚠️ {formik.errors.username}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-lg m2-label-text mb-1.5 tracking-wide">MAİL ADRESİ</label>
                <input
                  type="email"
                  name="email"
                  placeholder="ornek@eposta.com"
                  maxLength={64}
                  value={formik.values.email}
                  onChange={(e) => {
                    if (e.target.value.length <= 64) {
                      formik.handleChange(e);
                    }
                  }}
                  onFocus={() => setActiveField('email')}
                  onBlur={(e) => {
                    formik.handleBlur(e);
                    setActiveField(null);
                  }}
                  className={`w-full p-3 text-sm rounded-sm m2-input ${formik.touched.email && formik.errors.email ? 'm2-input-error' : ''
                    }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-400 text-xs mt-1 block font-semibold italic">
                    ⚠️ {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-lg m2-label-text mb-1.5 tracking-wide">ŞİFRE</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    maxLength={20}
                    value={formik.values.password}
                    onChange={(e) => {
                      if (e.target.value.length <= 20) {
                        formik.handleChange(e);
                      }
                    }}
                    onFocus={() => setActiveField('password')}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      setActiveField(null);
                    }}
                    className={`w-full p-3 text-sm rounded-sm m2-input ${formik.touched.password && formik.errors.password ? 'm2-input-error' : ''
                      }`}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-red-400 text-xs mt-1 block font-semibold italic">
                      ⚠️ {formik.errors.password}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-lg m2-label-text mb-1.5 tracking-wide">TEKRAR ŞİFRE</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    maxLength={20}
                    value={formik.values.confirmPassword}
                    onChange={(e) => {
                      if (e.target.value.length <= 20) {
                        formik.handleChange(e);
                      }
                    }}
                    onFocus={() => setActiveField('confirmPassword')}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      setActiveField(null);
                    }}
                    className={`w-full p-3 text-sm rounded-sm m2-input ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'm2-input-error' : ''
                      }`}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div className="text-red-400 text-xs mt-1 block font-semibold italic">
                      ⚠️ {formik.errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-lg m2-label-text mb-1.5 tracking-wide">KARAKTER SİLME KODU</label>
                  <input
                    type="text"
                    name="deleteCode"
                    maxLength="7"
                    placeholder="7 Haneli Kod"
                    value={formik.values.deleteCode}
                    onChange={(e) => {
                      const rawVal = e.target.value;
                      const cleanVal = rawVal.replace(/[^a-zA-Z0-9]/g, '');
                      if (cleanVal.length <= 7) {
                        formik.setFieldValue('deleteCode', cleanVal);
                      }
                    }}
                    onFocus={() => setActiveField('deleteCode')}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      setActiveField(null);
                    }}
                    className={`w-full p-3 text-sm rounded-sm m2-input ${formik.touched.deleteCode && formik.errors.deleteCode ? 'm2-input-error' : ''
                      }`}
                  />
                  {formik.touched.deleteCode && formik.errors.deleteCode && (
                    <div className="text-red-400 text-xs mt-1 block font-semibold italic">
                      ⚠️ {formik.errors.deleteCode}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-lg m2-label-text mb-1.5 tracking-wide">TELEFON NUMARANIZ</label>
                <div className="flex gap-2">
                  <div className="relative w-32">
                    <select
                      name="phoneCountry"
                      value={formik.values.phoneCountry}
                      onChange={async (e) => {
                        const newCountry = e.target.value;
                        await formik.setFieldValue('phoneCountry', newCountry);

                        if (formik.values.phone) {
                          const countryConfig = COUNTRIES.find(c => c.code === newCountry);
                          const maxDigits = countryConfig?.maxDigits || 15;

                          let cleanDigits = formik.values.phone.replace(/\D/g, '');

                          if (newCountry === 'TR' && cleanDigits.length > 0 && cleanDigits[0] !== '5') {
                            cleanDigits = '';
                          } else if (cleanDigits.length > maxDigits) {
                            cleanDigits = cleanDigits.slice(0, maxDigits);
                          }

                          const formatted = new AsYouType(newCountry).input(cleanDigits);
                          await formik.setFieldValue('phone', formatted);
                          formik.validateField('phone');
                        }
                      }}
                      className="w-full p-3 pr-8 text-sm rounded-sm m2-input cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23d1a84b%22%20d%3D%22M10.293%203.293L6%207.586%201.707%203.293A1%201%200%2000.293%204.707l5%205a1%201%200%20001.414%200l5-5a1%201%200%2010-1.414-1.414z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.6rem_center]"
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country.code} value={country.code} className="bg-[#090503] text-amber-100">
                          {country.emoji} {country.dialCode}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="tel"
                      name="phone"
                      maxLength={20}
                      placeholder={COUNTRIES.find(c => c.code === formik.values.phoneCountry)?.placeholder || 'Telefon numaranız'}
                      value={formik.values.phone}
                      onChange={(e) => {
                        const rawVal = e.target.value;
                        const cleanDigits = rawVal.replace(/\D/g, ''); // only digits

                        const countryConfig = COUNTRIES.find(c => c.code === formik.values.phoneCountry);
                        const maxDigits = countryConfig?.maxDigits || 15;

                        // TR: first digit must be 5
                        if (formik.values.phoneCountry === 'TR' && cleanDigits.length > 0 && cleanDigits[0] !== '5') {
                          return;
                        }

                        if (cleanDigits.length <= maxDigits) {
                          const formatted = new AsYouType(formik.values.phoneCountry).input(cleanDigits);
                          formik.setFieldValue('phone', formatted);
                        }
                      }}
                      onFocus={() => setActiveField('phone')}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        setActiveField(null);
                      }}
                      className={`w-full p-3 text-sm rounded-sm m2-input ${formik.touched.phone && formik.errors.phone ? 'm2-input-error' : ''
                        }`}
                    />
                  </div>
                </div>
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-red-400 text-xs mt-1 block font-semibold italic">
                    ⚠️ {formik.errors.phone}
                  </div>
                )}
              </div>

              <div className="flex flex-col mt-6 pt-2">
                <div className="flex items-center h-5">
                  <input
                    id="sozlesme"
                    type="checkbox"
                    name="agree"
                    checked={formik.values.agree}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ accentColor: '#593e1f' }}
                    className="w-4 h-4 rounded-sm cursor-pointer border-[#4a3319] bg-[#090503]"
                  />
                  <label htmlFor="sozlesme" className="ml-2 text-lg text-[#594531] font-semibold cursor-pointer select-none">
                    <span className="m2-label-text underline hover:text-[#f1cb46]">Üyelik Sözleşmesi</span>&apos;ni okudum ve kabul ediyorum.
                  </label>
                </div>
                {formik.touched.agree && formik.errors.agree && (
                  <div className="text-red-400 text-xs mt-2 block font-semibold italic">
                    ⚠️ {formik.errors.agree}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || !formik.isValid}
                  className="w-full m2-btn font-bold py-3.5 px-4 rounded-sm uppercase tracking-widest text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'KAYIT EDİLİYOR...' : 'KAYIT OL'}
                </button>
              </div>
            </form>
          </div>

          {/* Sağ Panel: Dinamik Kural Kutusu */}
          <div className="w-full md:w-[260px] shrink-0 md:sticky md:top-24 mt-4 md:mt-20 self-start">
            <div className="m2-rules-box p-4 rounded-sm border border-[#4a3319]">
              {getValidationRules() ? (
                <div>
                  <h3 className="m2-rules-header text-sm font-bold pb-2 mb-3 uppercase tracking-wider text-center">
                    {getValidationRules().title}
                  </h3>
                  <ul className="space-y-2.5">
                    {getValidationRules().rules.map((rule, idx) => (
                      <li key={idx} className="rule-item flex items-start gap-2 text-xs">
                        <span className={`shrink-0 font-bold ${rule.met ? 'text-emerald-500' : 'text-red-500'}`}>
                          {rule.met ? '✓' : '✗'}
                        </span>
                        <span className={rule.met ? 'text-emerald-200/80' : 'text-red-200/80'}>
                          {rule.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-2">
                  <h3 className="m2-rules-header text-sm font-bold pb-2 mb-3 uppercase tracking-wider">
                    MACERACI REHBERİ
                  </h3>
                  <p className="text-xs text-amber-200/60 leading-relaxed italic">
                    Kaydolmak için bilgilerinizi girmeye başlayın. Tıkladığınız alanın kuralları burada gösterilecektir.
                  </p>
                  <div className="mt-4 text-[#574417] text-xs">✦ ✦ ✦</div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}