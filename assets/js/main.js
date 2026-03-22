// Unified scroll handler (single listener for perf)
const navbar = document.querySelector('.navbar');
const scrollProgress = document.getElementById('scrollProgress');

function onScroll() {
    const scrollY = window.scrollY;
    // Navbar
    if (navbar) {
        if (scrollY > 50) {
            navbar.classList.add('stuck');
        } else {
            navbar.classList.remove('stuck');
        }
    }
    // Scroll progress bar
    if (scrollProgress) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress.style.width = ((scrollY / docHeight) * 100) + '%';
    }
}
window.addEventListener('scroll', onScroll, { passive: true });

// Ultimate IntersectionObserver Blur Reveal
const reveals = document.querySelectorAll('.rv');
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        // Add active class to trigger the profound CSS blur-to-focus animation
        entry.target.classList.add('active');
        // Remove will-change after animation completes to free GPU memory
        setTimeout(() => {
            entry.target.style.willChange = 'auto';
        }, 1200);
        // Stop observing once revealed
        observer.unobserve(entry.target);
    });
}, revealOptions);

reveals.forEach(reveal => {
    revealObserver.observe(reveal);
});

// Ambient Blob Parallax - REMOVED for performance
// CSS keyframe animations handle ambient movement instead

// Mockup Data Updates for realism (Vault typing effect, etc)
document.addEventListener('DOMContentLoaded', () => {
    // Animate vault dots
    const dots = document.querySelectorAll('.v-dot');
    if(dots.length > 0) {
        let currentDot = 0;
        setInterval(() => {
            dots.forEach(d => d.classList.remove('filled'));
            for(let i=0; i<=currentDot; i++) {
                if(dots[i]) dots[i].classList.add('filled');
            }
            currentDot++;
            if(currentDot >= dots.length) {
                setTimeout(() => { currentDot = 0; }, 2000);
            }
        }, 800);
    }
    
    // Animate Chart Bars
    const bars = document.querySelectorAll('.d-bar');
    bars.forEach(bar => {
        setInterval(() => {
            const newHeight = 30 + Math.random() * 70;
            bar.style.height = `${newHeight}%`;
        }, 2500 + Math.random() * 1000);
    });
});

