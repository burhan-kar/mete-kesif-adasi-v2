# OYUN ÜRETİM ARAÇLARI — 28 EKİM 2026 ARAŞTIRMASI
Fiyatlar liste fiyatıdır, USD ve vergiler/kur hariç olabilir. Satın almadan önce resmi sayfada tekrar doğrula.

| Alan | Araç | Fiyat / ücretsiz kısıt | Proje kararı |
|---|---|---|---|
| Konsept/karakter görünüm | ChatGPT Görsel Oluşturma | mevcut ChatGPT erişimi ve plan limitlerine bağlı | Ana referans/konsept üretimi; çıktılar yalnızca konsept olabilir, GLB değildir |
| Tutarlı karakter AI | Scenario | 50 ücretsiz kredi deneme; Starter $15/ay; Pro $45/ay | Karakter tutarlılığı için ikinci turda değerlendir |
| 3D AI model | Meshy | Free 100 kredi/ay, ücretsiz model indirme yok; Pro $20/ay ve indirme/API | 3D pilot için ilk aday |
| 3D AI model | Tripo Studio | Free 200 kredi/ay; ücretli yaklaşık $20/ay (yıllık faturalama), free ticari kullanım sınırlı | Meshy karşılaştırma adayı; lisans ve gizlilik ayarını kontrol et |
| 3D düzenleme | Blender | Ücretsiz açık kaynak | **Zorunlu ana düzenleme/optimizasyon/rig/GLB dışa aktarım** |
| 3D sahne tasarımı | Spline | Free sınırlı ve filigranlı; Starter $12/ay yıllık; Professional $20/ay yıllık | Ana menü/sahne taslakları için opsiyonel |
| 3D web motoru | Three.js | Açık kaynak | **Gerçek 3D pilot için önerilen motor** |
| Mevcut oyun motoru | Phaser 3 | Açık kaynak, 2D odaklı | 5 mini oyunun mevcut mantığını koru |
| İnteraktif hareketli UI | Rive | Free deneme; Cadet $9/koltuk/ay yıllık, .riv yayını | İleride UI/2.5D animasyon için |
| İnsan karakter animasyonu | Adobe Mixamo | Adobe ID ile ücretsiz; iki ayaklı insan karakterler | Hayvan rig'i için uygun değil; insan rehber karakter için |
| Türkçe ses/sfx | ElevenLabs | Free 10K kredi; Starter standart $6/ay, Creator $22/ay; promosyonlar değişir | Gerçek konuşma ve özel SFX için; ticari hak ücretli plana bağlı |
| Görsel düzenleme | Adobe Firefly | Ücretsiz günlük sınırlı üretim; Standard $9.99/ay ABD, Türkiye fiyatı farklı olabilir | Kaynak görsel/arka plan düzenleme ve varlık üretimi |
| Oyun UI/asset | Figma / Adobe (ChatGPT eklentileri) | Bağlantı ve ilgili hesap/plan gerekir | ChatGPT içinden düzenlenebilir tasarım için önerilir |
| Ücretsiz hazır varlık | Kenney | CC0, ticari kullanımda atıf zorunlu değil | Geçici varlıklar, ikonlar, prototip |

## Resmi kaynaklar
- Phaser: https://docs.phaser.io/
- Three.js GLTFLoader: https://threejs.org/docs/pages/GLTFLoader
- Blender: https://www.blender.org/about/
- Meshy planlar: https://help.meshy.ai/en/articles/12062933-which-meshy-plan-is-right-for-you-free-vs-pro-vs-premium-vs-ultra
- Tripo planlar: https://www.tripo3d.ai/product-doc/getting-started/pricing-credits
- Tripo hayvan rigging: https://developers.tripo3d.com/en/models/rig
- Scenario: https://www.scenario.com/pricing
- Spline: https://spline.design/pricing
- Rive: https://rive.app/pricing
- ElevenLabs: https://elevenlabs.io/pricing
- ElevenLabs API: https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert
- Adobe Firefly: https://www.adobe.com/products/firefly/plans.html
- Mixamo FAQ: https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html
- Kenney lisans: https://kenney.nl/support
- Lingokids pedagojik örnek: https://lingokids.com/playlearning-curriculum

## Kritik teknik/lisans uyarıları
- Image-to-3D tüm araçlarda aynı kaliteli rig üretmez. Yükleme ve deformasyon testi şart.
- Meshy ücretsiz sürüm model indirmeye izin vermeyebilir; ücretsizde denenen çıktıları oyuna aktarmayı varsayma.
- Tripo Free çıktılarının ticari kullanım/atıf/mülkiyet şartları ücretliden farklıdır.
- Mixamo dört ayaklı, kuş, deniz canlısı otomatik rig için uygun değildir; Tripo/Meshy veya Blender uygun.
- Kullanıcının beğendiği görsel kolajı, gerçek oynanabilir 3D sahne olarak sunma.
- Hazır sesleri, modelleri veya telifli karakterleri 'ücretsiz buldum' diye lisans teyitsiz yükleme.
- API entegrasyonu için hesabın bağlanması veya özel sunucu arka ucu gerekir. Gizli API anahtarını GitHub Pages'e koyma.

## Bütçe stratejisi
A) $0 ilk aşama: ChatGPT'de konsept, Blender, Three.js, mevcut Phaser/GitHub, Kenney CC0, temel özgün sesler.
B) Yaklaşık $20–$50/ay üretim ayı: Meshy veya Tripo bir tanesi (+ gerekirse ElevenLabs Starter). Önce pilotu doğrula; iki 3D aboneliğini aynı anda açma.
C) $60+/ay yoğun üretim: Scenario Pro + bir 3D aracı + ses; ancak görsel tutarlılık sorunu kanıtlandıysa.
Her fiyatın dönemsel koşulları değişebilir; tüm tutarlar yaklaşık planlama örneğidir, kesin proje bütçesi değildir.
