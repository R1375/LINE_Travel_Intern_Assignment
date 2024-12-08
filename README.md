# 飯店管理系統

## 專案簡介
此專案是一個基於 NestJS 框架開發的飯店資訊管理後端系統，主要用於處理和管理飯店相關資訊。系統提供 RESTful API 接口，支援單筆資料的操作以及透過 CSV 檔案批次匯入飯店資訊的功能。

### 主要功能
- RESTful API 接口，支援飯店資料的基本操作（新增、查詢、更新）
- CSV 檔案上傳功能，支援批次匯入飯店資料
- 完整的資料驗證和錯誤處理機制
- MySQL 資料庫整合
- Swagger API 文件自動生成
- Docker 容器化部署支援

## 技術架構
- **後端框架**: NestJS
- **資料庫**: MySQL
- **ORM**: TypeORM
- **API 文件**: Swagger/OpenAPI
- **單元測試**: Jest
- **容器化**: Docker
- **CI/CD**: GitHub Actions

## 環境需求
開始使用前，請確保您的環境已安裝以下軟體：
- Node.js (v18 以上)
- npm (v9 以上)
- MySQL (v8 以上)
- Docker (選擇性，用於容器化部署)

## 快速開始

### 安裝步驟
1. 複製專案
```bash
git clone https://github.com/yourusername/hotel-management-system.git
cd hotel-management-system
```

2. 安裝相依套件
```bash
npm install
```

3. 環境設定
- 複製 `.env.example` 檔案並重新命名為 `.env`
- 依據您的環境設定以下參數：
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=hotel_db
```

4. 啟動專案
```bash
# 開發模式
npm run start:dev

# 正式環境
npm run start:prod
```

## API 文件
專案啟動後，可以通過以下網址訪問 Swagger API 文件：
```
http://localhost:3000/api
```

### 主要 API 端點
- `GET /hotels` - 獲取所有飯店資訊
- `POST /hotels` - 新增單筆飯店資訊
- `PUT /hotels/:id` - 更新指定飯店資訊
- `POST /hotels/upload` - 上傳 CSV 檔案批次匯入飯店資料

## 資料庫結構
飯店資料表結構如下：
```sql
CREATE TABLE hotels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    coordinate VARCHAR(255) NOT NULL,
    status INT NOT NULL
);
```

## CSV 檔案格式
批次匯入的 CSV 檔案格式要求：
```csv
name,address,email,country,city,longitude,latitude,is_open
礁溪老爺酒店,五峰路69號,service@hotelroyal.com.tw,台灣,宜蘭,121.776,24.671,true
```

## 專案結構
```
src/
├── app.module.ts          # 應用程式主模組
├── main.ts               # 應用程式入口點
├── hotels/              # 飯店模組相關檔案
│   ├── dto/            # 資料傳輸物件
│   ├── entities/       # 資料實體
│   ├── hotels.module.ts
│   ├── hotels.controller.ts
│   └── hotels.service.ts
├── config/             # 設定檔
└── test/              # 測試檔案
```

## 測試
```bash
# 單元測試
npm run test

# 測試覆蓋率報告
npm run test:cov
```

## Docker 部署
1. 建立映像檔
```bash
docker build -t hotel-management-system .
```

2. 執行容器
```bash
docker-compose up -d
```
