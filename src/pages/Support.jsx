import { useState } from 'react'
import { FaDiscord, FaChevronDown, FaQuestionCircle, FaBug, FaLightbulb, FaExclamationTriangle } from 'react-icons/fa'

export const Support = () => {
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      question: "Oyunu nasıl indirebilirim ve kurulumu nasıl yaparım?",
      answer: "Oyun dosyalarını sorunsuz bir şekilde indirmek için ana menüde bulunan 'İNDİR' sekmesini kullanabilirsiniz. İndirdiğiniz arşiv dosyasını (.rar) bilgisayarınızda boş bir klasöre çıkarın ve ardından 'Metin2PVP.exe' dosyasını yönetici olarak çalıştırarak oyuna giriş yapın. Sorun yaşarsanız temiz bir Metin2 klasörü içerisine kurmayı deneyin."
    },
    {
      question: "Kayıt olurken veya giriş yaparken hata alıyorum, ne yapmalıyım?",
      answer: "Kayıt esnasında Türkçe karakter (ı, ş, ğ, ç, ö, ü) veya özel semboller kullanmadığınızdan emin olun. Eğer 'Kullanıcı Adı Zaten Alınmış' veya benzeri bir hata alıyorsanız farklı bir kullanıcı adı deneyin. Şifrenizi unutursanız veya giriş hatası alırsanız Discord destek sistemimizden anında yardım talep edebilirsiniz."
    },
    {
      question: "Oyunda bir hata (bug) veya açık buldum, ne yapmalıyım?",
      answer: "Oyun deneyimini herkes için kusursuz kılmak adına hataları bildirmek çok önemlidir. Discord sunucumuzdaki '#bug-bildirimi' kanalını kullanarak bulduğunuz hatayı ekran görüntüsü veya kısa bir video ile birlikte bizlere iletebilirsiniz. Önemli oyun açıklarını bildiren oyuncularımız yönetim ekibimiz tarafından ödüllendirilmektedir."
    },
    {
      question: "Öneri, istek ve şikayetlerimi nereye iletebilirim?",
      answer: "Sunucumuzu sizlerin geri bildirimleriyle şekillendiriyoruz. Her türlü öneri, oyun içi düzenleme isteği veya şikayetlerinizi Discord sunucumuzdaki ilgili kanallardan (örneğin '#oneriler' veya '#sikayetler') doğrudan yönetim ekibimize ulaştırabilirsiniz. Tüm öneriler ekibimiz tarafından günlük olarak değerlendirilmektedir."
    },
    {
      question: "Destek taleplerine ortalama geri dönüş süresi nedir?",
      answer: "Discord destek bileti (ticket) sistemimiz üzerinden açtığınız talepler, aktif destek ekibimiz tarafından incelenir. Ortalama yanıt süremiz 15 dakika ile 2 saat arasındadır. Gece saatlerinde yapılan başvurular ertesi sabah ilk saatlerde yanıtlanmaktadır."
    }
  ]

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen text-amber-50/80 pt-8 pb-16 px-2 md:px-4">
      <h2 className="text-amber-900 font-pirata text-4xl tracking-widest uppercase font-semibold pb-6 text-center animate-fade-in">
        Destek & SSS
      </h2>

      <div className="bg-black/50 border border-amber-900/30 rounded-xl p-6 md:p-8 shadow-2xl mb-8 relative overflow-hidden backdrop-blur-xs">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-600/50"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-600/50"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-600/50"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-600/50"></div>

        <div className="text-center max-w-2xl mx-auto space-y-6">
          <p className="text-amber-200/90 text-sm md:text-base leading-relaxed">
            Oyuncularımıza en hızlı ve kaliteli hizmeti sunabilmek adına tüm destek taleplerini, önerileri, şikayetleri ve bug bildirimlerini tek bir çatı altında topladık!
          </p>

          <div className="grid grid-cols-3 gap-2 md:gap-4 py-2">
            <div className="flex flex-col items-center justify-center p-3 bg-amber-950/20 border border-amber-900/20 rounded-lg hover:border-amber-600/30 transition-all group">
              <span className="text-amber-500 text-lg md:text-xl mb-1 group-hover:scale-110 transition-transform"><FaLightbulb /></span>
              <span className="text-[10px] md:text-xs text-amber-200/80 font-bold uppercase tracking-wider">Öneri & İstek</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-amber-950/20 border border-amber-900/20 rounded-lg hover:border-amber-600/30 transition-all group">
              <span className="text-amber-500 text-lg md:text-xl mb-1 group-hover:scale-110 transition-transform"><FaBug /></span>
              <span className="text-[10px] md:text-xs text-amber-200/80 font-bold uppercase tracking-wider">Bug Bildirimi</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-amber-950/20 border border-amber-900/20 rounded-lg hover:border-amber-600/30 transition-all group">
              <span className="text-amber-500 text-lg md:text-xl mb-1 group-hover:scale-110 transition-transform"><FaExclamationTriangle /></span>
              <span className="text-[10px] md:text-xs text-amber-200/80 font-bold uppercase tracking-wider">Hata & Şikayet</span>
            </div>
          </div>

          <div className="h-[1px] bg-linear-to-r from-transparent via-amber-900/30 to-transparent my-4"></div>

          <p className="text-xs md:text-sm text-amber-100/70">
            Aşağıdaki butona tıklayarak resmi Discord sunucumuza katılabilir, **#destek-talebi** kanalından anında bilet açarak yönetim ekibimizle doğrudan iletişime geçebilirsiniz.
          </p>

          <div className="pt-2 flex justify-center">
            <a
              href="https://discord.gg/metin2pvp"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_25px_rgba(79,70,229,0.7)] hover:scale-103 active:scale-98 transition-all duration-300 group cursor-pointer uppercase tracking-widest text-xs md:text-sm"
            >
              <span className="absolute inset-0 rounded-lg bg-indigo-500/20 animate-ping opacity-75"></span>
              <FaDiscord className="text-xl md:text-2xl animate-bounce" />
              <span>Discord Destek Hattı</span>
            </a>
          </div>
        </div>
      </div>

      <div className="glowing-divider"></div>

      <div className="mt-8 space-y-6">
        <div className="flex items-center gap-3 justify-center mb-6">
          <FaQuestionCircle className="text-amber-500 text-2xl" />
          <h3 className="text-amber-100 font-pirata text-2xl tracking-widest uppercase font-semibold">
            Sıkça Sorulan Sorular
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <div
                key={index}
                className="bg-black/35 border border-amber-900/20 hover:border-amber-700/40 rounded-lg overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 hover:bg-amber-900/10 transition-colors cursor-pointer"
                >
                  <span className={`text-xs md:text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${isOpen ? 'text-amber-400' : 'text-amber-100/90'}`}>
                    {faq.question}
                  </span>
                  <span className={`text-amber-500 shrink-0 text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <FaChevronDown />
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 text-xs md:text-sm text-amber-200/70 leading-relaxed bg-black/10 border-t border-amber-900/10">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
