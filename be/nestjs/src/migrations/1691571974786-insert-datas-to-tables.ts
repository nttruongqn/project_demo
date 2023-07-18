import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertDatasToTables1691571974786 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "TechnologyScreen" ("name")
    VALUES ('Super AMOLED'),
    ('Dynamic AMOLED 2X'),
    ('AMOLED'),
    ('Foldable Dynamic AMOLED 2X'),
    ('OLED'),
    ('IPS LCD'),
    ('Super Retina XDR - ProMotion')
    `);

    await queryRunner.query(`INSERT INTO "WideScreen" ("name")
    VALUES ('6,4 inch'),
    ('6,6 inch'),
    ('Full HD+ (1080 x 2340 Pixels'),
    ('Chính 7.6" & Phụ 6.2" - Tần số quét 120Hz'),
    ('6.1" - Tần số quét 120Hz'),
    ('6.7" - Tần số quét 120 Hz'),
    ('6.1 inches'),
    ('6.1" - Tần số quét 60 Hz'),
    ('6.1" - Tần số quét 120 Hz')`);

    await queryRunner.query(`INSERT INTO "AdvancedShooting" ("name")
    VALUES ('Đèn flash LED, toàn cảnh, HDR'),
    ('Chạm lấy nét / HDR / Làm đẹp / Lấy nét theo pha (PDAF) / Nhận diện khuôn mặt / Siêu cận (Macro) / Toàn cảnh (Panorama) / Tự động lấy nét (AF) / Xóa phông / Zoom kỹ thuật số'),
    ('Tính năng chụp đêm Nightography - Mắt Thần Bóng Đêm / Chế độ FlexCam / Zoom quang học 3x / Zoom kỹ thuật số 30x'),
    ('Chụp đêm Nightography / Chế độ Super HDR / Chụp hình & quay phim với Portrait AI / Chống rung kỹ thuật số AI VDIS / Zoom kĩ thuật số 30x, Zoom quang học 3x'),
    ('Ban đêm (Night Mode) / Chống rung quang học (OIS) / Dolby Vision HDR / Góc rộng (Wide) / Góc siêu rộng (Ultrawide) / Nhận diện khuôn mặt / Quay chậm (Slow Motion) / Toàn cảnh (Panorama) / Time Lapse / Tự động lấy nét (AF)'),
    ('Ban đêm (Night Mode) Trôi nhanh thời gian (Time Lapse) Quay chậm (Slow Motion) Xóa phông Zoom quang học Toàn cảnh (Panorama) Chống rung quang học (OIS) Tự động lấy nét (AF) Nhận diện khuôn mặt HDR Ảnh Raw Góc rộng (Wide) Góc siêu rộng (Ultraw)')`);

    await queryRunner.query(`
    INSERT INTO "FilmRearCamera" ("name")
    VALUES ('4K@30fps, 1080p@30/60fps; gyro-EIS'),
    ('4K@30/60FPS / 1080P@30/60FPS (gyro-EIS)'),
    ('FullHD 1080p@60fps, FullHD 1080p@30fps, 4K 2160p@30fps, HD 720p@30fps, HD 720p@60fps'),
    ('UHD 8K (7680 x 4320)@24fps'),
    ('4K@60fps'),
    ('2160p@24/30/60fps, 1080p@30/60/120/240fps, HDR, stereo sound rec.'),
    ('4K 2160p@30fps / 4K 2160p@60fps / FullHD 1080p@120fps / HD 720p@30fps / FullHD 1080p@240fps / FullHD 1080p@60fps / 4K 2160p@24fps / FullHD 1080p@30fps')`);

    await queryRunner.query(`
    INSERT INTO "ResolutionRearCamera" ("name")
    VALUES ('50MP + 12MP + 5MP'),
    ('12 MP + 12 MP + 8 MP'),
    ('48MP + 8MP + 5MP'),
    ('Chính 50 MP & Phụ 12 MP, 10 MP'),
    ('50 MP + 12 MP + 10 MP'),
    ('Chính 48 MP & Phụ 12 MP, 12 MP'),
    ('12 MP + 12 MP'),
    ('2 camera 12 MP'),
    ('12MP + 12MP + 12MP')`);

    await queryRunner.query(`
    INSERT INTO "VideoCall" ("name")
    VALUES ('4K@30fps, 1080p@30fps'),
    ('1080P@30/60FPS, 720P/30FPS'),
    ('4K@60fps'),
    ('HDR, Quay video Full HD')`);

    await queryRunner.query(`
    INSERT INTO "ResolutionFrontCamera" ("name")
    VALUES ('32 MP'),
    ('1080P@30/60FPS, 720P/30FPS'),
    ('13 MP'),
    ('10 MP & 4 MP'),
    ('10 MP'),
    ('12 MP')`);

    await queryRunner.query(`
    INSERT INTO "CPU" ("name")
    VALUES ('Exynos 1380 (5nm'),
    ('MediaTek Dimensity 1080 8 nhân'),
    ('Exynos 2100 (5 nm)'),
    ('Snapdragon 8+ Gen 1'),
    ('Apple A16 Bionic 6 nhân'),
    ('Apple A13 Bionic'),
    ('Apple A15 Bionic')`);

    await queryRunner.query(`
    INSERT INTO "GPU" ("name")
    VALUES ('Mali-G68'),
    ('Mali-G68 MC4'),
    ('Adreno 670'),
    ('Qualcomm Adreno GPU'),
    ('Apple GPU 5 nhân'),
    ('Apple GPU 4 nhân')`);

    await queryRunner.query(`
    INSERT INTO "OperationSystem" ("name")
    VALUES ('Android 13'),
    ('Android 12 - OneUI 4.0'),
    ('iOS 16'),
    ('iOS 13'),
    ('iOS 15')`);

    await queryRunner.query(`
    INSERT INTO "Ram" ("name")
    VALUES ('8 GB'),('12 GB'),('6 GB'),('4 GB')`);
    await queryRunner.query(`INSERT INTO "Rom" ("name")
    VALUES ('64GB'),('128GB'),('256 GB'),('512GB')`);
    await queryRunner.query(`INSERT INTO "SDCard" ("name")
    VALUES ('Tối đa 1TB'),('Không')`);

    await queryRunner.query(`INSERT INTO "Wifi" ("name")
    VALUES ('Wi-Fi 802.11 a/b/g/n/ac, băng tần kép, Wi-Fi Direct'),
    ('Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct, hotspot'),
    ('Dual-band (2.4 GHz/5 GHz), Wi-Fi hotspot, Wi-Fi Direct, Wi-Fi 802.11 a/b/g/n/ac, Wi-Fi MIMO'),
    ('802.11 a/b/g/n/ac/ax 2.4G+5GHz+6GHz, HE160, MIMO, 1024-QAM'),
    ('Wi-Fi 802.11 a/b/g/n/ac/6e, Dual-band, Wi-Fi Direct, Wi-Fi hotspot'),
    ('Wi-Fi 802.11 a/b/g/n/ac/ax, dual-band, hotspot')
    `);

    await queryRunner.query(`
    INSERT INTO "GPS" ("name")
    VALUES ('GPS, GLONASS, GALILEO, BDS'),
    ('GPS, Glonass, Beidou, Galileo, QZSS'),
    ('A-GPS, GLONASS, GALILEO, QZSS'),
    ('QZSS, iBeacon, A-GPS, BDS, GALILEO, GLONASS')`);

    await queryRunner.query(`INSERT INTO "Bluetooth" ("name")
    VALUES ('5.2, A2DP, LE'),
    ('v5.3')`);

    await queryRunner.query(`INSERT INTO "ChargingPort" ("name")
    VALUES ('USB Type-C'),
    ('Lightning')`);

    await queryRunner.query(`
    INSERT INTO "OtherConnect" ("name")
    VALUES ('NFC'),('NFC, OTG'),
    ('Samsung Dex, NFC, OTG, Smart Switch'),
    ('NFC, Smart Switch (PC version)')
    `);
    await queryRunner.query(`
    INSERT INTO "NetworkConnection" ("name")
    VALUES ('Hỗ trợ 5G')`);

    await queryRunner.query(`
    INSERT INTO "SIM" ("name")
    VALUES ('2 SIM (Nano-SIM)'),
    ('2 Nano SIM hoặc 1 Nano SIM + 1 eSIM'),
    ('1 Nano SIM & 1 eSIM'),
    ('Nano SIM')`);

    await queryRunner.query(`INSERT INTO "BatteryType" ("name")
    VALUES ('Li-Po'),
    ('Li-Ion')`);
    await queryRunner.query(`INSERT INTO "BatteryCapacity" ("name")
    VALUES ('4500 mAh'),
    ('5000 mAh'),
    ('4400 mAh'),
    ('3700 mAh'),
    ('3110 mAh'),
    ('3.150 mAh'),
    ('Đang cập nhật')`);

    await queryRunner.query(`INSERT INTO "BatteryTechnology" ("name")
    VALUES ('Sạc nhanh 25W'),
    ('Tiết kiệm pin / Sạc pin nhanh'),
    ('Sạc pin nhanh'),
    ('Sạc không dây / Sạc pin nhanh / Tiết kiệm pin'),
    ('Chia sẻ không dây / Sạc siêu nhanh / Sạc không dây'),
    ('Sạc không dây MagSafe / Sạc pin nhanh / Tiết kiệm pin'),
    ('Siêu tiết kiệm pin, Sạc pin nhanh 25W, Tiết kiệm pin')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "WideScreen"`);
    await queryRunner.query(`DELETE FROM "TechnologyScreen"`);
    await queryRunner.query(`DELETE FROM "ResolutionScreen"`);
    await queryRunner.query(`DELETE FROM "AdvancedShooting"`);
    await queryRunner.query(`DELETE FROM "FilmRearCamera"`);
    await queryRunner.query(`DELETE FROM "ResolutionRearCamera"`);
    await queryRunner.query(`DELETE FROM "VideoCall"`);
    await queryRunner.query(`DELETE FROM "ResolutionFrontCamera"`);
    await queryRunner.query(`DELETE FROM "CPU"`);
    await queryRunner.query(`DELETE FROM "GPU"`);
    await queryRunner.query(`DELETE FROM "OperationSystem" `);
    await queryRunner.query(`DELETE FROM "RAM"`);
    await queryRunner.query(`DELETE FROM "ROM"`);
    await queryRunner.query(`DELETE FROM "SDCard"`);
    await queryRunner.query(`DELETE FROM "Wifi"`);
    await queryRunner.query(`DELETE FROM "GPS" `);
    await queryRunner.query(`DELETE FROM "Bluetooth" `);
    await queryRunner.query(`DELETE FROM "ChargingPort" `);
    await queryRunner.query(`DELETE FROM "OtherConnect" `);
    await queryRunner.query(`DELETE FROM "NetworkConnection" `);
    await queryRunner.query(`DELETE FROM "SIM" `);
    await queryRunner.query(`DELETE FROM "BatteryType" `);
    await queryRunner.query(`DELETE FROM "BatteryCapacity" `);
    await queryRunner.query(`DELETE FROM "BatteryTechnology" `);
    await queryRunner.query(`DELETE FROM "Material" `);
    await queryRunner.query(`DELETE FROM "Size" `);
    await queryRunner.query(`DELETE FROM "Weight" `);
  }
}