// ==========================================
// I18N (MULTI-LANGUAGE SUPPORT)
// ==========================================
const translations = {
    tr: {
        "nav.features": "Özellikler",
        "nav.community": "Topluluk",
        "nav.premium": "Premium",
        "nav.download": "İndir",

        "hero.kicker": "Yapay Zeka Destekli Premium Günlük",
        "hero.h1": "Zihninizdeki <em>sesi</em><br>nihayet duyun.",
        "hero.sub": "Duygularınızı analiz eden, güvenli bir şekilde saklayan ve sizinle birlikte evrilen en akıllı günlük arkadaşınız. Sadece yazın, gerisini Cotidie'ye bırakın.",
        "hero.proof": "<strong>100+</strong> Kişi zihnini keşfediyor",

        "phone.mood": "Mod Analizi",
        "phone.peaceful": "<span style=\"font-size: 1.2rem;\">✧</span> Huzurlu",
        "phone.vault": "Vault Status",
        "phone.encrypted": "<span style=\"font-size: 1.2rem;\">🔒</span> Şifreli",

        "mq.ai": "Yapay Zeka Asistanı <div class=\"mq-dot\"></div>",
        "mq.vault": "Şifreli Kasa <div class=\"mq-dot\"></div>",
        "mq.analysis": "Duygu Analizi <div class=\"mq-dot\"></div>",
        "mq.voice": "Sesli Dikte <div class=\"mq-dot\"></div>",
        "mq.time": "Zaman Kapsülü <div class=\"mq-dot\"></div>",
        "mq.privacy": "Gelişmiş Gizlilik <div class=\"mq-dot\"></div>",
        "mq.metrics": "Zihin İstatistikleri <div class=\"mq-dot\"></div>",
        "mq.journal": "Akıllı Günlük <div class=\"mq-dot\"></div>",
        "mq.prompts": "İlham Soruları <div class=\"mq-dot\"></div>",
        "mq.design": "Premium Arayüz <div class=\"mq-dot\"></div>",

        "feat.title": "Her detayıyla <em>kusursuz.</em>",
        "feat.sub": "Cotidie, sadece bir uygulama değil; zihninizin dijital bir uzantısıdır. Sizi anlar, korur ve geliştirir.",

        "card.ai.tag": "AI Companion",
        "card.ai.title": "Geçmişinizle<br>sohbet edin.",
        "card.ai.desc": "Cotidie, yazarlarınızın ruhunu anlar ve size en doğru anda ayna tutar.",
        "card.ai.msg1": "Bugün işte çok yoruldum, hiçbir şey başaramamış gibi hissediyorum.",
        "card.ai.msg2": "Geçen hafta bitirdiğin o büyük projeyi hatırla. Dinlenmek de başarmanın bir parçasıdır.",

        "card.vault.tag": "Kriptografik Güvenlik",
        "card.vault.title": "Sırlarınız sadece size ait.",
        "card.vault.desc": "Yalnızca sizin parmak iziniz veya yüzünüz ile açılabilen aşılmaz şifreli kasanız.",
        "card.vault.pin": "PIN <span>Girin</span>",

        "card.dash.tag": "Derin Analiz",
        "card.dash.title": "Kendi zihninizi keşfedin.",
        "card.dash.desc": "Zamanla büyüyen duygu eğilimleriniz ve düşünce haritanızla kendinizle yeniden tanışın.",
        "card.dash.stat1": "En yoğun hissiyat",
        "card.dash.val1": "Huzurlu",
        "card.dash.stat2": "Günlük Kelime",

        "card.streak.tag": "Zihin Akışı",
        "card.streak.title": "Zinciri<br>kırmayın.",
        "card.streak.desc": "Her gün bir satır bile olsa yazmak, size kendi zihninizin anahtarını verir.",
        "card.streak.lbl": "Gün Seri",

        "card.voice.tag": "Sesli Dikte",
        "card.voice.title": "Konuşun, o yazsın.",
        "card.voice.desc": "Yazamayacak kadar yorgun olduğunuz anlarda düşüncelerinizi sesli olarak aktarın, Cotidie sizin için hatasızca metne ve günlüğe dönüştürür.",

        "proof.desc1": "Bugüne kadar güvenle şifrelenip saklanan toplam kelime sayısı.",
        "proof.desc2": "Düzenli kullanıcılarımızın stres seviyelerinde hissettiği azalma oranı.",
        "proof.desc3": "Kullanıcılarımızdan gelen harika yorumların ortalaması.",

        "test.title": "Topluluğumuzun <em>Sesleri.</em>",
        "test.sub": "Onların hikayeleri, Cotidie'nin gerçek gücünü anlatıyor.",
        
        "test.1.body": "Eskiden günlük yazmaya üşenirdim. Cotidie'nin bana sorduğu akıllı sorular beni kendi içime çekiyor. İnanılmaz bir deneyim.",
        "test.1.type": "Premium Üye",
        "test.2.body": "Arayüzdeki renkler, karanlık mod... Her şey o kadar premium hissettiriyor ki her gün açmak istiyorum.",
        "test.3.body": "Düşüncelerimi sadece yazıya dökmekle kalmıyorum, geçmişimle konuşabiliyorum. Yıllık plan sonuna kadar hak ediyor.",
        "test.4.body": "Secret Vault özelliği sayesinde uygulamanın telefonumda başkasının eline geçmesi korkusunu tamamen yendim.",
        "test.5.body": "Geceleri çok yorgun olduğumda sadece sesli dikteye konuşuyorum. O kadar kusursuz aktarıyor ki, sanki beni anlıyor.",

        "pricing.title": "Sınırları <em>kaldırın.</em>",
        "pricing.subtitle": "Yazarak keşfet, AI ile derinleş. Sınırları kaldır, tam deneyimi aç.",
        "pricing.monthly.name": "Aylık Plan",
        "pricing.monthly.price": "79,99",
        "pricing.monthly.normal": "99,99",
        "pricing.monthly.badge": "İNDİRİMLİ",
        "pricing.monthly.per": "İstediğin an iptal.",
        "pricing.annual.badge": "En Popüler · %41 Tasarruf",
        "pricing.annual.name": "Yıllık Plan",
        "pricing.annual.normal": "1.200",
        "pricing.annual.price": "699,99",
        "pricing.annual.per": "Yıllık faturalandırılır (Aylık 58₺'ye denk gelir)",
        "pricing.features.ai": "Sınırsız AI Sohbeti",
        "pricing.features.vault": "Secret Vault Erişimi",
        "pricing.features.analysis": "Derin Duygu Analizi",
        "pricing.features.tools": "Premium Yaratıcı Araçlar",
        "pricing.features.dictation": "Sınırsız Sesli Dikte",
        "pricing.features.priority": "Öncelikli Yeni Özellikler",
        "pricing.cta": "7 Gün Ücretsiz Başla",
        "pricing.cta_annual": "Hemen Başla",

        "compare.title": "Planları Karşılaştırın",
        "compare.free": "Ücretsiz Plan",
        "compare.premium": "Premium Plan",
        "compare.feature.core": "Temel Günlük Yazımı",
        "compare.feature.mood": "Günlük Ruh Hali Takibi",
        "compare.feature.pin": "Pin & Biyometrik Kilit",
        "compare.feature.basic_stat": "Temel İstatistikler",
        "compare.feature.analysis": "Detaylı Duygu Analizi",
        "compare.feature.chat": "Sınırsız AI Sohbeti",
        "compare.feature.vault": "Şifreli Kasa",
        "compare.feature.tools": "Premium Yaratıcı Araçlar",
        "compare.feature.voice": "Sesli Dikte",
        "compare.feature.priority": "Öncelikli Yeni Özellikler",

        "fcta.kicker": "Geç Kalmadan",
        "fcta.title": "Kendi hikayenizi<br>yazmaya başlayın.",
        "fcta.desc": "Cotidie, uygulamanın ötesindedir. Sizi gerçekten dinleyen ve gizliliğinize en üst düzeyde önem veren bir sırdaştır.",

        "footer.desc": "The Living Liquid AI Journal.<br>Zihniniz için premium yazılım.",
        "footer.prod": "Ürün",
        "footer.legal": "Legal",
        "footer.support": "Destek",
        "footer.terms": "Kullanım Koşulları",
        "footer.privacy": "Gizlilik Politikası",
        "footer.help": "Yardım Merkezi",
        "footer.contact": "İletişim"
    },
    en: {
        "nav.features": "Features",
        "nav.community": "Community",
        "nav.premium": "Premium",
        "nav.download": "Download",

        "hero.kicker": "AI-Powered Premium Journal",
        "hero.h1": "Finally hear the <em>voice</em><br>in your mind.",
        "hero.sub": "The smartest journal that analyzes your emotions, stores them securely, and evolves with you. Just write, Cotidie does the rest.",
        "hero.proof": "<strong>100+</strong> People exploring their minds",

        "phone.mood": "Mood Analysis",
        "phone.peaceful": "<span style=\"font-size: 1.2rem;\">✧</span> Peaceful",
        "phone.vault": "Vault Status",
        "phone.encrypted": "<span style=\"font-size: 1.2rem;\">🔒</span> Encrypted",

        "mq.ai": "AI Assistant <div class=\"mq-dot\"></div>",
        "mq.vault": "Encrypted Vault <div class=\"mq-dot\"></div>",
        "mq.analysis": "Emotion Analysis <div class=\"mq-dot\"></div>",
        "mq.voice": "Voice Dictation <div class=\"mq-dot\"></div>",
        "mq.time": "Time Capsule <div class=\"mq-dot\"></div>",
        "mq.privacy": "Advanced Privacy <div class=\"mq-dot\"></div>",
        "mq.metrics": "Mind Metrics <div class=\"mq-dot\"></div>",
        "mq.journal": "Smart Journal <div class=\"mq-dot\"></div>",
        "mq.prompts": "Insightful Prompts <div class=\"mq-dot\"></div>",
        "mq.design": "Premium Interface <div class=\"mq-dot\"></div>",

        "feat.title": "Flawless in every <em>detail.</em>",
        "feat.sub": "Cotidie is not just an app; it's a digital extension of your mind. It understands, protects, and improves you.",

        "card.ai.tag": "AI Companion",
        "card.ai.title": "Chat with your<br>past.",
        "card.ai.desc": "Cotidie understands the soul of your writings and holds a mirror up to you at the right moment.",
        "card.ai.msg1": "I was so tired at work today, I feel like I haven't accomplished anything.",
        "card.ai.msg2": "Remember that huge project you finished last week. Resting is a part of succeeding.",

        "card.vault.tag": "Cryptographic Security",
        "card.vault.title": "Your secrets are strictly yours.",
        "card.vault.desc": "Your impenetrable encrypted vault that can only be unlocked with your fingerprint or face.",
        "card.vault.pin": "Enter <span>PIN</span>",

        "card.dash.tag": "Deep Analysis",
        "card.dash.title": "Discover your own mind.",
        "card.dash.desc": "Get to know yourself again with your growing emotional trends and thought maps over time.",
        "card.dash.stat1": "Most dominant feel",
        "card.dash.val1": "Peaceful",
        "card.dash.stat2": "Daily Words",

        "card.streak.tag": "Mind Flow",
        "card.streak.title": "Don't break<br>the chain.",
        "card.streak.desc": "Writing even a single line every day gives you the key to your own mind.",
        "card.streak.lbl": "Day Streak",

        "card.voice.tag": "Voice Dictation",
        "card.voice.title": "Speak, it writes.",
        "card.voice.desc": "When you are too tired to write, just dictate your thoughts. Cotidie flawlessly transcribes them into text and saves them to your journal.",

        "proof.desc1": "Total number of words securely encrypted and stored so far.",
        "proof.desc2": "The rate at which our regular users feel a reduction in their stress levels.",
        "proof.desc3": "The average of amazing reviews from our users.",

        "test.title": "Voices of our <em>Community.</em>",
        "test.sub": "Their stories tell the true power of Cotidie.",
        
        "test.1.body": "I used to be too lazy to write a journal. The smart questions Cotidie asks me draw me into myself. An incredible experience.",
        "test.1.type": "Premium Member",
        "test.2.body": "The colors in the interface, the dark mode... Everything feels so premium that I want to open it every day.",
        "test.3.body": "Not only do I put my thoughts into writing, I can talk to my past. The annual plan is totally worth it.",
        "test.4.body": "Thanks to the Secret Vault feature, I completely overcame my fear of the app falling into someone else's hands on my phone.",
        "test.5.body": "When I am very tired at night, I just use voice dictation. It transcribes so flawlessly, it's as if it understands me.",

        "pricing.title": "Remove <em>limits.</em>",
        "pricing.subtitle": "Explore by writing, deepen with AI. Remove boundaries, unlock the full experience.",
        "pricing.monthly.name": "Monthly Plan",
        "pricing.monthly.price": "7.99",
        "pricing.monthly.normal": "11.99",
        "pricing.monthly.badge": "DISCOUNTED",
        "pricing.monthly.per": "Cancel anytime.",
        "pricing.annual.badge": "Most Popular · Save 58%",
        "pricing.annual.name": "Annual Plan",
        "pricing.annual.normal": "143.88",
        "pricing.annual.price": "59.99",
        "pricing.annual.per": "Billed annually (equivalent to $4.99/month)",
        "pricing.features.ai": "Unlimited AI Chat",
        "pricing.features.vault": "Secret Vault Access",
        "pricing.features.analysis": "Deep Emotion Analysis",
        "pricing.features.tools": "Premium Creative Tools",
        "pricing.features.dictation": "Unlimited Voice Dictation",
        "pricing.features.priority": "Priority New Features",
        "pricing.cta": "Start 7-Day Free Trial",
        "pricing.cta_annual": "Start Now",

        "fcta.kicker": "Before It's Too Late",
        "fcta.title": "Start writing<br>your own story.",
        "fcta.desc": "Cotidie goes beyond being an app. It is a confidant that truly listens to you and values your privacy to the highest degree.",

        "footer.desc": "The Living Liquid AI Journal.<br>Premium software for your mind.",
        "footer.prod": "Product",
        "footer.legal": "Legal",
        "footer.support": "Support",
        "footer.terms": "Terms of Use",
        "footer.privacy": "Privacy Policy",
        "footer.help": "Help Center",
        "footer.contact": "Contact"
    }
};

