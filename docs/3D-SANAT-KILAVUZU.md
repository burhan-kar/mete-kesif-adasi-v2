# METE 3.0 — ÖZGÜN 3D SANAT KILAVUZU (ART BIBLE)
Tarih 2026-10-28 | Sürüm 0.1

## Vizyon
Yumuşak, parlak, sıcak, dost canlısı, üç boyutlu çocuk animasyonu estetiği. Zengin çevre, pastel-canlı dengesi, yumuşak gölge, oyuncak benzeri dokular. Referans uygulamaların deneyim kalitesi esas alınır; telifli karakter, tipografi, logo, müzik, sahne ve özgül marka üslubu taklit edilmez.

## Görsel standart
- Karakter silüetleri küçük ekranda da ayırt edilir; gözler büyük fakat aşırı değil, yüz ifadeleri sade.
- Göz temasını kolaylaştıran kafa-gövde oranları; yuvarlak ve güven veren hatlar.
- Açık yüz ifadeleri: merak, sevinç, şaşırma, cesaretlendirme; korkutucu yüz yok.
- Dokular: sıcak peluş, kısa tüylü görünüm, yumuşak alt yüzey saçılması izlenimi; aşırı gerçekçi biyoloji yok.
- Işık: büyük area light hissi, yumuşak ana ışık, sıcak rim light, hafif ambient occlusion.
- Palet: deniz #4FC7E8, çimen #8ACD8C, güneş #FFD977, bal #F6B56A, krem #FFF7E7, şeker pembe #F6A5C7, lavanta #C5B4EF.
- UI: büyük kabartmalı dokunma yüzeyleri, taşma yok, kısa ve seslendirilebilir sözcükler, minimum 64x64 px dokunma hedefi.

## Beş ana karakter
1. **Pati** / köpek: altın karamel tüy, krem çene ve göğüs, minik yuvarlak kulaklar, büyük sıcak kahverengi gözler. Bakım Merkezi. Oyuncu eylemine anında sevgi dolu tepki.
2. **Mina** / inek: beyaz-krem yüz, belirgin yumuşak koyu lekeler, pembe burun, küçük boynuzlar, çan olmayan yumuşak boyun aksesuarı. Çiftlik.
3. **Fındık** / tilki: turuncu-bakır tüy, krem yanaklar, neşeli büyük kuyruk, yumuşak uçlu kulaklar. Orman.
4. **Mavi** / yunus: turkuaz mavi gövde, açık karın, neşeli gözler, suya girip çıkma hareketleri. Deniz.
5. **Pamuk** / tavşan: beyaz peluş kürk, pembe kulak içi, minik burun, yumuşak krem gövde. Veteriner.

Karakter isimleri proje için çalışma isimleridir; henüz ana marka kaydına geçirilmiş sayılmaz.

## Konsept oluşturma istemi (İngilizce)
Create an ORIGINAL, premium-quality stylized 3D animated children's game character model sheet for a preschool educational adventure. [CHARACTER]. Rounded friendly proportions, appealing expressive face, subtle plush material and soft short fur, sophisticated warm studio lighting, tactile materials, clean silhouette, consistent front/side/back/three-quarter views in one sheet, neutral light background, no text, no logos, no famous animation studio characters, no copyrighted character references. Keep exact markings and colors consistent across views. Character is designed to become a game-ready rigged 3D model.

## 3D'ye dönüşüm
Konsept -> çok-açılı karakter referansı -> Tripo veya Meshy image-to-3D -> GLB -> Blender düzeltme ve UV/topoloji -> rig -> animation clips -> GLTF export -> Three.js viewport -> mobile QA.

## Animasyon klipleri
- idle_breath 2–4 sn
- blink 1 sn
- happy_bounce 1–2 sn
- wash_reaction 1–3 sn
- feed_reaction 1–3 sn
- pet_reaction 1–3 sn
- celebrate 2–4 sn
- surprise_gentle 1–2 sn
İskeletli 3D model olmalı; pozun basitçe yukarı aşağı oynatılması gerçek animasyon hedefinin yerine geçmez.

## Dünya ortamları
Bakım Merkezi: yumuşak açık ahşap, su kabarcığı, havlu, oyuncak rafı; çocuk dostu.
Çiftlik: yeşil tepeler, yumuşak ahşap çit, saman sarısı detaylar.
Orman: güvenli ve aydınlık, çok katmanlı yaprak, mantarlar, ateşböcekleri.
Deniz: tropik su altı, mercan, doğal kabarcık, saydam ışık şeritleri.
Veteriner: temiz sıcak pastel klinik, stetoskop, bandaj, dostça yardımcı hayvan.

## Ses yönü
Türkçe, yumuşak, yavaş konuşan rehber. Tek cümlelik direktifler. Örnek: “Patiyi yıkayalım!” “Harika iş çıkardın!” “Bir daha deneyebiliriz!”
