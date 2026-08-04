---
title: "Ucuz Çıkarım, Pahalı Muhakeme"
date: 2026-08-03
lang: "tr"
description: "Çıkarımın maliyeti çökerken değer, ucuz çıkarımı üretenlerde değil, karar süreçlerini onun etrafında yeniden kuranlarda birikecek — elektrifikasyonun otuz yıl bekleyen kazancı üzerinden."
translationKey: "cheap-inference-expensive-judgment"
cover: "/images/reasoning/line-shaft.svg"
coverAlt: "Tavandaki tek bir mile kayışlarla bağlanmış fabrika makineleri — ondokuzuncu yüzyılın grup tahrik düzeni"
draft: false
---

1899'da Amerikan imalat sanayiinde elektrik motorları kurulu beygir gücünün yüzde beşinden azını oluşturuyordu. 1919'da bu oran yüzde elli beşe çıkmıştı. Aradaki yirmi yılda verimlilikte kayda değer bir şey olmadı.

Teknoloji oradaydı. Fabrikalar onu satın almıştı. Sonuç gelmedi.

## Tez

Çıkarımın — bir modelin yeni bir girdi karşısında çıktı üretmesinin — maliyeti çökmeye devam edecek. Bunu kesin görüyoruz; aşağıda hesabı var. Ama asıl mesele şu: **değer, ucuz çıkarımı üretenlerde değil, karar süreçlerini onun etrafında yeniden kuranlarda birikecek.**

Geleceğin en değerli şirketleri, çıkarım kalitesini artırarak daha doğru çıkarımda bulunan modeller olacak. Bunu şuna genişletiyoruz: aynı şey o modelleri kullanan şirketler için de geçerli. Ölçü "daha çok token" değil, "daha doğru hüküm" — ve bu, bir satın alma kalemi değil, bir örgütlenme meselesi.

Bu ayrımı önemsiyoruz çünkü yatırımcı olarak baktığımız şey teknolojinin kendisi değil, onu kimin kâra çevireceği.

## Fiyat neden düşüyor

Epoch AI, altı ayrı ölçütte belirli bir performans seviyesini yakalamanın fiyatını üç yıl boyunca izledi. Bulgu: fiyatlar yılda 9 kat ile 900 kat arasında düşüyor, medyan 50 kat. GPT-4'ün doktora düzeyi fen sorularındaki performansını yakalamanın maliyeti yılda 40 kat azalmış. Dahası, en hızlı düşüşler Ocak 2024'ten sonra başlıyor: o tarihten önceki veriler çıkarıldığında medyan 50 kattan 200 kata çıkıyor. Düşüş yavaşlamıyor, hızlanıyor.

Epoch'un kendi uyarısını da aktaralım, çünkü bu tür bir rakamı uyarısız aktarmak yanıltıcı olur: en hızlı düşüşler son bir yılda gerçekleşti, dolayısıyla sürüp sürmeyeceği belirsiz.

Bu düşüş sihir değil, mühendislik. Üç kalemde toplanıyor.

Birincisi, modeller küçülüyor. Aynı işi daha az parametreyle yapan mimariler ve ağırlıkları daha düşük hassasiyette saklayan sıkıştırma yöntemleri, hesap maliyetini doğrudan indiriyor.

İkincisi, üretim biçimi değişiyor. Metin üretimi doğası gereği seri bir iştir: model tokenları tek tek üretir, her biri bir öncekini bekler. Speculative decoding bu zinciri kırıyor — küçük ve hızlı bir "taslak" model birkaç tokenı önden öneriyor, büyük model bunları tek seferde paralel doğruluyor. Yöntemi tanıtan çalışma T5-XXL üzerinde iki ila üç kat hızlanma ölçtü ve kritik olarak, çıktılar birebir aynı kaldı. Kaliteden feragat edilmeden hız kazanılıyor.

Üçüncüsü ve en az konuşulanı: çıkarım bir hesap gücü problemi değil, bir bellek yönetimi problemidir. Model üretim yaparken önceki tokenların temsilini bellekte tutar; aynı anda birden çok isteğe hizmet edildiğinde her istek için ayrı bir alan gerekir. Optimizasyonun büyük kısmı "daha çok işlem gücü"nden değil, bu belleğin daha akıllı kullanılmasından geliyor.

Bu üçü birlikte çalıştığında ortaya çıkan şey, teknoloji tarihinde tanıdık bir eğri: bir hizmetin birim maliyetinin, kalitesi düşmeden, on yıllar boyunca üstel biçimde gerilemesi.

