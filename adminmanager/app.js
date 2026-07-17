// =========================================================================
// STATE MANAGEMENT & DATA SEEDING
// =========================================================================

// Default templates
const DEFAULT_TEMPLATES = {
    CLIENT_CONFIRM: `สวัสดีค่ะ คุณ{client_name} ❤️ คอนเฟิร์มการจองคอร์สสปาของ MOMOMOM WELLNESS นะคะ
🗓 วันที่: {date}
⏰ เวลา: {time}
💆‍♀️ ผู้ให้บริการ: {massager_name} ({massager_code})
📌 บริการ: {service} ({duration})
📍 ที่อยู่: {address}
ขอบคุณค่ะ 🙏✨`,

    MASSAGER_BROADCAST: `📢 มีงานนวดด่วนเสนอเข้ามารับงานด่วน!
🗓 วันที่: {date}
⏰ เวลา: {time}
📌 บริการ: {service} ({duration})
📍 โซนพื้นที่: {zone}
ลูกค้า: {client_code} ({guests} ท่าน) {repeated_badge}
💰 ค่าเคส: {case_fee} บาท | ATK: {atk_bonus} บาท
👉 สนใจรับงาน พิมพ์ข้อความว่า "สนใจรับงาน!!" ใต้ข้อความนี้เลย!`,

    MASSAGER_CONFIRM: `✅ คอนเฟิร์มการนัดหมายงานคุณหมอ {massager_name} ค่ะ
รหัสงาน: {booking_code}
🗓 วันที่: {date}
⏰ เวลา: {time}
📌 บริการ: {service} ({duration})
📍 ลูกค้า: คุณ{client_name} (เบอร์ {client_phone})
🗺 พิกัด: {map_link}
🏠 ที่อยู่: {address}
⚠️ หมายเหตุ: {client_note}
💰 รายละเอียดรายได้: ค่านวด {case_fee}บ. | ATK {atk_bonus}บ. | โบนัสเรียกซ้ำ {repeat_bonus}บ.
🔔 กรุณาอัปเดตสถานะ "ถึงแล้ว" และ "ปิดงานแล้ว" ผ่าน Rich Menu นะคะ`
};

// Seed Data
const SEED_CLIENTS = [
    {
        line_user_id: 'line_client_001',
        client_id: 'MOM-0001',
        name: 'ธิดารัตน์ แก้วใส',
        phone: '0891234567',
        address: '123/45 คอนโดวิสต้า ชั้น 12 ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ',
        google_map_link: 'https://maps.app.goo.gl/abcdefg12345',
        massage_level: 'ปานกลาง (Medium)',
        pets_info: 'สุนัขพันธุ์ปอม (อยู่ในกรงขณะรับบริการ)',
        notes: 'ปวดหลังบ่าไหล่รุนแรง ออฟฟิศซินโดรม'
    },
    {
        line_user_id: 'line_client_002',
        client_id: 'MOM-0002',
        name: 'ณิชาภัทร เลิศล้ำ',
        phone: '0959876543',
        address: '55/9 หมู่บ้านแกรนด์วิลล์ ซอยลาดพร้าว 71 แขวงสะพานสอง เขตวังทองหลาง กรุงเทพฯ',
        google_map_link: 'https://maps.app.goo.gl/xyz789',
        massage_level: 'หนัก (Firm)',
        pets_info: 'ไม่มีสัตว์เลี้ยง',
        notes: 'ขอหมอน้ำหนักดีๆ เน้นนวดฝ่าเท้า'
    }
];

const SEED_MASSAGERS = [
    {
        line_user_id: 'line_massager_001',
        massager_id: 'MCA-00001',
        name: 'หมอนิด นวดแผนไทย',
        phone: '0821112222',
        zone: 'กรุงเทพชั้นใน (สุขุมวิท/สาทร)',
        rating_stars: 4.8,
        rating_score: 9,
        is_active: true
    },
    {
        line_user_id: 'line_massager_002',
        massager_id: 'MCA-00002',
        name: 'หมอบี อโรมาเธอราพี',
        phone: '0834445555',
        zone: 'ลาดพร้าว/รามคำแหง',
        rating_stars: 5.0,
        rating_score: 10,
        is_active: true
    },
    {
        line_user_id: 'line_massager_003',
        massager_id: 'MCA-00003',
        name: 'หมอวรรณ นวดคุณแม่ตั้งครรภ์',
        phone: '0847778888',
        zone: 'นนทบุรี/งามวงศ์วาน',
        rating_stars: 4.5,
        rating_score: 8,
        is_active: true
    }
];

// สร้างข้อมูลวันที่ตัวอย่างโดยอ้างอิงวันที่ปัจจุบัน
const todayStr = new Date().toISOString().split('T')[0];
const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];

const SEED_BOOKINGS = [
    {
        booking_id: `MO${todayStr.replace(/-/g, '').substring(2)}-001`,
        client_line_id: 'line_client_001',
        massager_line_id: 'line_massager_001',
        appointment_date: todayStr,
        appointment_time: '14:00',
        service_type: 'นวดไทยโบราณ',
        course_duration: '90 นาที',
        package_name: 'คอร์สนวดไทยแก้อาการ 90 นาที',
        guests_count: 1,
        pregnancy_weeks: 0,
        address: '123/45 คอนโดวิสต้า ชั้น 12 ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ',
        google_map_link: 'https://maps.app.goo.gl/abcdefg12345',
        massage_level: 'ปานกลาง (Medium)',
        pets: 'สุนัขพันธุ์ปอม (อยู่ในกรงขณะรับบริการ)',
        client_note: 'ปวดหลังบ่าไหล่รุนแรง ออฟฟิศซินโดรม',
        is_repeated_request: true, // Special Repeated request
        booking_status: 'assigned',
        created_at: new Date().toISOString()
    },
    {
        booking_id: `MO${todayStr.replace(/-/g, '').substring(2)}-002`,
        client_line_id: 'line_client_002',
        massager_line_id: null,
        appointment_date: todayStr,
        appointment_time: '16:30',
        service_type: 'นวดอโรมา',
        course_duration: '120 นาที',
        package_name: 'สปาน้ำมันอุ่นสกัดธรรมชาติ 120 นาที',
        guests_count: 2,
        pregnancy_weeks: 0,
        address: '55/9 หมู่บ้านแกรนด์วิลล์ ซอยลาดพร้าว 71 แขวงสะพานสอง เขตวังทองหลาง กรุงเทพฯ',
        google_map_link: 'https://maps.app.goo.gl/xyz789',
        massage_level: 'หนัก (Firm)',
        pets: 'ไม่มีสัตว์เลี้ยง',
        client_note: 'ขอหมอน้ำหนักดีๆ เน้นนวดฝ่าเท้า',
        is_repeated_request: false,
        booking_status: 'broadcasting',
        created_at: new Date().toISOString()
    },
    {
        booking_id: `MO${tomorrowStr.replace(/-/g, '').substring(2)}-001`,
        client_line_id: 'line_client_001',
        massager_line_id: 'line_massager_002',
        appointment_date: tomorrowStr,
        appointment_time: '10:00',
        service_type: 'นวดอโรมา',
        course_duration: '90 นาที',
        package_name: 'คอร์สนวดน้ำมันอโรมาผ่อนคลาย 90 นาที',
        guests_count: 1,
        pregnancy_weeks: 0,
        address: '123/45 คอนโดวิสต้า ชั้น 12 ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ',
        google_map_link: 'https://maps.app.goo.gl/abcdefg12345',
        massage_level: 'ปานกลาง (Medium)',
        pets: 'สุนัขพันธุ์ปอม (อยู่ในกรงขณะรับบริการ)',
        client_note: 'ขอหมอบีคนเดิมที่เคยมาค่ะ',
        is_repeated_request: true, // Special Repeated request
        booking_status: 'assigned',
        created_at: new Date().toISOString()
    }
];

const SEED_PAYMENTS = {
    [`MO${todayStr.replace(/-/g, '').substring(2)}-001`]: {
        booking_id: `MO${todayStr.replace(/-/g, '').substring(2)}-001`,
        points_earned: 10,
        case_fee: 550.00,
        bonus: 100.00,
        bonus_atk: 50.00,
        bonus_repeat: 100.00, // Repeated Request bonus
        admin_note: 'เคสรีเควสหมอคนเดิม จ่ายค่าน้ำมันและโบนัสเรียกซ้ำเพิ่มให้หมอนิด'
    },
    [`MO${tomorrowStr.replace(/-/g, '').substring(2)}-001`]: {
        booking_id: `MO${tomorrowStr.replace(/-/g, '').substring(2)}-001`,
        points_earned: 10,
        case_fee: 600.00,
        bonus: 0.00,
        bonus_atk: 50.00,
        bonus_repeat: 100.00,
        admin_note: 'หมอบีลูกค้าจองระบุมา ได้โบนัสเรียกซ้ำ'
    }
};

const SEED_APPLIED_JOBS = [
    {
        booking_id: `MO${todayStr.replace(/-/g, '').substring(2)}-002`,
        massager_line_id: 'line_massager_002',
        applied_at: new Date().toISOString(),
        status: 'pending'
    },
    {
        booking_id: `MO${todayStr.replace(/-/g, '').substring(2)}-002`,
        massager_line_id: 'line_massager_001',
        applied_at: new Date().toISOString(),
        status: 'pending'
    }
];

// Initialize Data Storage
let clients = JSON.parse(localStorage.getItem('mom_clients')) || SEED_CLIENTS;
let massagers = JSON.parse(localStorage.getItem('mom_massagers')) || SEED_MASSAGERS;
let bookings = JSON.parse(localStorage.getItem('mom_bookings')) || SEED_BOOKINGS;
let payments = JSON.parse(localStorage.getItem('mom_payments')) || SEED_PAYMENTS;
let appliedJobs = JSON.parse(localStorage.getItem('mom_applied_jobs')) || SEED_APPLIED_JOBS;
let templates = JSON.parse(localStorage.getItem('mom_templates')) || DEFAULT_TEMPLATES;
let systemSettings = JSON.parse(localStorage.getItem('mom_settings')) || { admin_passcode: '123' };

function saveData() {
    localStorage.setItem('mom_clients', JSON.stringify(clients));
    localStorage.setItem('mom_massagers', JSON.stringify(massagers));
    localStorage.setItem('mom_bookings', JSON.stringify(bookings));
    localStorage.setItem('mom_payments', JSON.stringify(payments));
    localStorage.setItem('mom_applied_jobs', JSON.stringify(appliedJobs));
    localStorage.setItem('mom_templates', JSON.stringify(templates));
    localStorage.setItem('mom_settings', JSON.stringify(systemSettings));
}

