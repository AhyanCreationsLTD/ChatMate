/**
 * ChatMate Global Configuration
 * Security Note: In a production environment, use environment variables.
 */

// 1. Supabase Credentials
const SB_URL = 'https://bhhedtjivhgercmepnrh.supabase.co';
const SB_KEY = 'sb_secret_Lpf49MutMfjzxoKJ4g9zMA_lKZLnici'; // আপনার সিক্রেট কি

// ২. সুপাবেস ক্লায়েন্ট ইনিশিয়ালাইজেশন (এরর হ্যান্ডলিং সহ)
if (typeof supabase === 'undefined') {
    console.error("Supabase SDK missing! Please include the CDN in your HTML.");
}
const _sb = supabase.createClient(SB_URL, SB_KEY);

// ৩. Gun.js Configuration (P2P Mesh Network)
// অতিরিক্ত রিলে যোগ করা হয়েছে যাতে একটি ডাউন থাকলেও কানেকশন থাকে
const gun = Gun({
    peers: [
        'https://gun-manhattan.herokuapp.com/gun',
        'https://relay.peer.ooo/gun',
        'https://gun-us.herokuapp.com/gun'
    ],
    localStorage: true // লোকাল স্টোরেজ এনাবল করা হয়েছে
});

// ৪. গ্লোবাল ইউজার অবজেক্ট
const user = gun.user().recall({ persist: true });

// ৫. অ্যাপ গ্লোবাল কনস্ট্যান্ট এবং ইউটিলিটি ফাংশন
const APP_SETTINGS = {
    NAME: "ChatMate",
    STORAGE_BUCKET: "avatars",
    SUPPORT_URL: "https://t.me/ChatMateHelpCenter",
    COUNTRY_CODE: "+880",
    MAX_IMAGE_SIZE: 2 * 1024 * 1024, // ২ এমবি লিমিট
};

// ৬. কমন হেল্পার ফাংশন (যা সব পেজে লাগবে)
const ChatMate = {
    // ফোন নম্বর ফরম্যাট করা
    formatPhone: (phone) => {
        let p = phone.trim();
        if(!p.startsWith('+')) p = APP_SETTINGS.COUNTRY_CODE + p.replace(/^0/, '');
        return p;
    },
    
    // অনলাইন স্ট্যাটাস আপডেট করা
    updateStatus: async (status) => {
        const myPhone = localStorage.getItem('user_phone');
        if (myPhone) {
            await _sb.from('users').update({ 
                status: status, 
                last_seen: new Date().toISOString() 
            }).eq('phone', myPhone);
        }
    },

    // সেশন চেক করা
    checkAuth: () => {
        if (!localStorage.getItem('user_phone')) {
            window.location.href = 'login.html';
        }
    }
};

// কনসোল লগ (উইট এবং স্টাইল সহ)
console.log(
    `%c 🚀 ${APP_SETTINGS.NAME} System Active | Secure P2P Mesh Node Connected `,
    "background: #00d2ff; color: #000; font-weight: bold; border-radius: 4px; padding: 2px 5px;"
);