Nordhaus'un aydınlatma çalışması aynı eğrinin uzun vadeli bir örneğidir. Bin lümen ışığın fiyatı 1800'de 785 dolardı; 1992'de 23 sente inmişti. Yüzde 99,97'lik bir düşüş. Nordhaus'un asıl vurgusu şuydu: bu düşüş resmî istatistiklere tam yansımadığı için ekonomistler gerçek büyümeyi olduğundan düşük ölçtüler. Fiyatı çöken şeyin yarattığı değer, çoğu zaman ölçüldüğünden büyüktür.

## Otuz yıl bekleyen kazanç

Şimdi baştaki rakama dönelim.

Elektrik, sanayi tarihinin en bariz verimlilik hamlesi gibi görünür. Öyle olmadı. Paul David'in çalışması, elektrifikasyonun otuz yıldan fazla süre boyunca kayda değer bir verimlilik kazancı üretmediğini gösterir. Sebep teknolojide değildi.

Ondokuzuncu yüzyıl fabrikası "grup tahrik" mantığıyla kurulmuştu: tek bir büyük güç kaynağı — su çarkı ya da buhar makinesi — tavandaki uzun bir mile bağlıydı, makineler bu milden kayış kasnaklarla çalışırdı. Fabrikanın yerleşimi güç kaynağına göre belirlenirdi; makineler mile yakın olmak zorundaydı.

Elektrik geldiğinde fabrikalar en makul şeyi yaptılar: buhar makinesini söküp yerine bir dinamo koydular. Mil orada kaldı. Kayışlar orada kaldı. Yerleşim orada kaldı. Yeni bir teknik sistem, eski bir katmanın üzerine serilmişti.

Kırılma 1920'lerde geldi ve adı "birim tahrik"ti: her makineye kendi motoru. Bu, motoru bir yedek parça olmaktan çıkarıp fabrikanın tasarım varsayımını değiştirdi. Makineler artık güç kaynağının etrafında değil, **malzemenin akışına göre** dizilebiliyordu. Aydınlık, esnek, yeniden düzenlenebilir bir tesis ortaya çıktı. 1920'lerde elektrifikasyon, imalattaki verimlilik artışının yaklaşık yarısını tek başına açıkladı.

David'in çıkardığı sonuç, bu yazının omurgası: yeni teknolojiler ölçülebilir verimlilik üretmeden önce tamamlayıcı örgütsel değişim gerektirir. İş akışı, beceri, yönetim pratiği. Motor satın almak kolaydı; fabrikayı yeniden düşünmek otuz yıl aldı.

Bugün çoğu şirketin yaptığı şey buhar makinesini dinamoyla değiştirmektir. Var olan sürece bir model ekleniyor: rapor özetleniyor, e-posta yazdırılıyor, çağrı merkezi kısmen otomatikleşiyor. Süreç aynı süreç. Mil hâlâ tavanda.

## Deneyimsel Çıkarım

Her büyük olayın ikinci ve üçüncü etkilerini düşünmek, daha önce yazdığımız derslerden biri.

Bugünkü modellerin zayıf olduğu yer bilgi değil, **derinlik**. Bir tanı kiti şirketini incelerken asıl mesele cihazın satılması değil, o cihazın tükettiği kitlerin tekrar eden gelir üretmesidir; kurulu cihaz tabanı büyüdükçe kit geliri kartopu gibi büyür. Sektörde tekel konumunda birçok şirket varken hangisinin neden sürdürülebilir bir rekabet avantajına sahip olacağını bugünkü modeller söyleyemiyor. Otel işletmesinde odaları erken satıp nakdi kışın başka bir yerde değerlendirmenin, yaz aylarında havuz başı gelirle yeni nakit girişi sağlamanın ne demek olduğunu üretemiyor. Bir eğitmenin 2022'de yazdığıyla 2024'te yazdığını karşılaştırıp zihninin evrildiğini mi, filtrelerinin kalitelendiğini mi, yoksa bir döngüde mi olduğunu çıkaramıyor.

Bunlar bilgi eksikliği değil, çıkarım eksikliği. Model veriyi görüyor, hükmü kuramıyor.

**"Deneyimsel bilgi ve analiz pahalı kıt bir kaynaktır."** Bugün bir şirketi derinlemesine incelemek zaman, deneyim ve erişim gerektirir; bu yüzden ciddi analiz azdır ve bu azlık kendisi bir avantaj kaynağıdır.

## Fiyatta ne var

Konsensüs, çok para harcanacağı konusunda hemfikir. Wall Street'in 2026 için hyperscaler sermaye harcaması beklentisi 527 milyar dolar civarında; en büyük beş şirketin kendi rehberliği 635-690 milyar dolar aralığında, 2024 seviyesinin iki katından fazla.