// Simulated active state for emulator
let activeSimClientIdx = 0;
let activeSimMassagerIdx = 0;
let simulatedClientLineId = SEED_CLIENTS[0].line_user_id;
let simulatedMassagerLineId = SEED_MASSAGERS[0].line_user_id;

// Admin Auth State
let isLoggedIn = false;
let currentAdminName = 'แอดมินหมอนวด';

// Filter for bookings dashboard
let currentBookingFilter = 'all';

// =========================================================================
// SYSTEM INITIALIZATION
// =========================================================================
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('current-simulation-date').innerText = todayStr;
    
    // Check local authentication status on page load
    const authSession = sessionStorage.getItem('admin_logged_in');
    if (authSession === 'true') {
        bypassLogin();
    }
    
    // Load components/data views
    initSystem();
});

function initSystem() {
    updateSystemStats();
    renderDashboardJobs();
    buildCalendar();
    renderAppliedJobsList();
    renderMassagersTable();
    renderClientsTable();
    loadMessageTemplatesEditor();
    
    // Load simulator values
    updateLiffPackages();
    initSimulators();
}

// =========================================================================
// SECURITY & AUTHENTICATION
// =========================================================================
async function loginWithPasscode() {

    try {

        const password =
            document.getElementById("admin-passcode-input").value.trim();


        const res = await fetch("https://extruding-flashback-unblended.ngrok-free.dev/api/admin/login",{

            method:"POST",
            credentials:"include",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                password
            })

        });


        const data = await res.json();


        if(data.success){

            alert("เข้าสู่ระบบสำเร็จ");


            document
            .getElementById("admin-login-overlay")
            .classList.remove("active");


        }else{

            alert(data.message);

        }


    }catch(err){

        console.error(err);

        alert("ไม่สามารถเชื่อมต่อ Server ได้");

    }

}

if(data.success){

    alert("เข้าสู่ระบบสำเร็จ");

    document
    .getElementById("admin-login-overlay")
    .classList.remove("active");


    loadAdminProfile();

}

async function loadAdminProfile(){

    try{

        const res = await fetch(
            "https://extruding-flashback-unblended.ngrok-free.dev/api/admin/profile",
            {
                method:"GET",
                credentials:"include"
            }
        );


        const data = await res.json();


        if(data.success){

            document.getElementById("active-admin-name").textContent =
                data.admin.username;

        }else{

            document.getElementById("active-admin-name").textContent =
                "Guest";

        }


    }catch(err){

        console.error(err);

        document.getElementById("active-admin-name").textContent =
            "Guest";

    }

}

function loginWithLineMock() {
    currentAdminName = 'แอดมินปทุมวัน (LINE OA)';
    authorizeSession();
}

function authorizeSession() {
    isLoggedIn = true;
    sessionStorage.setItem('admin_logged_in', 'true');
    document.getElementById('admin-login-overlay').classList.remove('active');
    document.getElementById('active-admin-name').innerText = currentAdminName;
    showToast('เข้าสู่ระบบสำเร็จ', `ยินดีต้อนรับกลับมาค่ะคุณ ${currentAdminName}`, 'info');
    initSystem();
}

function bypassLogin() {
    isLoggedIn = true;
    currentAdminName = 'แอดมินมอนิเตอร์';
    document.getElementById('admin-login-overlay').classList.remove('active');
    document.getElementById('active-admin-name').innerText = currentAdminName;
}

function logoutAdmin() {
    isLoggedIn = false;
    sessionStorage.removeItem('admin_logged_in');
    document.getElementById('admin-login-overlay').classList.add('active');
    document.getElementById('admin-passcode-input').value = '';
}

function showRootResetView() {
    document.getElementById('login-form-view').classList.add('d-none');
    document.getElementById('root-reset-view').classList.remove('d-none');
}

function cancelRootReset() {
    document.getElementById('login-form-view').classList.remove('d-none');
    document.getElementById('root-reset-view').classList.add('d-none');
    document.getElementById('root-passcode-verify').value = '';
    document.getElementById('new-admin-passcode').value = '';
}

async function executeRootReset() {

    const oldCode = document.getElementById('root-passcode-verify').value;
    const newCode = document.getElementById('new-admin-passcode').value;

    if (!newCode || newCode.trim().length < 4) {
        showToast(
            'ตั้งค่าไม่สำเร็จ',
            'รหัสผ่านใหม่ต้องมีอย่างน้อย 4 ตัวอักษร',
            'danger'
        );
        return;
    }

    try {

        const response = await fetch('/api/admin/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldPassword: oldCode,
                newPassword: newCode
            })
        });

        const result = await response.json();

        if(result.success){

            showToast(
                'สำเร็จ',
                'เปลี่ยนรหัสผ่านเรียบร้อย',
                'success'
            );

            cancelRootReset();

        }else{

            showToast(
                'ผิดพลาด',
                result.message,
                'danger'
            );

        }

    } catch (err) {

        console.error(err);

        showToast(
            'ผิดพลาด',
            'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้',
            'danger'
        );

    }

}

// =========================================================================
// VIEW NAVIGATION
// =========================================================================
function switchView(viewName) {
    // Hide all view panels
    const panels = document.querySelectorAll('.view-panel');
    panels.forEach(p => p.classList.add('d-none'));

    // Deactivate all sidebar items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    // Show selected panel
    document.getElementById(`view-${viewName}`).classList.remove('d-none');
    document.getElementById(`nav-${viewName}`).classList.add('active');
}

// =========================================================================
// METRICS & STATS MATHEMATICS
// =========================================================================
function updateSystemStats() {
    // Total bookings count
    document.getElementById('stat-total-bookings').innerText = bookings.length;
    
    // Active bookings count ('assigned', 'arrived', 'broadcasting')
    const activeStates = ['assigned', 'arrived', 'broadcasting'];
    const activeCount = bookings.filter(b => activeStates.includes(b.booking_status)).length;
    document.getElementById('stat-active-bookings').innerText = activeCount;

    // Repeated request count
    const repeatedCount = bookings.filter(b => b.is_repeated_request === true).length;
    document.getElementById('stat-repeated-requests').innerText = repeatedCount;

    // Financial math - Total Expenses paid to Massagers
    let totalPaid = 0;
    Object.values(payments).forEach(pay => {
        // Only count payment if booking is completed (ปิดงานแล้ว)
        const job = bookings.find(b => b.booking_id === pay.booking_id);
        if (job && job.booking_status === 'completed') {
            totalPaid += (Number(pay.case_fee) || 0) + 
                         (Number(pay.bonus) || 0) + 
                         (Number(pay.bonus_atk) || 0) + 
                         (Number(pay.bonus_repeat) || 0);
        }
    });
    document.getElementById('stat-total-expenses').innerText = `฿${totalPaid.toLocaleString('th-TH', {minimumFractionDigits: 2})}`;
}

// =========================================================================
// SYSTEM TOASTS / MASSAGEAPI NOTIFICATION RENDERER
// =========================================================================
function showToast(title, text, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `floating-toast ${type === 'gold' ? 'gold' : type === 'info' ? 'info' : ''}`;
    
    const timeStr = new Date().toLocaleTimeString('th-TH', {hour: '2-digit', minute:'2-digit'});
    
    toast.innerHTML = `
        <span class="toast-close" onclick="this.parentElement.remove()">&times;</span>
        <div class="toast-header">
            <span>${title}</span>
            <span class="toast-time">${timeStr}</span>
        </div>
        <div class="toast-body">${text}</div>
    `;

    container.appendChild(toast);
    
    // Auto remove after 10s for simulations visibility
    setTimeout(() => {
        toast.remove();
    }, 10000);
}

// =========================================================================
// ADMIN CONTROL PANELS & ACTIONS
// =========================================================================

function filterBookings(status) {
    currentBookingFilter = status;
    renderDashboardJobs();
}

