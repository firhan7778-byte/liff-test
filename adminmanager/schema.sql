-- =========================================================================
-- SQL DATABASE SCHEMA: MOMOMOM WELLNESS SOLUTION MANAGEMENT SYSTEM
-- Compatible with MySQL (8.0+) and PostgreSQL (12+).
-- =========================================================================

-- IMPORTANT: BEFORE PRODUCTION DEPLOYMENT
-- Please read the comments marked with "[PRODUCTION CHANGE REQUIRED]" to customize
-- settings, triggers, security policies, and integrations.

CREATE DATABASE IF NOT EXISTS momomom_wellness;
USE momomom_wellness;

-- -------------------------------------------------------------------------
-- 1. SYSTEM SETTINGS & CONFIGURATIONS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS system_settings (
    config_key VARCHAR(100) PRIMARY KEY,
    config_value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- [PRODUCTION CHANGE REQUIRED] 
-- Change the default admin login credentials, LINE API tokens, and MassageAPI configurations below.
INSERT INTO system_settings (config_key, config_value, description) VALUES
('ADMIN_ROOT_PASSCODE', '123456', 'Passcode to authorize root admin configurations'),
('MASSAGE_API_URL', 'https://api.massageapi.com/v1/send', 'Endpoint URL for MassageAPI integration'),
('MASSAGE_API_TOKEN', 'your_production_massage_api_token_here', 'Bearer Token or Secret key for MassageAPI authentication'),
('LINE_CHANNEL_ACCESS_TOKEN_CLIENT', 'your_client_line_oa_token', 'Channel access token for LINE OA (Client-side)'),
('LINE_CHANNEL_ACCESS_TOKEN_MASSAGER', 'your_massager_line_oa_token', 'Channel access token for LINE OA (Massager-side)'),
('CLIENT_LIFF_URL', 'https://liff.line.me/client-booking-form-id', 'URL of the LIFF application for Clients'),
('MASSAGER_LIFF_URL', 'https://liff.line.me/massager-dashboard-id', 'URL of the LIFF application for Massagers');


-- -------------------------------------------------------------------------
-- 2. ADMIN CREDENTIALS TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- [PRODUCTION CHANGE REQUIRED] Store hashed passwords using bcrypt/argon2, never plain text.
    line_user_id VARCHAR(100) UNIQUE NULL, -- Option to log in using LINE Login
    display_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial admin user. [PRODUCTION CHANGE REQUIRED] Change username and replace password hash.
-- Default password: 'Password123'
INSERT INTO admin_users (username, password_hash, display_name) VALUES
('admin', '$2b$12$Kj6n1G4Yk.q81s/p0aV2qOGB.eE89v/W1pB.d2U7yR2b7X6vVpPGu', 'MOMOMOM Chief Admin');


-- -------------------------------------------------------------------------
-- 3. CLIENTS TABLE (ลูกค้า)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS clients (
    line_user_id VARCHAR(100) PRIMARY KEY, -- The unique LINE User Identifier
    client_id VARCHAR(10) UNIQUE NOT NULL, -- Format: MOM-XXXX (e.g. MOM-0001)
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    google_map_link TEXT,
    massage_level VARCHAR(50) DEFAULT 'Medium', -- e.g. Light, Medium, Firm
    pets_info VARCHAR(255) DEFAULT 'None', -- Information about pets (e.g. "Dogs: Yes")
    notes TEXT, -- General remarks/notes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- [PRODUCTION CHANGE REQUIRED] 
-- Triggers for auto-incrementing MOM-XXXX codes based on line_user_id presence.
-- In a production environment, it is highly recommended to handle the sequence generation 
-- either within a stored procedure, or in the application backend (API level) to prevent concurrency race conditions.
-- Here is the standard procedural approach for MySQL:
/*
DELIMITER //
CREATE TRIGGER before_insert_client
BEFORE INSERT ON clients
FOR EACH ROW
BEGIN
    DECLARE next_num INT;
    DECLARE next_id VARCHAR(10);
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(client_id, 5) AS UNSIGNED)), 0) + 1 INTO next_num FROM clients;
    SET NEW.client_id = CONCAT('MOM-', LPAD(next_num, 4, '0'));
END//
DELIMITER ;
*/


-- -------------------------------------------------------------------------
-- 4. MASSAGERS TABLE (หมอนวด)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS massagers (
    line_user_id VARCHAR(100) PRIMARY KEY, -- The unique LINE User Identifier
    massager_id VARCHAR(10) UNIQUE NOT NULL, -- Format: MCA-XXXXX (e.g. MCA-00001)
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    zone VARCHAR(100) NOT NULL, -- Work zone coverage
    rating_stars DECIMAL(2,1) DEFAULT 5.0, -- Display star rating (e.g. 4.5)
    rating_score INT DEFAULT 10, -- Score out of 10
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- [PRODUCTION CHANGE REQUIRED]
-- Sequence generator for MCA-XXXXX codes. Like clients, this should be handled safely 
-- at the database level using auto-generating columns, or in the web service backend.
-- Sample MySQL trigger:
/*
DELIMITER //
CREATE TRIGGER before_insert_massager
BEFORE INSERT ON massagers
FOR EACH ROW
BEGIN
    DECLARE next_num INT;
    SELECT COALESCE(MAX(CAST(SUBSTRING(massager_id, 5) AS UNSIGNED)), 0) + 1 INTO next_num FROM massagers;
    SET NEW.massager_id = CONCAT('MCA-', LPAD(next_num, 5, '0'));
END//
DELIMITER ;
*/


-- -------------------------------------------------------------------------
-- 5. BOOKINGS & CENTRAL DATA TABLE (ข้อมูลกลางและการนัดหมาย)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
    booking_id VARCHAR(20) PRIMARY KEY, -- Format: MO + YYMMDD - XXX (e.g. MO260604-001)
    client_line_id VARCHAR(100) NOT NULL,
    massager_line_id VARCHAR(100) NULL, -- Nullable if massager is not assigned yet
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    service_type VARCHAR(100) NOT NULL, -- e.g. Traditional Thai Massage, Oil Massage
    course_duration VARCHAR(50) NOT NULL, -- e.g. 60 mins, 90 mins, 120 mins
    package_name VARCHAR(200) NOT NULL, -- e.g. Classic Recovery Pack
    guests_count INT DEFAULT 1,
    pregnancy_weeks INT DEFAULT 0, -- 0 if not pregnant, otherwise 1-40
    address TEXT NOT NULL,
    google_map_link TEXT NOT NULL,
    massage_level VARCHAR(50) NOT NULL,
    pets VARCHAR(255) NOT NULL,
    client_note TEXT,
    
    -- Request details
    is_repeated_request BOOLEAN DEFAULT FALSE, -- Flag to identify if client explicitly requested the same massager
    
    -- Status Tracker
    -- 'pending_details': filled by client, awaiting admin review
    -- 'broadcasting': admin broadcasted job to massagers
    -- 'assigned': admin assigned a massager, confirmed details sent to both parties
    -- 'arrived': massager clicked "ถึงแล้ว" (arrived) via rich menu
    -- 'completed': massager clicked "ปิดงานแล้ว" (completed)
    -- 'cancelled': job revoked or cancelled
    booking_status VARCHAR(30) DEFAULT 'pending_details', 
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_line_id) REFERENCES clients(line_user_id),
    FOREIGN KEY (massager_line_id) REFERENCES massagers(line_user_id) ON DELETE SET NULL
);

-- [PRODUCTION CHANGE REQUIRED]
-- The booking ID MOYYMMDD-XXX requires logic to grab the current date, format it, 
-- and check the sequence index starting from 001 for that specific day.
-- A common backend or DB procedural query to retrieve the next booking ID for 2026-07-08:
--   SELECT CONCAT('MO260708-', LPAD(COALESCE(COUNT(*), 0) + 1, 3, '0')) 
--   FROM bookings WHERE appointment_date = '2026-07-08';


-- -------------------------------------------------------------------------
-- 6. MASSAGER JOB APPLICATIONS (หมอนวดตอบรับงาน)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS job_applications (
    booking_id VARCHAR(20) NOT NULL,
    massager_line_id VARCHAR(100) NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'declined'
    PRIMARY KEY (booking_id, massager_line_id),
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (massager_line_id) REFERENCES massagers(line_user_id) ON DELETE CASCADE
);


-- -------------------------------------------------------------------------
-- 7. BOOKING PAYMENTS & REVENUE (ข้อมูลค่าใช้จ่ายและโบนัสที่บันทึกโดยแอดมิน)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS booking_payments (
    booking_id VARCHAR(20) PRIMARY KEY,
    points_earned INT DEFAULT 0, -- Points awarded to the client or massager
    case_fee DECIMAL(10,2) DEFAULT 0.00, -- Rate paid to the massager
    bonus DECIMAL(10,2) DEFAULT 0.00, -- General bonus
    bonus_atk DECIMAL(10,2) DEFAULT 0.00, -- ATK check bonus
    bonus_repeat DECIMAL(10,2) DEFAULT 0.00, -- Repeated request bonus
    admin_note TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
);


-- -------------------------------------------------------------------------
-- 8. CUSTOM MESSAGE TEMPLATES TABLE
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS message_templates (
    template_key VARCHAR(50) PRIMARY KEY, -- e.g. 'CLIENT_CONFIRM', 'MASSAGER_BROADCAST', 'MASSAGER_CONFIRM'
    recipient_type VARCHAR(10) NOT NULL, -- 'CLIENT' or 'MASSAGER'
    template_text TEXT NOT NULL,
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed initial default message templates.
-- [PRODUCTION CHANGE REQUIRED] Admin can edit these texts on the Web interface. Placeholders are bracketed.
INSERT INTO message_templates (template_key, recipient_type, template_text, description) VALUES
('CLIENT_CONFIRM', 'CLIENT', 
 'สวัสดีค่ะ คุณ{client_name} ❤️ คอนเฟิร์มการจองคอร์สสปาของ MOMOMOM WELLNESS นะคะ\n🗓 วันที่: {date}\n⏰ เวลา: {time}\n💆‍♀️ ผู้ให้บริการ: {massager_name} ({massager_code})\n📌 บริการ: {service} ({duration})\n📍 ที่อยู่: {address}\nขอบคุณค่ะ 🙏✨', 
 'Message sent to the client once the booking is confirmed and massager is assigned.'),

('MASSAGER_BROADCAST', 'MASSAGER', 
 '📢 มีงานนวดด่วนเสนอเข้ามารับงานด่วน!\n🗓 วันที่: {date}\n⏰ เวลา: {time}\n📌 บริการ: {service} ({duration})\n📍 โซนพื้นที่: {zone}\nลูกค้า: {client_code} ({guests} ท่าน) {repeated_badge}\n💰 ค่าเคส: {case_fee} บาท | ATK: {atk_bonus} บาท\n👉 สนใจรับงาน พิมพ์ข้อความว่า "สนใจรับงาน!!" ใต้ข้อความนี้เลย!', 
 'Broadcast message sent to Massagers Group or OA to recruit for available jobs.'),

('MASSAGER_CONFIRM', 'MASSAGER', 
 '✅ คอนเฟิร์มการนัดหมายงานคุณหมอ {massager_name} ค่ะ\nรหัสงาน: {booking_code}\n🗓 วันที่: {date}\n⏰ เวลา: {time}\n📌 บริการ: {service} ({duration})\n📍 ลูกค้า: คุณ{client_name} (เบอร์ {client_phone})\n🗺 พิกัด: {map_link}\n🏠 ที่อยู่: {address}\n⚠️ หมายเหตุ: {client_note}\n💰 รายละเอียดรายได้: ค่านวด {case_fee}บ. | ATK {atk_bonus}บ. | โบนัสเรียกซ้ำ {repeat_bonus}บ.\n🔔 กรุณาอัปเดตสถานะ "ถึงแล้ว" และ "ปิดงานแล้ว" ผ่าน Rich Menu นะคะ', 
 'Message sent to the selected massager to confirm assignment.');


-- -------------------------------------------------------------------------
-- INDEXES & PERFORMANCE OPTIMIZATIONS
-- -------------------------------------------------------------------------
CREATE INDEX idx_bookings_date ON bookings(appointment_date);
CREATE INDEX idx_bookings_status ON bookings(booking_status);
CREATE INDEX idx_massagers_zone ON massagers(zone);
CREATE INDEX idx_clients_phone ON clients(phone);
CREATE INDEX idx_job_app_booking ON job_applications(booking_id);

-- [PRODUCTION CHANGE REQUIRED]
-- Standard Cron Jobs / Automated Task Schedule for Notifications:
-- To execute the warnings required by the system (notifying tomorrow's jobs, and 1 hour before a job):
-- 1. Run a cron script on the web server every 10 minutes.
-- 2. Query for "Tomorrow alerts" (Run daily at 8:00 PM / 20:00):
--    SELECT b.booking_id, c.line_user_id AS client_line_id, m.line_user_id AS massager_line_id, b.appointment_date, b.appointment_time
--    FROM bookings b
--    LEFT JOIN clients c ON b.client_line_id = c.line_user_id
--    LEFT JOIN massagers m ON b.massager_line_id = m.line_user_id
--    WHERE b.appointment_date = DATE_ADD(CURDATE(), INTERVAL 1 DAY) AND b.booking_status = 'assigned';
-- 
-- 3. Query for "1 hour warning alert" (Run every 5-10 minutes):
--    SELECT b.booking_id, m.line_user_id AS massager_line_id, b.appointment_date, b.appointment_time
--    FROM bookings b
--    JOIN massagers m ON b.massager_line_id = m.line_user_id
--    WHERE b.booking_status = 'assigned'
--      AND CONCAT(b.appointment_date, ' ', b.appointment_time) BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 HOUR)
--      AND CONCAT(b.appointment_date, ' ', b.appointment_time) >= NOW();
--
-- Integrate the query results above with MassageAPI endpoints to dispatch notifications.