İlginç olan, konsensüsün iki yıldır düşük kalmış olması. Goldman Sachs'ın notuna göre 2024 ve 2025 başlarında beklenti yaklaşık yüzde 20 capex büyümesi ima ediyordu; gerçekleşen her iki yılda da yüzde 50'yi aştı.

Yani "AI'a çok para harcanacak" fikri fiyatta. Ayrışmamız orada değil.

Bizim ayrıştığımız yer şu: piyasa harcamayı ve altyapıyı fiyatlıyor, **karar kalitesindeki değişimi** fiyatlamıyor. Bir şirketin sunucu kiralaması ölçülebilir ve raporlanabilir; süreçlerini yeniden tasarlaması ölçülemez ve çeyreklik sunumda görünmez. Elektrifikasyonda da böyleydi: dinamo satın almak bilançoda görünüyordu, birim tahrike geçiş görünmüyordu. Kazanç ikincisinden geldi.

## Karşı argümanın en güçlü hali

Bu tezin en sert eleştirisi teknolojik değil, muhasebesel.

2025'te AI ile ilgili hizmetlerin ürettiği gelir kabaca 25 milyar dolardı; aynı dönemde altyapıya 250 milyar doların üzerinde harcandı. Yani harcanan her capex dolarına karşılık yaklaşık on sent gelir. Bir hesaba göre ayrıca hyperscaler'ların imzalanmış ama henüz başlamamış veri merkezi kira taahhütleri 662 milyar dolar civarında ve muhasebe standartları gereği bilanço dışında duruyor; bu tutar aynı şirketlerin bilanço içi borç toplamından büyük.

Bu itiraz ciddidir ve kolay cevabı yoktur. Demiryolu ve fiber optik döşemesinde de vizyon doğruydu; sermayeyi koyanların çoğu batmıştı, kazanç sonraki sahiplere kaldı.

Verebileceğimiz cevap kısmi: harcamanın büyüklüğü tezi çürütmez, **zamanlamayı** vurur. Ucuzlama eğrisi capex'ten bağımsız çalışıyor — algoritmik verimlilik, model küçültme ve daha iyi bellek yönetimi, yeni veri merkezi kurulmadan da maliyeti düşürüyor. Ama bu cevap "kim kazanacak" sorusunu yanıtlamıyor ve biz de yanıtlayamıyoruz. Açık bırakıyoruz.

## Zamanlama tuzağı

Yön ile tarih ayrı şeylerdir. Yöne iddialıyız, tarihe alçakgönüllü.

Elektrifikasyon örneği burada uyarı işlevi görüyor. Yön 1899'da doğruydu. Motor payı yüzde beşten yüzde elli beşe çıkarken görülebiliyordu. Kazanç yirmi-otuz yıl sonra geldi. O aralıkta doğru tezle yanlış zamanlamanın farkı, yatırımcı için iflas ile servet arasındaki farktır.

Erken olmak, sonucu itibarıyla yanılmaktan ayırt edilemez.

## Konumlanma

Bu görüş bizde bir hisse tercihine değil, bir soru setine dönüşüyor. Bir şirkete baktığımızda artık şunu da soruyoruz: bu yönetim, teknolojiyi mevcut sürecin üzerine mi seriyor, yoksa süreci yeniden mi kuruyor? Geçmişte kaçırdığı teknolojik dalgalar var mı, varsa neden kaçırdı?

Bu soru bizi tekel konumundaki bir şirketin neden gerçekten korunaklı olduğunu anlamaya zorluyor — kendi çıkarım kalitemizi test eden bir alıştırma. Aynı veriyi bir zihin "fırsat", diğeri "tehdit", üçüncüsü "gürültü" okur; fark iç modelin kalitesindedir. Makinelerin çıkarımı ucuzlarken bizimkini geliştirmemek tuhaf bir tembellik olurdu. Kendi çıkarım kalitemiz üzerinden çok ciddi anlamda çalışıyoruz.

Herkes en büyük yapay zekâyı yapmaya çalışıyor; bizim en çok önemsediğimiz, karar kalitesine ve çıkarım kalitesini artırmaya odaklanmış yapay zekâ şirketleri. Aynı zamanda bunu takip edip kendi kural tabanlı özel geliştirmeleriyle işlerine yapay zekâyı entegre etmeyi sürdüren şirketleri de izliyoruz.

Son olarak, insanda ağır basan aidiyet duygusuna bağlı kötü çıkarım kalitesinin toplulukların refahını engelleme durumunun, yapay zekâ ile bir nebze de olsa ortadan kalkacağını düşünüyoruz.

Mil hâlâ tavandaysa ilgilenmiyoruz.