let currentLang = 'tr';

const langToggle = document.getElementById('langToggle');
const langMenu = document.getElementById('langMenu');
const doc = document.documentElement;

if (langToggle && langMenu) {
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('show');
    });

    document.documentElement.addEventListener('click', () => {
        langMenu.classList.remove('show');
    });

    // Handle Language Switching
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            setLanguage(lang);
            langMenu.classList.remove('show');
        });
    });
}

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    doc.lang = lang;
    
    // Update Button Text
    if(langToggle) langToggle.innerHTML = `${lang.toUpperCase()} ▾`;

    // Update Currency Symbols depending on region
    const currencySymbols = document.querySelectorAll('.cur');
    currencySymbols.forEach(c => {
        c.textContent = lang === 'en' ? '$' : '₺';
    });

    // Translate all tagged elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key]; 
        }
    });
}

// Ensure currency is right on first load
setLanguage(currentLang);

// ==========================================
// HAMBURGER MENU (MOBILE)
// ==========================================
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('mobile-open');
        hamburgerBtn.classList.toggle('active');
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
        hamburgerBtn.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when a nav link is clicked
    navLinks.querySelectorAll('a:not(.lang-menu a)').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('mobile-open')) {
                navLinks.classList.remove('mobile-open');
                hamburgerBtn.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.setAttribute('aria-label', 'Menüyü aç');
                document.body.style.overflow = '';
            }
        });
    });
}