function renderDashboardJobs() {
    const container = document.getElementById('dashboard-jobs-container');
    container.innerHTML = '';

    let filteredBookings = bookings;
    if (currentBookingFilter !== 'all') {
        filteredBookings = bookings.filter(b => b.booking_status === currentBookingFilter);
    }

    // Sort by date, then time descending
    filteredBookings.sort((a,b) => {
        const dateA = new Date(a.appointment_date + 'T' + a.appointment_time);
        const dateB = new Date(b.appointment_date + 'T' + b.appointment_time);
        return dateA - dateB;
    });

    if (filteredBookings.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 3rem;">ไม่มีตารางงานนวดตรงตามสถานะที่เลือก</div>`;
        return;
    }

    filteredBookings.forEach(booking => {
        const client = clients.find(c => c.line_user_id === booking.client_line_id) || {};
        const massager = massagers.find(m => m.line_user_id === booking.massager_line_id) || null;
        const payment = payments[booking.booking_id] || { case_fee: 0, bonus_atk: 0, bonus_repeat: 0 };

        const isRepeated = booking.is_repeated_request;
        const cardClass = `job-card ${isRepeated ? 'repeated-request' : ''}`;
        
        const dateThai = formatDateThai(booking.appointment_date);
        
        let statusBadge = '';
        switch(booking.booking_status) {
            case 'pending_details':
                statusBadge = '<span class="job-status status-pending">รอแอดมินส่งงาน</span>';
                break;
            case 'broadcasting':
                statusBadge = '<span class="job-status status-broadcasting">หาหมอนวดอยู่</span>';
                break;
            case 'assigned':
                statusBadge = '<span class="job-status status-assigned">หมอรับงานแล้ว</span>';
                break;
            case 'arrived':
                statusBadge = '<span class="job-status status-arrived">หมอถึงที่ทำงานแล้ว</span>';
                break;
            case 'completed':
                statusBadge = '<span class="job-status status-completed">ปิดงานเรียบร้อย</span>';
                break;
            case 'cancelled':
                statusBadge = '<span class="job-status status-cancelled">ยกเลิกเคส</span>';
                break;
        }

        const massagerDisplay = massager ? `${massager.name} (${massager.massager_id})` : '<em>ยังไม่ได้จัดหาหมอ</em>';
        const clientCode = client.client_id || 'MOM-XXXX';

        let repeatBadgeHtml = '';
        if (isRepeated) {
            repeatBadgeHtml = `<div class="repeat-badge"><i class="fa-solid fa-crown"></i> รีเควสหมอคนเดิม</div>`;
        }

        const totalEarn = (Number(payment.case_fee) || 0) + (Number(payment.bonus_atk) || 0) + (Number(payment.bonus_repeat) || 0);

        const cardHtml = `
            <div class="${cardClass}">
                ${repeatBadgeHtml}
                <div class="job-header">
                    <div class="job-meta-id">
                        <span class="job-id">${booking.booking_id}</span>
                        <span class="job-client-code">รหัสลูกค้า: ${clientCode} | ${client.name || 'ไม่ทราบชื่อ'}</span>
                    </div>
                    <div>
                        ${statusBadge}
                    </div>
                </div>

                <div class="job-details-grid">
                    <div class="detail-item">
                        <i class="fa-regular fa-calendar"></i>
                        <span>${dateThai}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fa-regular fa-clock"></i>
                        <span>เวลา ${booking.appointment_time} น. (${booking.course_duration})</span>
                    </div>
                    <div class="detail-item">
                        <i class="fa-solid fa-spa"></i>
                        <span>คอร์ส: ${booking.service_type} (${booking.guests_count} ท่าน)</span>
                    </div>
                    <div class="detail-item">
                        <i class="fa-solid fa-user-doctor"></i>
                        <span>หมอนวด: ${massagerDisplay}</span>
                    </div>
                    <div class="detail-item" style="grid-column: span 2;">
                        <i class="fa-solid fa-map-location-dot"></i>
                        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">ที่อยู่: ${booking.address}</span>
                    </div>
                </div>

                <div class="job-footer">
                    <div class="job-pricing">
                        ค่าบริการหมอนวด: <span class="price-tag">฿${totalEarn.toLocaleString()}</span>
                    </div>
                    <div>
                        <button onclick="openBookingDetailModal('${booking.booking_id}')" class="btn btn-secondary btn-sm">
                            <i class="fa-solid fa-magnifying-glass"></i> ตรวจสอบงานจอง
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', cardHtml);
    });
}

function buildCalendar() {
    const container = document.getElementById('calendar-days-container');
    container.innerHTML = '';

    // Day headers
    const daysThai = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
    daysThai.forEach(d => {
        container.insertAdjacentHTML('beforeend', `<div class="calendar-day-header">${d}</div>`);
    });

    // Calendar for 2026-07-08 (July 2026 starting on Wednesday = day index 3)
    const totalDays = 31;
    const offset = 3; // Wednesday start

    // Fill offset empty cells
    for(let i=0; i<offset; i++) {
        container.insertAdjacentHTML('beforeend', `<div></div>`);
    }

    // Fill days
    for(let day=1; day<=totalDays; day++) {
        const dayStrFormatted = `2026-07-${day.toString().padStart(2, '0')}`;
        const dayBookings = bookings.filter(b => b.appointment_date === dayStrFormatted);
        
        const today = new Date().getDate();

        let isToday = (day === today) ? 'today' : '';


        let eventsHtml = '';
        dayBookings.slice(0, 2).forEach(db => {
            const isGold = db.is_repeated_request ? 'gold' : '';
            const symbol = db.is_repeated_request ? '★ ' : '● ';
            eventsHtml += `<div class="calendar-event-dot ${isGold}">${symbol}${db.booking_id.substring(8)}</div>`;
        });
        
        if (dayBookings.length > 2) {
            eventsHtml += `<div class="calendar-event-dot" style="font-size:0.55rem; text-align:center;">+${dayBookings.length - 2} เคส</div>`;
        }

        const dayHtml = `
            <div class="calendar-day ${isToday}" onclick="filterByCalendarDate('${dayStrFormatted}')">
                <div class="calendar-day-num">${day}</div>
                <div class="calendar-events">
                    ${eventsHtml}
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', dayHtml);
    }
}

function filterByCalendarDate(dateString) {
    showToast('กรองประวัติปฏิทิน', `กำลังแสดงตารางงานสำหรับวันที่ ${formatDateThai(dateString)}`, 'info');
    const container = document.getElementById('dashboard-jobs-container');
    container.innerHTML = '';
    
    const dayBookings = bookings.filter(b => b.appointment_date === dateString);
    if (dayBookings.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 3rem;">ไม่มีงานนวดในปฏิทินสำหรับวันที่ ${formatDateThai(dateString)}</div>`;
        return;
    }

    dayBookings.forEach(booking => {
        // Reuse same block
        const client = clients.find(c => c.line_user_id === booking.client_line_id) || {};
        const massager = massagers.find(m => m.line_user_id === booking.massager_line_id) || null;
        const payment = payments[booking.booking_id] || { case_fee: 0, bonus_atk: 0, bonus_repeat: 0 };
        const isRepeated = booking.is_repeated_request;
        const totalEarn = (Number(payment.case_fee) || 0) + (Number(payment.bonus_atk) || 0) + (Number(payment.bonus_repeat) || 0);

        container.insertAdjacentHTML('beforeend', `
            <div class="job-card ${isRepeated ? 'repeated-request' : ''}">
                ${isRepeated ? `<div class="repeat-badge"><i class="fa-solid fa-crown"></i> รีเควสหมอคนเดิม</div>` : ''}
                <div class="job-header">
                    <div>
                        <span class="job-id">${booking.booking_id}</span>
                        <span style="display:block; font-size:0.75rem; color:var(--text-muted);">ลูกค้า: ${client.name} (${client.client_id})</span>
                    </div>
                    <span class="job-status status-assigned">${booking.booking_status}</span>
                </div>
                <div class="job-details-grid mt-3" style="font-size:0.8rem;">
                    <div><i class="fa-regular fa-clock"></i> เวลา: ${booking.appointment_time} น.</div>
                    <div><i class="fa-solid fa-user-doctor"></i> หมอ: ${massager ? massager.name : 'ไม่มี'}</div>
                </div>
                <div class="job-footer" style="padding-top:0.5rem; margin-top:0.5rem;">
                    <span>รวมรายได้: ฿${totalEarn.toLocaleString()}</span>
                    <button onclick="openBookingDetailModal('${booking.booking_id}')" class="btn btn-secondary btn-sm" style="padding:0.2rem 0.5rem; font-size:0.75rem;">ดูรายละเอียด</button>
                </div>
            </div>
        `);
    });
}

function renderAppliedJobsList() {
    const container = document.getElementById('applied-massagers-list');
    container.innerHTML = '';

    const pendings = appliedJobs.filter(app => app.status === 'pending');
    if (pendings.length === 0) {
        container.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 1.5rem 0;">ยังไม่มีข้อความพิมพ์ "สนใจรับงาน!!" ส่งเข้ามา</div>`;
        return;
    }

    pendings.forEach(app => {
        const massager = massagers.find(m => m.line_user_id === app.massager_line_id);
        const booking = bookings.find(b => b.booking_id === app.booking_id);

        if (!massager || !booking) return;

        const starsHtml = renderStars(massager.rating_stars);

        const rowHtml = `
            <div class="panel-card" style="padding: 1rem; margin-bottom: 0.8rem; border-color: var(--primary-soft);">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.3rem;">
                    <strong style="color: var(--primary);">${booking.booking_id}</strong>
                    <span style="color: var(--text-muted);">${booking.appointment_time} น.</span>
                </div>
                <div style="font-size: 0.85rem; font-weight: bold;">
                    ${massager.name} (${massager.massager_id})
                </div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem;">
                    โซนหมอ: ${massager.zone} | ดาว: ${starsHtml} (${massager.rating_score}/10 คะแนน)
                </div>
                <div style="text-align: right; display: flex; gap: 0.3rem; justify-content: flex-end;">
                    <button onclick="assignJob('${booking.booking_id}', '${massager.line_user_id}')" class="btn btn-primary btn-sm" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">
                        อนุมัติจ่ายงาน
                    </button>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', rowHtml);
    });
}

// =========================================================================
// BOOKING DETAIL MODAL & OPERATIONS
// =========================================================================
function openBookingDetailModal(bookingId) {
    const booking = bookings.find(b => b.booking_id === bookingId);
    if (!booking) return;

    const client = clients.find(c => c.line_user_id === booking.client_line_id) || {};
    const massager = massagers.find(m => m.line_user_id === booking.massager_line_id) || null;
    const payment = payments[bookingId] || {
        booking_id: bookingId,
        points_earned: 0,
        case_fee: 0,
        bonus: 0,
        bonus_atk: 0,
        bonus_repeat: 0,
        admin_note: ''
    };

    const isRepeated = booking.is_repeated_request;
    const starsHtml = massager ? renderStars(massager.rating_stars) : '';
    
    // Check applications for this booking
    const applicants = appliedJobs.filter(app => app.booking_id === bookingId && app.status === 'pending');
    let applicantSelectionHtml = '';
    
    if (booking.booking_status === 'broadcasting') {
        applicantSelectionHtml += `
            <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed var(--border-color);">
                <h5 style="color: var(--primary); font-size: 0.95rem; margin-bottom: 0.8rem;"><i class="fa-solid fa-people-arrows"></i> เลือกหมอนวดที่จะรับงานนี้ (กดอนุมัติจ่ายงาน)</h5>
        `;
        
        if (applicants.length === 0) {
            applicantSelectionHtml += `
                <div style="font-size: 0.8rem; color: var(--text-muted); background: var(--bg-main); padding: 0.8rem; border-radius: 8px; text-align: center;">
                    ยังไม่มีหมอนวดพิมพ์แจ้ง "สนใจรับงาน!!" เข้ามา
                </div>
            `;
        } else {
            applicantSelectionHtml += `<div style="display:flex; flex-direction:column; gap:0.5rem;">`;
            applicants.forEach(app => {
                const appM = massagers.find(m => m.line_user_id === app.massager_line_id);
                if (appM) {
                    applicantSelectionHtml += `
                        <div style="display:flex; justify-content:space-between; align-items:center; background:#FFFDFD; border:1px solid var(--border-color); padding:0.6rem 0.8rem; border-radius:8px; font-size:0.8rem;">
                            <div>
                                <strong>${appM.name} (${appM.massager_id})</strong> - โซน: ${appM.zone}
                                <br><span style="color:var(--accent-gold); font-size:0.75rem;">★ ${appM.rating_score}/10 คะแนน</span>
                            </div>
                            <button onclick="assignJob('${bookingId}', '${appM.line_user_id}')" class="btn btn-primary btn-sm" style="padding:0.2rem 0.5rem; font-size:0.75rem;">อนุมัติจ่ายงาน</button>
                        </div>
                    `;
                }
            });
            applicantSelectionHtml += `</div>`;
        }
        applicantSelectionHtml += `</div>`;
    }

    const modalBody = document.getElementById('booking-modal-body');
    modalBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            
            ${isRepeated ? `
                <div style="border: 2px solid var(--accent-gold); border-radius: 12px; padding: 0.8rem 1rem; background: #FFFDF0; box-shadow: var(--shadow-gold); display: flex; align-items: center; gap: 0.8rem;">
                    <i class="fa-solid fa-crown" style="color: var(--accent-gold); font-size: 1.5rem;"></i>
                    <div>
                        <strong style="color: #AA8B2C; font-size: 0.9rem;">ลูกค้าระบุเจาะจงรีเควสหมอนวดคนเดิม</strong>
                        <div style="font-size: 0.75rem; color: var(--text-slate);">ระบบเปิดสิทธิให้หมอนวดคนเดิมพิจารณางานและแอดมินจ่ายโบนัสเรียกซ้ำเพิ่มให้พิเศษ</div>
                    </div>
                </div>
            ` : ''}

            <!-- Booking Overview Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.85rem;">
                <div>
                    <label style="display:block; font-weight:600; color:var(--text-muted);">รหัสการจอง:</label>
                    <strong style="color: var(--primary); font-size: 1.1rem;">${booking.booking_id}</strong>
                </div>
                <div>
                    <label style="display:block; font-weight:600; color:var(--text-muted);">สถานะงาน:</label>
                    <span class="badge ${booking.booking_status === 'completed' ? 'status-completed' : 'status-assigned'}" style="text-transform: capitalize;">${booking.booking_status}</span>
                </div>
                <div>
                    <label style="display:block; font-weight:600; color:var(--text-muted);">วัน-เวลานัดหมาย:</label>
                    <strong>${formatDateThai(booking.appointment_date)} เวลา ${booking.appointment_time} น.</strong>
                </div>
                <div>
                    <label style="display:block; font-weight:600; color:var(--text-muted);">บริการ / คอร์ส / เวลา:</label>
                    <strong>${booking.service_type} (${booking.course_duration}) - ${booking.guests_count} ท่าน</strong>
                </div>
            </div>

            <!-- Client Info Section -->
            <div style="background-color: var(--primary-light); padding: 1rem; border-radius: 10px; border-left: 4px solid var(--primary);">
                <h5 style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--text-dark);"><i class="fa-solid fa-user"></i> ข้อมูลลูกค้า</h5>
                <div style="font-size: 0.85rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                    <div>รหัสลูกค้า: <strong style="color: var(--accent-gold);">${client.client_id}</strong></div>
                    <div>ชื่อ: <strong>คุณ${client.name}</strong></div>
                    <div>เบอร์ติดต่อ: <strong>${client.phone}</strong></div>
                    <div>แรงนวดที่ต้องการ: <strong>${booking.massage_level}</strong></div>
                    <div>อายุครรภ์: <strong>${booking.pregnancy_weeks > 0 ? `${booking.pregnancy_weeks} สัปดาห์` : 'ไม่ได้ตั้งครรภ์'}</strong></div>
                    <div>สัตว์เลี้ยงที่พักอาศัย: <strong>${booking.pets}</strong></div>
                    <div style="grid-column: span 2; margin-top: 0.4rem;">
                        ที่อยู่นวด: <strong>${booking.address}</strong>
                    </div>
                    <div style="grid-column: span 2;">
                        พิกัดแผนที่: <a href="${booking.google_map_link}" target="_blank" style="color: var(--primary); text-decoration: underline; font-weight: 500;"><i class="fa-solid fa-map-location-dot"></i> ดูบน Google Maps</a>
                    </div>
                    <div style="grid-column: span 2;">
                        หมายเหตุลูกค้า: <span style="color: var(--danger); font-weight: 500;">${booking.client_note || '-'}</span>
                    </div>
                </div>
            </div>

            <!-- Assigned Massager Section -->
            <div style="border: 1px solid var(--border-color); padding: 1rem; border-radius: 10px;">
                <h5 style="margin-bottom: 0.5rem; font-size: 0.95rem; color: var(--text-dark);"><i class="fa-solid fa-user-doctor"></i> ข้อมูลหมอนวดผู้ปฏิบัติงาน</h5>
                ${massager ? `
                    <div style="font-size: 0.85rem; display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>${massager.name} (${massager.massager_id})</strong><br>
                            เบอร์โทร: ${massager.phone} | โซนรับงานประจำ: ${massager.zone}<br>
                            เรทติ้งดาว: ${starsHtml} (${massager.rating_score}/10 คะแนน)
                        </div>
                        <button onclick="pullJobBack('${booking.booking_id}')" class="btn btn-danger btn-sm">
                            <i class="fa-solid fa-rotate-left"></i> ดึงงานคืน
                        </button>
                    </div>
                ` : `
                    <div style="font-size: 0.85rem; color: var(--text-muted); text-align: center; padding: 0.5rem 0;">
                        ยังไม่มีการมอบหมายงานให้หมอนวด
                        <div style="margin-top: 0.5rem;">
                            <button onclick="broadcastJobOffer('${booking.booking_id}')" class="btn btn-primary btn-sm" ${booking.booking_status === 'broadcasting' ? 'disabled' : ''}>
                                <i class="fa-solid fa-bullhorn"></i> ${booking.booking_status === 'broadcasting' ? 'กำลังส่งประกาศรับงาน...' : 'ประกาศส่งเสนอหาหมอ (LINE Broadcast)'}
                            </button>
                        </div>
                    </div>
                `}
            </div>

            <!-- Admin Financial Settings -->
            <div style="border: 1px solid var(--border-color); padding: 1rem; border-radius: 10px; background-color: #FAFAFA;">
                <h5 style="margin-bottom: 0.8rem; font-size: 0.95rem; color: var(--text-dark);"><i class="fa-solid fa-coins"></i> สรุปรายละเอียดรายได้และค่าบริการ (แอดมินบันทึก)</h5>
                
                <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem;">
                    <div class="form-group" style="margin-bottom:0;">
                        <label style="font-size:0.75rem;">ค่าเคสหลัก (จ่ายให้หมอ) *</label>
                        <input type="number" id="pay-case-fee" class="form-control form-control-sm" value="${payment.case_fee}">
                    </div>
                    <div class="form-group" style="margin-bottom:0;">
                        <label style="font-size:0.75rem;">แต้มที่ได้รับ (ลูกค้าสะสม)</label>
                        <input type="number" id="pay-points" class="form-control form-control-sm" value="${payment.points_earned}">
                    </div>
                    <div class="form-group" style="margin-bottom:0;">
                        <label style="font-size:0.75rem;">ค่าโบนัสพิเศษ</label>
                        <input type="number" id="pay-bonus" class="form-control form-control-sm" value="${payment.bonus}">
                    </div>
                    <div class="form-group" style="margin-bottom:0;">
                        <label style="font-size:0.75rem;">ค่าตรวจ ATK (ATK Bonus)</label>
                        <input type="number" id="pay-atk-bonus" class="form-control form-control-sm" value="${payment.bonus_atk}">
                    </div>
                    <div class="form-group" style="margin-bottom:0;">
                        <label style="font-size:0.75rem; color: var(--accent-gold);">โบนัสเรียกซ้ำ (ลูกค้าเจาะจงหมอคนเดิม) *</label>
                        <input type="number" id="pay-repeat-bonus" class="form-control form-control-sm" style="border-color: var(--accent-gold);" value="${payment.bonus_repeat}">
                    </div>
                    <div class="form-group" style="grid-column: span 2; margin-bottom:0;">
                        <label style="font-size:0.75rem;">หมายเหตุแอดมิน</label>
                        <input type="text" id="pay-admin-note" class="form-control form-control-sm" placeholder="เช่น ค่ารถ, โบนัสนวดเก่ง" value="${payment.admin_note || ''}">
                    </div>
                </div>
            </div>

            <!-- Apply Applicants Selection -->
            ${applicantSelectionHtml}

            <!-- Footer options -->
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end; margin-top: 1rem;">
                <button onclick="closeBookingModal()" class="btn btn-secondary">ปิดหน้านี้</button>
                <button onclick="saveBookingPayments('${booking.booking_id}')" class="btn btn-gold">
                    <i class="fa-solid fa-floppy-disk"></i> บันทึกค่าบริการ & สรุปเงิน
                </button>
            </div>
        </div>
    `;

    document.getElementById('booking-detail-modal').classList.add('active');
}

function closeBookingModal() {
    document.getElementById('booking-detail-modal').classList.remove('active');
}

function broadcastJobOffer(bookingId) {
    const booking = bookings.find(b => b.booking_id === bookingId);
    if (!booking) return;

    booking.booking_status = 'broadcasting';
    saveData();
    showToast('ประกาศงานเรียบร้อย', `ระบบจำลอง MassageAPI ยิงงานรหัส ${bookingId} เสนอไปยังหมอนวด OA เรียบร้อย`, 'info');
    
    // Simulate LINE notification broadcast logic
    const repeatedText = booking.is_repeated_request ? '⭐ รีเควสหมอคนเดิม ⭐' : '';
    let msg = templates.MASSAGER_BROADCAST
        .replace('{date}', formatDateThai(booking.appointment_date))
        .replace('{time}', booking.appointment_time)
        .replace('{service}', booking.service_type)
        .replace('{duration}', booking.course_duration)
        .replace('{zone}', booking.address.split(' ')[0] || 'กทม.')
        .replace('{client_code}', clients.find(c => c.line_user_id === booking.client_line_id).client_id)
        .replace('{guests}', booking.guests_count)
        .replace('{repeated_badge}', repeatedText)
        .replace('{case_fee}', 500)
        .replace('{atk_bonus}', 50);

    // Show simulation toast as delivered to massagers group
    simSendMassageAPI('all_massagers_group', msg, 'gold');

    // Auto seed one application shortly after to show simulator dynamics
    setTimeout(() => {
        const checkExist = appliedJobs.find(app => app.booking_id === bookingId && app.massager_line_id === 'line_massager_002');
        if (!checkExist) {
            appliedJobs.push({
                booking_id: bookingId,
                massager_line_id: 'line_massager_002', // หมอบี
                applied_at: new Date().toISOString(),
                status: 'pending'
            });
            saveData();
            showToast('หมอสมัครงานเข้ามา!', 'หมอบี (MCA-00002) พิมพ์แชทตอบรับ: "สนใจรับงาน!!"', 'success');
            initSystem();
            // Re-open if modal is active
            if (document.getElementById('booking-detail-modal').classList.contains('active')) {
                openBookingDetailModal(bookingId);
            }
        }
    }, 4000);

    initSystem();
    openBookingDetailModal(bookingId);
}

function assignJob(bookingId, massagerLineId) {
    const booking = bookings.find(b => b.booking_id === bookingId);
    const massager = massagers.find(m => m.line_user_id === massagerLineId);
    if (!booking || !massager) return;

    booking.massager_line_id = massagerLineId;
    booking.booking_status = 'assigned';

    // Approve the applied job state
    const application = appliedJobs.find(app => app.booking_id === bookingId && app.massager_line_id === massagerLineId);
    if (application) {
        application.status = 'approved';
    }

    // Set other applicants to declined
    appliedJobs.forEach(app => {
        if (app.booking_id === bookingId && app.massager_line_id !== massagerLineId) {
            app.status = 'declined';
        }
    });

    // Default rate values if not yet set in payment
    if (!payments[bookingId]) {
        payments[bookingId] = {
            booking_id: bookingId,
            points_earned: 10,
            case_fee: booking.service_type === 'นวดสปาครรภ์' ? 650.00 : 500.00,
            bonus: 0.00,
            bonus_atk: 50.00,
            bonus_repeat: booking.is_repeated_request ? 100.00 : 0.00,
            admin_note: booking.is_repeated_request ? 'โบนัสระบุหมอคนเดิม' : ''
        };
    }

    saveData();
    showToast('มอบหมายงานสำเร็จ', `จ่ายงานให้หมอ ${massager.name} เรียบร้อยแล้ว`, 'success');
    
    // MassageAPI client confirmation
    const client = clients.find(c => c.line_user_id === booking.client_line_id);
    let clientMsg = templates.CLIENT_CONFIRM
        .replace('{client_name}', client.name)
        .replace('{date}', formatDateThai(booking.appointment_date))
        .replace('{time}', booking.appointment_time)
        .replace('{massager_name}', massager.name)
        .replace('{massager_code}', massager.massager_id)
        .replace('{service}', booking.service_type)
        .replace('{duration}', booking.course_duration)
        .replace('{address}', booking.address);
        
    simSendMassageAPI(client.line_user_id, clientMsg);

    // MassageAPI massager details
    const payDetails = payments[bookingId];
    let massMsg = templates.MASSAGER_CONFIRM
        .replace('{massager_name}', massager.name)
        .replace('{booking_code}', bookingId)
        .replace('{date}', formatDateThai(booking.appointment_date))
        .replace('{time}', booking.appointment_time)
        .replace('{service}', booking.service_type)
        .replace('{duration}', booking.course_duration)
        .replace('{client_name}', client.name)
        .replace('{client_phone}', client.phone)
        .replace('{map_link}', booking.google_map_link)
        .replace('{address}', booking.address)
        .replace('{client_note}', booking.client_note || 'ไม่มี')
        .replace('{case_fee}', payDetails.case_fee)
        .replace('{atk_bonus}', payDetails.bonus_atk)
        .replace('{repeat_bonus}', payDetails.bonus_repeat);

    simSendMassageAPI(massager.line_user_id, massMsg, 'gold');

    initSystem();
    openBookingDetailModal(bookingId);
}

function pullJobBack(bookingId) {
    const booking = bookings.find(b => b.booking_id === bookingId);
    if (!booking) return;

    const oldMassagerLineId = booking.massager_line_id;
    booking.massager_line_id = null;
    booking.booking_status = 'broadcasting';

    // Clear approved job state
    const application = appliedJobs.find(app => app.booking_id === bookingId && app.massager_line_id === oldMassagerLineId);
    if (application) {
        application.status = 'declined';
    }

    saveData();
    showToast('ดึงงานกลับสำเร็จ', 'ดึงงานกลับมาเป็นสถานะมองหาหมอนวด เพื่อให้แอดมินสามารถจ่ายงานคนอื่นแทนได้', 'warning');
    
    // Notify old massager via line OA
    simSendMassageAPI(oldMassagerLineId, `⚠️ แจ้งเตือน: งานรหัส ${bookingId} ได้รับการดึงกลับ/ยกเลิกมอบหมายโดยแอดมินเรียบร้อยแล้ว ขออภัยในความไม่สะดวกค่ะ`);

    initSystem();
    openBookingDetailModal(bookingId);
}

function saveBookingPayments(bookingId) {
    const case_fee = Number(document.getElementById('pay-case-fee').value) || 0;
    const points_earned = parseInt(document.getElementById('pay-points').value) || 0;
    const bonus = Number(document.getElementById('pay-bonus').value) || 0;
    const bonus_atk = Number(document.getElementById('pay-atk-bonus').value) || 0;
    const bonus_repeat = Number(document.getElementById('pay-repeat-bonus').value) || 0;
    const admin_note = document.getElementById('pay-admin-note').value;

    payments[bookingId] = {
        booking_id: bookingId,
        points_earned,
        case_fee,
        bonus,
        bonus_atk,
        bonus_repeat,
        admin_note
    };

    saveData();
    showToast('บันทึกสำเร็จ', 'บันทึกสรุปค่าใช้จ่ายและโบนัสระบบเรียบร้อย', 'success');
    updateSystemStats();
    closeBookingModal();
    initSystem();
}

// =========================================================================
// MASSAGER PROFILES & RATING ACTIONS
// =========================================================================
function renderMassagersTable() {
    const tbody = document.getElementById('massagers-table-body');
    tbody.innerHTML = '';

    massagers.forEach(m => {
        const count = bookings.filter(b => b.massager_line_id === m.line_user_id && b.booking_status === 'completed').length;
        const starsHtml = renderStars(m.rating_stars);

        tbody.insertAdjacentHTML('beforeend', `
            <tr>
                <td><strong>${m.massager_id}</strong></td>
                <td>
                    <div style="font-weight: 600;">${m.name}</div>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">ID: ${m.line_user_id}</span>
                </td>
                <td>${m.phone}</td>
                <td><span class="badge badge-primary">${m.zone}</span></td>
                <td><strong>${count} เคส</strong></td>
                <td>
                    <div class="star-rating">${starsHtml}</div>
                    <span class="rating-badge">${m.rating_score}/10</span>
                </td>
                <td>
                    <button onclick="viewMassagerHistory('${m.line_user_id}')" class="btn btn-secondary btn-sm" style="padding: 0.2rem 0.5rem;">
                        <i class="fa-solid fa-history"></i> ประวัติ
                    </button>
                    <button onclick="editMassager('${m.line_user_id}')" class="btn btn-secondary btn-sm" style="padding: 0.2rem 0.4rem; color: var(--primary);">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                    <button onclick="deleteMassager('${m.line_user_id}')" class="btn btn-danger btn-sm" style="padding: 0.2rem 0.4rem;">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}

function viewMassagerHistory(lineUserId) {
    const massager = massagers.find(m => m.line_user_id === lineUserId);
    if (!massager) return;

    const massagerBookings = bookings.filter(b => b.massager_line_id === lineUserId);
    const completedCount = massagerBookings.filter(b => b.booking_status === 'completed').length;
    const repeatedCount = massagerBookings.filter(b => b.is_repeated_request === true && b.booking_status === 'completed').length;
    
    // Sum calculations
    let totalIncome = 0;
    massagerBookings.forEach(b => {
        if (b.booking_status === 'completed') {
            const pay = payments[b.booking_id] || { case_fee: 0, bonus: 0, bonus_atk: 0, bonus_repeat: 0 };
            totalIncome += Number(pay.case_fee) + Number(pay.bonus) + Number(pay.bonus_atk) + Number(pay.bonus_repeat);
        }
    });

    let historyRows = '';
    massagerBookings.forEach(b => {
        const client = clients.find(c => c.line_user_id === b.client_line_id) || { name: 'ลูกค้าทั่วไป' };
        const pay = payments[b.booking_id] || { case_fee: 0 };
        const isRep = b.is_repeated_request ? '<span class="badge badge-gold">รีเควสซ้ำ</span>' : '';
        
        historyRows += `
            <div style="border-bottom:1px solid var(--border-color); padding: 0.6rem 0; display:flex; justify-content:space-between; align-items:center; font-size:0.8rem;">
                <div>
                    <strong>${b.booking_id}</strong> - ${formatDateThai(b.appointment_date)} | คอร์ส: ${b.service_type}<br>
                    ลูกค้า: คุณ${client.name} | สถานะ: <span style="font-weight:600;">${b.booking_status}</span> ${isRep}
                </div>
                <div>
                    <strong>฿${(Number(pay.case_fee) || 0).toLocaleString()}</strong>
                </div>
            </div>
        `;
    });

    if (massagerBookings.length === 0) {
        historyRows = `<div style="text-align:center; padding:1.5rem; font-size:0.8rem; color:var(--text-muted);">ไม่มีประวัติการรับงานใดๆ</div>`;
    }

    const modalBody = document.getElementById('booking-modal-body');
    modalBody.innerHTML = `
        <div style="display:flex; flex-direction:column; gap: 1.25rem;">
            <div>
                <h4 style="font-size:1.2rem; color:var(--primary);">${massager.name} (${massager.massager_id})</h4>
                <p style="font-size:0.8rem; color:var(--text-muted);">โซนประจำ: ${massager.zone} | โทร: ${massager.phone}</p>
            </div>

            <!-- Stats grid -->
            <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 0.8rem; text-align:center;">
                <div style="background:var(--bg-main); padding: 0.6rem; border-radius:8px;">
                    <div style="font-size:1.15rem; font-weight:700; color:var(--primary);">${completedCount}</div>
                    <div style="font-size:0.7rem; color:var(--text-muted);">เคสเสร็จสิ้น</div>
                </div>
                <div style="background:var(--bg-main); padding: 0.6rem; border-radius:8px;">
                    <div style="font-size:1.15rem; font-weight:700; color:var(--accent-gold);">${repeatedCount}</div>
                    <div style="font-size:0.7rem; color:var(--text-muted);">ลูกค้าขอคนเดิม</div>
                </div>
                <div style="background:var(--bg-main); padding: 0.6rem; border-radius:8px;">
                    <div style="font-size:1.15rem; font-weight:700; color:var(--text-dark);">฿${totalIncome.toLocaleString()}</div>
                    <div style="font-size:0.7rem; color:var(--text-muted);">รายได้ทั้งหมด</div>
                </div>
            </div>

            <!-- Set ratings -->
            <div style="border: 1px solid var(--border-color); border-radius:8px; padding:0.8rem; background-color:#FFFDFB;">
                <h5 style="font-size:0.85rem; margin-bottom:0.5rem;"><i class="fa-solid fa-star" style="color:var(--accent-gold);"></i> ประเมินผลและให้เรทติ้งความพึงพอใจ</h5>
                <div style="display:flex; align-items:center; gap: 1rem;">
                    <div class="form-group" style="margin-bottom:0; flex-grow:1;">
                        <label style="font-size:0.7rem;">คะแนนระบบ (เต็ม 10) *</label>
                        <input type="number" id="history-rate-score" class="form-control form-control-sm" min="1" max="10" value="${massager.rating_score}">
                    </div>
                    <div class="form-group" style="margin-bottom:0; flex-grow:1;">
                        <label style="font-size:0.7rem;">ระดับดาว (0-5 ดาว) *</label>
                        <input type="number" id="history-rate-stars" class="form-control form-control-sm" min="0" max="5" step="0.5" value="${massager.rating_stars}">
                    </div>
                    <div style="margin-top: 1.1rem;">
                        <button onclick="saveMassagerRating('${lineUserId}')" class="btn btn-gold btn-sm">อัปเดตเรทติ้ง</button>
                    </div>
                </div>
            </div>

            <div>
                <h5 style="font-size:0.9rem; border-bottom:1px solid var(--border-color); padding-bottom:0.4rem;"><i class="fa-solid fa-list-check"></i> ประวัติงานรับทั้งหมด</h5>
                <div style="max-height:250px; overflow-y:auto;">
                    ${historyRows}
                </div>
            </div>
            
            <div style="text-align:right;">
                <button onclick="closeBookingModal()" class="btn btn-secondary btn-sm">ปิดประวัติ</button>
            </div>
        </div>
    `;

    document.getElementById('booking-detail-modal').classList.add('active');
}

function saveMassagerRating(lineUserId) {
    const score = parseInt(document.getElementById('history-rate-score').value) || 10;
    const stars = parseFloat(document.getElementById('history-rate-stars').value) || 5;

    const m = massagers.find(item => item.line_user_id === lineUserId);
    if (m) {
        m.rating_score = Math.min(10, Math.max(0, score));
        m.rating_stars = Math.min(5, Math.max(0, stars));
        saveData();
        showToast('อัปเดตดาวสำเร็จ', `อัปเดตเรทติ้งหมอนวด ${m.name} เป็น ${stars} ดาว เรียบร้อยแล้ว`, 'success');
        closeBookingModal();
        initSystem();
    }
}

function openMassagerModal() {
    document.getElementById('massager-form-mode').value = 'add';
    document.getElementById('massager-modal-title').innerText = 'เพิ่มประวัติหมอนวดใหม่';
    document.getElementById('massager-form').reset();
    document.getElementById('massager-form-modal').classList.add('active');
}

function closeMassagerModal() {
    document.getElementById('massager-form-modal').classList.remove('active');
}

function editMassager(lineUserId) {
    const m = massagers.find(item => item.line_user_id === lineUserId);
    if (!m) return;

    document.getElementById('massager-form-mode').value = 'edit';
    document.getElementById('massager-form-line-id').value = lineUserId;
    document.getElementById('massager-modal-title').innerText = 'แก้ไขข้อมูลหมอนวด';
    document.getElementById('massager-form-name').value = m.name;
    document.getElementById('massager-form-phone').value = m.phone;
    document.getElementById('massager-form-zone').value = m.zone;
    document.getElementById('massager-form-score').value = m.rating_score;
    document.getElementById('massager-form-stars').value = m.rating_stars;

    document.getElementById('massager-form-modal').classList.add('active');
}

function handleMassagerFormSubmit(e) {
    e.preventDefault();
    const mode = document.getElementById('massager-form-mode').value;
    const lineId = document.getElementById('massager-form-line-id').value;
    
    const name = document.getElementById('massager-form-name').value;
    const phone = document.getElementById('massager-form-phone').value;
    const zone = document.getElementById('massager-form-zone').value;
    const score = parseInt(document.getElementById('massager-form-score').value) || 10;
    const stars = parseFloat(document.getElementById('massager-form-stars').value) || 5;

    if (mode === 'add') {
        const nextIdx = massagers.length + 1;
        const newCode = `MCA-${nextIdx.toString().padStart(5, '0')}`;
        const newLineId = `line_massager_${nextIdx.toString().padStart(3, '0')}`;
        
        massagers.push({
            line_user_id: newLineId,
            massager_id: newCode,
            name,
            phone,
            zone,
            rating_stars: stars,
            rating_score: score,
            is_active: true
        });
        showToast('สำเร็จ', `เพิ่มประวัติหมอนวดใหม่ รหัส ${newCode} สำเร็จ`, 'success');
    } else {
        const m = massagers.find(item => item.line_user_id === lineId);
        if (m) {
            m.name = name;
            m.phone = phone;
            m.zone = zone;
            m.rating_score = score;
            m.rating_stars = stars;
            showToast('สำเร็จ', `แก้ไขประวัติหมอนวด ${m.massager_id} สำเร็จ`, 'success');
        }
    }

    saveData();
    closeMassagerModal();
    initSystem();
}

function deleteMassager(lineUserId) {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบหมอนวดท่านนี้ออกจากระบบ?')) {
        massagers = massagers.filter(m => m.line_user_id !== lineUserId);
        saveData();
        showToast('ลบสำเร็จ', 'ลบโปรไฟล์หมอนวดออกจากระบบเรียบร้อย', 'warning');
        initSystem();
    }
}

// =========================================================================
// CLIENTS DIRECTORY ACTIONS
// =========================================================================
function renderClientsTable() {
    const tbody = document.getElementById('clients-table-body');
    tbody.innerHTML = '';

    clients.forEach(c => {
        tbody.insertAdjacentHTML('beforeend', `
            <tr>
                <td><strong style="color:var(--accent-gold);">${c.client_id}</strong></td>
                <td>
                    <div style="font-weight: 600;">${c.name}</div>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">LINE User ID: ${c.line_user_id}</span>
                </td>
                <td>${c.phone}</td>
                <td>${c.massage_level}</td>
                <td>${c.pets_info || 'ไม่มี'}</td>
                <td style="max-width: 250px; font-size:0.8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    ${c.address}
                </td>
                <td>
                    <button onclick="editClient('${c.line_user_id}')" class="btn btn-secondary btn-sm" style="padding: 0.2rem 0.4rem; color: var(--primary);">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                    <button onclick="deleteClient('${c.line_user_id}')" class="btn btn-danger btn-sm" style="padding: 0.2rem 0.4rem;">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}

function openClientModal() {
    document.getElementById('client-form-mode').value = 'add';
    document.getElementById('client-modal-title').innerText = 'เพิ่มข้อมูลประวัติลูกค้าใหม่';
    document.getElementById('client-form').reset();
    document.getElementById('client-form-modal').classList.add('active');
}

function closeClientModal() {
    document.getElementById('client-form-modal').classList.remove('active');
}

function editClient(lineUserId) {
    const c = clients.find(item => item.line_user_id === lineUserId);
    if (!c) return;

    document.getElementById('client-form-mode').value = 'edit';
    document.getElementById('client-form-line-id').value = lineUserId;
    document.getElementById('client-modal-title').innerText = 'แก้ไขประวัติข้อมูลลูกค้า';
    document.getElementById('client-form-name').value = c.name;
    document.getElementById('client-form-phone').value = c.phone;
    document.getElementById('client-form-level').value = c.massage_level;
    document.getElementById('client-form-pets').value = c.pets_info || '';
    document.getElementById('client-form-address').value = c.address;
    document.getElementById('client-form-map').value = c.google_map_link || '';

    document.getElementById('client-form-modal').classList.add('active');
}

function handleClientFormSubmit(e) {
    e.preventDefault();
    const mode = document.getElementById('client-form-mode').value;
    const lineId = document.getElementById('client-form-line-id').value;
    
    const name = document.getElementById('client-form-name').value;
    const phone = document.getElementById('client-form-phone').value;
    const level = document.getElementById('client-form-level').value;
    const pets = document.getElementById('client-form-pets').value;
    const address = document.getElementById('client-form-address').value;
    const map = document.getElementById('client-form-map').value;

    if (mode === 'add') {
        const nextIdx = clients.length + 1;
        const newCode = `MOM-${nextIdx.toString().padStart(4, '0')}`;
        const newLineId = `line_client_${nextIdx.toString().padStart(3, '0')}`;
        
        clients.push({
            line_user_id: newLineId,
            client_id: newCode,
            name,
            phone,
            address,
            google_map_link: map,
            massage_level: level,
            pets_info: pets,
            notes: ''
        });
        showToast('สำเร็จ', `สร้างข้อมูลลูกค้าใหม่ รหัส ${newCode} สำเร็จ`, 'success');
    } else {
        const c = clients.find(item => item.line_user_id === lineId);
        if (c) {
            c.name = name;
            c.phone = phone;
            c.massage_level = level;
            c.pets_info = pets;
            c.address = address;
            c.google_map_link = map;
            showToast('สำเร็จ', `แก้ไขประวัติลูกค้า ${c.client_id} สำเร็จ`, 'success');
        }
    }

    saveData();
    closeClientModal();
    initSystem();
}

function deleteClient(lineUserId) {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายชื่อลูกค้าออกจากระบบ?')) {
        clients = clients.filter(c => c.line_user_id !== lineUserId);
        saveData();
        showToast('ลบข้อมูลแล้ว', 'ลบข้อมูลลูกค้าออกจากระบบเรียบร้อย', 'warning');
        initSystem();
    }
}

// =========================================================================
// MESSAGE TEMPLATES MANAGEMENT
// =========================================================================
function loadMessageTemplatesEditor() {
    document.getElementById('template-client-confirm').value = templates.CLIENT_CONFIRM;
    document.getElementById('template-massager-broadcast').value = templates.MASSAGER_BROADCAST;
    document.getElementById('template-massager-confirm').value = templates.MASSAGER_CONFIRM;
}

function saveMessageTemplates() {
    templates.CLIENT_CONFIRM = document.getElementById('template-client-confirm').value;
    templates.MASSAGER_BROADCAST = document.getElementById('template-massager-broadcast').value;
    templates.MASSAGER_CONFIRM = document.getElementById('template-massager-confirm').value;
    
    saveData();
    showToast('สำเร็จ', 'บันทึกรูปแบบเทมเพลตข้อความของระบบเรียบร้อยแล้ว', 'success');
}

// =========================================================================
// LIFF SIMULATOR LOGIC
// =========================================================================
function initSimulators() {
    // Fill client simulator name
    const client = clients[activeSimClientIdx];
    document.getElementById('client-sim-name').innerText = `${client.name} (${client.client_id})`;
    document.getElementById('liff-client-line-id').value = client.line_user_id;
    document.getElementById('liff-client-name').value = client.name;
    document.getElementById('liff-client-phone').value = client.phone;
    document.getElementById('liff-client-address').value = client.address;
    document.getElementById('liff-client-map').value = client.google_map_link;
    document.getElementById('liff-booking-level').value = client.massage_level;
    document.getElementById('liff-client-pets').value = client.pets_info;

    // Fill Client repeat requested dropdown select option list
    const repSelect = document.getElementById('liff-booking-request-massager');
    repSelect.innerHTML = '<option value="none">-- ไม่ระบุเจาะจง (จองทั่วไป) --</option>';
    massagers.forEach(m => {
        repSelect.insertAdjacentHTML('beforeend', `<option value="${m.line_user_id}">${m.name} (${m.massager_id})</option>`);
    });

    // Fill Massager phone simulator info
    renderMassagerLiffView();
}

function switchSimulatedClient() {
    activeSimClientIdx = (activeSimClientIdx + 1) % clients.length;
    initSimulators();
    showToast('สลับจำลองลูกค้า', `เปลี่ยนหน้าจอจำลองเป็น LINE ID ของ ${clients[activeSimClientIdx].name}`, 'info');
}

function updateLiffPackages() {
    const service = document.getElementById('liff-booking-service').value;
    const packSelect = document.getElementById('liff-booking-package');
    packSelect.innerHTML = '';

    const packs = {
        'นวดอโรมา': [
            'สปาน้ำมันอุ่นสกัดธรรมชาติ 120 นาที (Classic Oil)',
            'อโรมาเธอราพีระดับพรีเมียม 90 นาที',
            'นวดน้ำมันมะพร้าวบำรุงลึก 60 นาที'
        ],
        'นวดไทยโบราณ': [
            'คอร์สนวดไทยแก้อาการ 90 นาที',
            'นวดไทยอบประคบสมุนไพร 120 นาที',
            'นวดไทยออฟฟิศซินโดรม 60 นาที'
        ],
        'นวดสปาครรภ์': [
            'คอร์สสปาเตรียมคลอดคุณแม่ตั้งครรภ์ 90 นาที',
            'นวดอายุรเวทเพื่อครรภ์สบายตัว 120 นาที'
        ]
    };

    packs[service].forEach(p => {
        packSelect.insertAdjacentHTML('beforeend', `<option value="${p}">${p}</option>`);
    });
}

function togglePregnancyInput(isPregnant) {
    const grp = document.getElementById('pregnancy-weeks-group');
    if (isPregnant) {
        grp.classList.remove('d-none');
        document.getElementById('liff-pregnancy-weeks').setAttribute('required', 'true');
    } else {
        grp.classList.add('d-none');
        document.getElementById('liff-pregnancy-weeks').removeAttribute('required');
    }
}

function handleClientBookingSubmit(e) {
    e.preventDefault();
    
    const clientLineId = document.getElementById('liff-client-line-id').value;
    const name = document.getElementById('liff-client-name').value;
    const phone = document.getElementById('liff-client-phone').value;
    const date = document.getElementById('liff-booking-date').value;
    const time = document.getElementById('liff-booking-time').value;
    const service = document.getElementById('liff-booking-service').value;
    const duration = document.getElementById('liff-booking-duration').value;
    const guests = document.getElementById('liff-booking-guests').value;
    const packageVal = document.getElementById('liff-booking-package').value;
    
    const isPregnant = document.querySelector('input[name="pregnancy-check"]:checked').value === 'yes';
    const weeks = isPregnant ? parseInt(document.getElementById('liff-pregnancy-weeks').value) || 0 : 0;
    
    const address = document.getElementById('liff-client-address').value;
    const map = document.getElementById('liff-client-map').value;
    const level = document.getElementById('liff-booking-level').value;
    const pets = document.getElementById('liff-client-pets').value;
    const reqMassager = document.getElementById('liff-booking-request-massager').value;
    const clientNote = document.getElementById('liff-client-note').value;

    // Check client sequence lookup
    let client = clients.find(c => c.line_user_id === clientLineId);
    if (!client) {
        const count = clients.length + 1;
        const code = `MOM-${count.toString().padStart(4, '0')}`;
        client = {
            line_user_id: clientLineId,
            client_id: code,
            name,
            phone,
            address,
            google_map_link: map,
            massage_level: level,
            pets_info: pets,
            notes: ''
        };
        clients.push(client);
    } else {
        // Update information
        client.name = name;
        client.phone = phone;
        client.address = address;
        client.google_map_link = map;
        client.massage_level = level;
        client.pets_info = pets;
    }

    // Generate Booking code format MO + YYMMDD - index
    const dateStrip = date.replace(/-/g, ''); // 2026-07-08 -> 20260708
    const yy = dateStrip.substring(2, 4);
    const mm = dateStrip.substring(4, 6);
    const dd = dateStrip.substring(6, 8);
    
    const dayPrefix = `MO${yy}${mm}${dd}`;
    const dayBookingsCount = bookings.filter(b => b.booking_id.startsWith(dayPrefix)).length;
    const nextIdx = (dayBookingsCount + 1).toString().padStart(3, '0');
    const newBookingId = `${dayPrefix}-${nextIdx}`;

    // Repeated request validation
    const hasRepeated = reqMassager !== 'none';

    // Insert new booking status pending_details
    bookings.push({
        booking_id: newBookingId,
        client_line_id: client.line_user_id,
        massager_line_id: hasRepeated ? reqMassager : null,
        appointment_date: date,
        appointment_time: time,
        service_type: service,
        course_duration: duration,
        package_name: packageVal,
        guests_count: parseInt(guests),
        pregnancy_weeks: weeks,
        address,
        google_map_link: map,
        massage_level: level,
        pets,
        client_note: clientNote,
        is_repeated_request: hasRepeated,
        booking_status: 'pending_details',
        created_at: new Date().toISOString()
    });

    saveData();
    
    // Switch to success view inside phone simulator
    document.getElementById('client-booking-form-panel').classList.add('d-none');
    document.getElementById('client-success-panel').classList.remove('d-none');
    
    document.getElementById('client-booking-result-code').innerText = newBookingId;
    document.getElementById('client-mom-code').innerText = client.client_id;
    
    showToast('มีงานจองเข้ามาใหม่!', `ลูกค้าส่งคำขอจอง ${newBookingId} เรียบร้อย รอแอดมินอนุมัติและจ่ายงาน`, 'success');
    
    initSystem();
}

function resetClientBookingForm() {
    document.getElementById('liff-booking-form').reset();
    document.getElementById('client-booking-form-panel').classList.remove('d-none');
    document.getElementById('client-success-panel').classList.add('d-none');
    togglePregnancyInput(false);
}

// --------------------- Massager LIFF Emulator logic ----------------------
function switchSimulatedMassager() {
    activeSimMassagerIdx = (activeSimMassagerIdx + 1) % massagers.length;
    simulatedMassagerLineId = massagers[activeSimMassagerIdx].line_user_id;
    renderMassagerLiffView();
    showToast('สลับจำลองหมอ', `เปลี่ยนหน้าจอจำลองเป็น LINE ID ของ ${massagers[activeSimMassagerIdx].name}`, 'info');
}

function renderMassagerLiffView() {
    const curMassager = massagers.find(m => m.line_user_id === simulatedMassagerLineId);
    
    const regPanel = document.getElementById('massager-register-panel');
    const dashPanel = document.getElementById('massager-dashboard-panel');
    const richMenu = document.getElementById('massager-rich-menu');
    
    if (!curMassager) {
        // Show register form
        regPanel.classList.remove('d-none');
        dashPanel.classList.add('d-none');
        richMenu.classList.add('d-none');
        document.getElementById('massager-sim-name').innerText = 'ผู้สมัครใหม่ (ยังไม่ได้ลงทะเบียน)';
        return;
    }

    regPanel.classList.add('d-none');
    dashPanel.classList.remove('d-none');
    richMenu.classList.remove('d-none');
    document.getElementById('massager-sim-name').innerText = `${curMassager.name} (${curMassager.massager_id})`;

    // Monthly revenue math
    let monthlyIncome = 0;
    let completedCasesCount = 0;
    let repeatedCasesCount = 0;

    const myBookings = bookings.filter(b => b.massager_line_id === curMassager.line_user_id);
    
    myBookings.forEach(b => {
        if (b.booking_status === 'completed') {
            completedCasesCount++;
            if (b.is_repeated_request) repeatedCasesCount++;
            
            const pay = payments[b.booking_id] || { case_fee: 0, bonus: 0, bonus_atk: 0, bonus_repeat: 0 };
            monthlyIncome += Number(pay.case_fee) + Number(pay.bonus) + Number(pay.bonus_atk) + Number(pay.bonus_repeat);
        }
    });

    document.getElementById('m-dash-income').innerText = `฿${monthlyIncome.toLocaleString('th-TH', {minimumFractionDigits:2})}`;
    document.getElementById('m-dash-cases-count').innerText = `ทำเสร็จแล้ว ${completedCasesCount} เคส (มีรีเควสซ้ำ ${repeatedCasesCount} ครั้ง)`;

    // Draw job list tabs
    const todayList = document.getElementById('m-today-jobs-list');
    const tomList = document.getElementById('m-tomorrow-jobs-list');
    const allList = document.getElementById('m-all-jobs-list');

    todayList.innerHTML = '';
    tomList.innerHTML = '';
    allList.innerHTML = '';

    const todayAssigned = myBookings.filter(b => b.appointment_date === todayStr);
    const tomAssigned = myBookings.filter(b => b.appointment_date === tomorrowStr);
    const futureAssigned = myBookings.filter(b => b.appointment_date > tomorrowStr);

    // Renderer helper
    const drawLiffJobItem = (job, el) => {
        let statusColor = '#B71C1C';
        if (job.booking_status === 'assigned') statusColor = '#E65100'; // Waiting
        if (job.booking_status === 'arrived') statusColor = '#01579B'; // Arrived
        if (job.booking_status === 'completed') statusColor = '#1B5E20'; // Done

        const pay = payments[job.booking_id] || { case_fee: 0, bonus_atk: 0 };
        const totalPay = Number(pay.case_fee) + Number(pay.bonus_atk);

        el.insertAdjacentHTML('beforeend', `
            <div style="background:white; border:1px solid var(--border-color); border-radius:8px; padding:0.8rem; font-size:0.75rem; position:relative; ${job.is_repeated_request ? 'border:1.5px solid var(--accent-gold);box-shadow: 0 2px 6px rgba(212, 175, 55, 0.25);' : ''}">
                ${job.is_repeated_request ? `<span style="position:absolute; top:-8px; right:10px; background:var(--accent-gold); color:white; padding:0.1rem 0.4rem; border-radius:10px; font-size:0.55rem; font-weight:bold;">★ เจาะจงหมอคนเดิม</span>` : ''}
                <div style="display:flex; justify-content:space-between; font-weight:bold;">
                    <span style="color:var(--primary);">${job.booking_id}</span>
                    <span style="color:${statusColor};">${translateStatus(job.booking_status)}</span>
                </div>
                <div style="margin-top:0.4rem;">
                    ⏰ <strong>เวลา ${job.appointment_time} น.</strong> (${job.course_duration})<br>
                    💆‍♀️ คอร์ส: ${job.service_type}<br>
                    🏠 ที่อยู่นัด: ${job.address}<br>
                    💰 รายได้รวมเคสนี้: <strong>฿${totalPay}</strong>
                </div>
            </div>
        `);
    };

    if (todayAssigned.length === 0) todayList.innerHTML = '<div style="color:var(--text-muted); font-size:0.75rem; text-align:center;">ไม่มีตารางงานนวดวันนี้</div>';
    else todayAssigned.forEach(j => drawLiffJobItem(j, todayList));

    if (tomAssigned.length === 0) tomList.innerHTML = '<div style="color:var(--text-muted); font-size:0.75rem; text-align:center;">ไม่มีตารางงานนวดวันพรุ่งนี้</div>';
    else tomAssigned.forEach(j => drawLiffJobItem(j, tomList));

    if (futureAssigned.length === 0) allList.innerHTML = '<div style="color:var(--text-muted); font-size:0.75rem; text-align:center;">ไม่มีงานที่จองไว้ในวันถัดๆ ไป</div>';
    else futureAssigned.forEach(j => drawLiffJobItem(j, allList));
}

function handleMassagerRegister(e) {
    e.preventDefault();
    const name = document.getElementById('m-reg-name').value;
    const phone = document.getElementById('m-reg-phone').value;
    const zone = document.getElementById('m-reg-zone').value;

    const nextIdx = massagers.length + 1;
    const newCode = `MCA-${nextIdx.toString().padStart(5, '0')}`;
    const lineId = `line_massager_reg_${Date.now().toString().substring(8)}`;

    const newMassager = {
        line_user_id: lineId,
        massager_id: newCode,
        name,
        phone,
        zone,
        rating_stars: 5.0,
        rating_score: 10,
        is_active: true
    };

    massagers.push(newMassager);
    simulatedMassagerLineId = lineId;
    activeSimMassagerIdx = massagers.length - 1;

    saveData();
    showToast('สมัครหมอนวดสำเร็จ', `สร้างโปรไฟล์รหัสหมอ ${newCode} สำเร็จ ยินดีต้อนรับพาร์ทเนอร์ใหม่ค่ะ`, 'success');
    initSystem();
}

function richMenuAction(action) {
    const curMassager = massagers.find(m => m.line_user_id === simulatedMassagerLineId);
    if (!curMassager) return;

    // Grab today's active assigned job
    const myBookings = bookings.filter(b => b.massager_line_id === curMassager.line_user_id && b.appointment_date === todayStr);
    
    // Find first job that can accept the status upgrade
    let targetJob = null;
    if (action === 'arrived') {
        targetJob = myBookings.find(b => b.booking_status === 'assigned');
    } else if (action === 'completed') {
        targetJob = myBookings.find(b => b.booking_status === 'arrived');
    }

    if (!targetJob) {
        showToast('ไม่สามารถอัปเดตได้', 'ไม่มีงานนวดในวันนี้ที่สามารถเปลี่ยนสถานะตามที่กดได้', 'warning');
        return;
    }

    if (action === 'arrived') {
        targetJob.booking_status = 'arrived';
        showToast('หมอถึงแล้ว', `หมอ ${curMassager.name} รายงานตัวว่าเดินทางถึงรหัสงาน ${targetJob.booking_id} แล้ว`, 'success');
    } else if (action === 'completed') {
        targetJob.booking_status = 'completed';
        showToast('ปิดงานนวดแล้ว', `หมอ ${curMassager.name} บันทึกจบงานนวดรหัสงาน ${targetJob.booking_id} เรียบร้อยแล้ว`, 'success');
    }

    saveData();
    initSystem();
}

// =========================================================================
// MassageAPI SIMULATORS & TIMERS
// =========================================================================

// Alarm Alert 1: Tomorrow Job reminder at 20:00
function triggerTomorrowJobsAlert() {
    const tomBookings = bookings.filter(b => b.appointment_date === tomorrowStr && b.booking_status === 'assigned');
    
    if (tomBookings.length === 0) {
        showToast('แจ้งเตือนรันสำเร็จ', 'ไม่มีงานจองที่จ่ายงานไว้แล้วในวันพรุ่งนี้ ไม่มีข้อความส่งออก', 'info');
        return;
    }

    let alertCount = 0;
    tomBookings.forEach(booking => {
        const massager = massagers.find(m => m.line_user_id === booking.massager_line_id);
        if (massager) {
            alertCount++;
            const text = `🔔 [แจ้งเตือนตารางงานวันพรุ่งนี้]\nสวัสดีค่ะหมอ ${massager.name} วันพรุ่งนี้มีตารางงานนวด:\n⏰ เวลา: ${booking.appointment_time} น.\n📌 บริการ: ${booking.service_type}\n📍 โซนที่อยู่: ${booking.address.substring(0, 30)}...\nกรุณาเตรียมความพร้อมด้วยนะคะ 💆‍♀️`;
            
            simSendMassageAPI(massager.line_user_id, text, 'gold');
        }
    });

    showToast('MassageAPI Dispatch', `ส่งข้อความแจ้งเตือนวันพรุ่งนี้ไปยังหมอนวดสำเร็จ จำนวน ${alertCount} คน`, 'success');
}

// Alarm Alert 2: 1 Hour before job alert
function triggerOneHourAlert() {
    // Look for assigned today jobs starting within 1 hour
    const activeJobs = bookings.filter(b => b.appointment_date === todayStr && b.booking_status === 'assigned');
    
    if (activeJobs.length === 0) {
        showToast('สแกนเสร็จสิ้น', 'ไม่มีงานนวดที่ใกล้จะถึงกำหนดใน 1 ชั่วโมงนี้', 'info');
        return;
    }

    let alertCount = 0;
    activeJobs.forEach(booking => {
        const massager = massagers.find(m => m.line_user_id === booking.massager_line_id);
        if (massager) {
            alertCount++;
            const text = `⏰ [แจ้งเตือนก่อนเวลางาน 1 ชั่วโมง]\nสวัสดีค่ะหมอ ${massager.name}\nงานรหัส ${booking.booking_id} กำลังจะเริ่มในอีก 1 ชั่วโมง (เวลา ${booking.appointment_time} น.)\nกรุณาเริ่มออกเดินทางและอัพเดทสถานะ "ถึงแล้ว" ผ่านริชเมนูด้วยนะคะ`;
            
            simSendMassageAPI(massager.line_user_id, text);
        }
    });

    showToast('MassageAPI Dispatch', `สแกนล่วงหน้าส่งเตือนหมอนวด 1 ชั่วโมง สำเร็จจำนวน ${alertCount} ราย`, 'success');
}

function simSendMassageAPI(recipient, messageText, colorType = 'info') {
    let nameStr = 'หมอนวด';
    if (recipient === 'all_massagers_group') {
        nameStr = 'LINE OA ฝั่งหมอนวด (Broadcast)';
    } else {
        const m = massagers.find(item => item.line_user_id === recipient);
        const c = clients.find(item => item.line_user_id === recipient);
        nameStr = m ? `LINE OA หมอ: ${m.name}` : (c ? `LINE OA ลูกค้า: ${c.name}` : recipient);
    }

    showToast(`MassageAPI: ส่งหา ${nameStr}`, messageText, colorType);
}

// =========================================================================
// FORMATTING UTILITIES & HELPERS
// =========================================================================
function formatDateThai(dateStr) {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const year = parseInt(parts[0]) + 543;
    const monthThai = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const month = monthThai[parseInt(parts[1]) - 1];
    const day = parseInt(parts[2]);
    return `${day} ${month} ${year}`;
}

function translateStatus(status) {
    switch(status) {
        case 'pending_details': return 'รอแอดมินตรวจ';
        case 'broadcasting': return 'หาหมอนวดอยู่';
        case 'assigned': return 'จ่ายงานแล้ว';
        case 'arrived': return 'ถึงลูกค้าแล้ว';
        case 'completed': return 'ปิดงานเสร็จสิ้น';
        case 'cancelled': return 'ยกเลิกแล้ว';
        default: return status;
    }
}

function renderStars(rating) {
    let starsHtml = '';
    const rounded = Math.round(rating * 2) / 2; // round to nearest 0.5
    for(let i=1; i<=5; i++) {
        if (i <= rounded) {
            starsHtml += '<i class="fa-solid fa-star star-filled"></i>';
        } else if (i - 0.5 === rounded) {
            starsHtml += '<i class="fa-solid fa-star-half-stroke star-filled"></i>';
        } else {
            starsHtml += '<i class="fa-regular fa-star"></i>';
        }
    }
    return starsHtml;
}
//////////////////////////////////////////////เวลา //////////////////////////

 function updateDateTime() {
            const now = new Date();

            const date = now.toLocaleDateString('sv-SE'); // YYYY-MM-DD
            const time = now.toLocaleTimeString('th-TH', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            document.getElementById("current-datetime").textContent = `${date} ${time}`;
        }

        // แสดงทันที
        updateDateTime();

        // อัปเดตทุก 1 วินาที
        setInterval(updateDateTime, 1000);

///////////////////////////////// ตารางปฏิทิน /////////////////////////////////////

const monthName = document.getElementById("calendar-month-name");
const calendar = document.getElementById("calendar-days-container");

function renderCalendar() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();
    const currentDate = today.getDate();

    // แสดงชื่อเดือน
    monthName.textContent = today.toLocaleDateString("th-TH", {
        month: "long",
        year: "numeric"
    });

    calendar.innerHTML = "";


    // หัวตาราง
    const weekNames = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];
    weekNames.forEach(day => {
        const head = document.createElement("div");
        head.className = "calendar-header";
        head.textContent = day;
        calendar.appendChild(head);
    });

    // วันแรกของเดือน
    const firstDay = new Date(year, month, 1).getDay();

    // จำนวนวันในเดือน
    const lastDate = new Date(year, month + 1, 0).getDate();

    // ช่องว่างก่อนวันที่ 1
    for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement("div");
        blank.className = "calendar-day empty";
        calendar.appendChild(blank);
    }

    // วันที่
    for (let d = 1; d <= lastDate; d++) {
        const day = document.createElement("div");
        day.className = "calendar-day";
        day.textContent = d;

        // ไฮไลต์วันปัจจุบัน
        if (d === currentDate) {
            day.classList.add("today");
        }

        calendar.appendChild(day);
    }
}

renderCalendar();
///////////////////////////////// ตารางปฏิทิน /////////////////////////////////////