// ==========================================
// DYNAMIC FOOTER YEAR
// ==========================================
const footerYear = document.getElementById('footerYear');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

// ==========================================
// VISUAL EFFECT 1: CURSOR GLOW
// ==========================================
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let rafPending = false;
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!cursorGlow.classList.contains('active')) {
            cursorGlow.classList.add('active');
        }
        if (!rafPending) {
            rafPending = true;
            requestAnimationFrame(() => {
                cursorGlow.style.transform = `translate3d(${mouseX - 150}px, ${mouseY - 150}px, 0)`;
                rafPending = false;
            });
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
    });
}

// Scroll progress — handled by unified scroll handler above

// ==========================================
// VISUAL EFFECT 3: ANIMATED NUMBER COUNTER
// ==========================================
function animateCounter(element, target, suffix, duration) {
    let start = 0;
    const isFloat = target % 1 !== 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (target - start) * eased;

        if (isFloat) {
            element.innerHTML = current.toFixed(1) + '<em>' + suffix + '</em>';
        } else {
            element.innerHTML = Math.round(current) + '<em>' + suffix + '</em>';
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

const proofNums = document.querySelectorAll('.proof-num');
if (proofNums.length > 0) {
    const counterData = [
        { target: 1.2, suffix: 'M' },
        { target: 80, suffix: '%' },
        { target: 4.9, suffix: '★' }
    ];

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const index = Array.from(proofNums).indexOf(entry.target);
            if (index !== -1 && counterData[index]) {
                animateCounter(entry.target, counterData[index].target, counterData[index].suffix, 2000);
            }
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.3 });

    proofNums.forEach(num => counterObserver.observe(num));
}

// ==========================================
// VISUAL EFFECT 4: HERO MORPH WORD
// ==========================================
const morphWord = document.getElementById('morphWord');
if (morphWord) {
    const words = ['yazın', 'düşünün', 'konuşun', 'hissedin', 'keşfedin'];
    let wordIndex = 0;

    setInterval(() => {
        morphWord.classList.add('fade-out');
        
        setTimeout(() => {
            wordIndex = (wordIndex + 1) % words.length;
            morphWord.textContent = words[wordIndex];
            morphWord.classList.remove('fade-out');
            morphWord.classList.add('fade-in');
            
            setTimeout(() => {
                morphWord.classList.remove('fade-in');
            }, 400);
        }, 400);
    }, 2500);
}

// 3D TILT — Now handled by CSS-only hover transform (zero JS = zero jank)
// See .b-card:hover in styles.css
