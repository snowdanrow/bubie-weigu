# 不瘪微鼓 - 外卖比价专家

一个专业的外卖比价工具，帮助用户在淘宝闪购、京东闪送和美团外卖三大平台找到最优惠的价格。

## 项目特点

- 🚀 **快速比价**：一键对比三大平台的商家价格
- 📱 **PWA支持**：支持添加到主屏幕，提供原生应用体验
- 🔗 **平台授权**：安全的第三方平台授权机制
- 💳 **支付集成**：支持微信支付和银行卡支付
- 📍 **位置服务**：基于地理位置的商家推荐
- 🎨 **现代设计**：采用Tailwind CSS构建的现代化界面

## 部署说明

### GitHub Pages 部署

1. **克隆仓库**
   ```bash
   git clone https://github.com/snowdanrow/bubie-weigu.git
   cd bubie-weigu
   ```

2. **配置GitHub Pages**
   - 访问GitHub仓库页面
   - 进入 `Settings` → `Pages`
   - **Source**: 选择 `Deploy from a branch`
   - **Branch**: 选择 `main`，文件夹选择 `/ (root)`
   - 点击 `Save`

3. **等待部署完成**
   - GitHub会自动部署网站
   - 部署成功后会显示访问地址：`https://snowdanrow.github.io/bubie-weigu/`

### 本地开发

1. **安装依赖**（无需额外依赖，使用CDN）

2. **启动本地服务器**
   ```bash
   # 使用Python
   python3 -m http.server 8000
   
   # 或使用Node.js
   npx serve .
   
   # 或使用PHP
   php -S localhost:8000
   ```

3. **访问应用**
   - 打开浏览器访问：`http://localhost:8000`

## PWA功能

### 安装到主屏幕

1. **iOS设备**（Safari浏览器）
   - 访问网站
   - 点击底部的"分享"按钮
   - 选择"添加到主屏幕"
   - 点击"添加"确认

2. **Android设备**（Chrome浏览器）
   - 访问网站
   - 点击地址栏右侧的"安装"图标
   - 按照提示完成安装

### 离线访问

- 应用支持离线访问主要功能
- Service Worker会缓存核心资源
- 无网络时仍可查看已缓存的内容

## 核心功能

### 1. 平台授权

- **淘宝闪购**：使用URL Scheme `taobao://` 进行授权
- **京东闪送**：使用URL Scheme `openapp.jdmobile://` 进行授权
- **美团外卖**：使用URL Scheme `meituanwaimai://` 进行授权

### 2. 价格对比

- 自动抓取各平台的商家价格信息
- 智能分析并推荐最优惠的选择
- 支持按价格、距离、销量等维度排序

### 3. 支付功能

- **微信支付**：通过微信支付SDK集成
- **银行卡支付**：支持主流银行卡在线支付
- 安全的支付流程，保护用户支付信息

### 4. 位置服务

- 自动获取用户当前位置
- 基于位置推荐附近的商家
- 支持手动选择配送地址

## 技术栈

- **前端框架**：HTML5 + CSS3 + JavaScript
- **CSS框架**：Tailwind CSS v3
- **图标库**：Font Awesome 4.7.0
- **PWA支持**：Web App Manifest + Service Worker
- **部署平台**：GitHub Pages

## 项目结构

```
├── index.html          # 应用入口页面（登录授权）
├── main.html           # 主页面（价格对比）
├── merchant.html       # 商家详情页面
├── manifest.json       # PWA配置文件
├── service-worker.js   # Service Worker文件
├── .nojekyll           # 禁用GitHub Pages的Jekyll处理
└── README.md           # 项目说明文档
```

## 浏览器兼容性

| 浏览器 | 版本要求 | 支持的功能 |
|--------|----------|------------|
| Safari | iOS 12+ | 完整功能，支持PWA安装 |
| Chrome | 70+ | 完整功能，支持PWA安装 |
| Firefox | 65+ | 基本功能，部分PWA特性 |
| Edge | 79+ | 完整功能，支持PWA安装 |

## 安全说明

### 数据安全

- 用户授权信息仅用于获取价格数据
- 不会存储用户的敏感信息
- 所有数据传输使用HTTPS加密

### 隐私保护

- 严格遵守用户隐私政策
- 不会未经授权收集用户信息
- 提供清晰的隐私政策说明

## 常见问题

### Q: 无法打开外卖平台APP进行授权怎么办？

**A:** 请确保已安装对应的外卖APP，并检查是否允许"不瘪微鼓"访问该APP。如果仍然无法打开，请尝试重新安装外卖APP。

### Q: 为什么价格信息显示不完整？

**A:** 可能是因为网络问题或平台限制导致部分数据获取失败。请尝试刷新页面或检查网络连接。

### Q: PWA无法添加到主屏幕怎么办？

**A:** 请确保使用的是支持PWA的浏览器（如Safari、Chrome），并检查网站是否通过HTTPS访问。如果问题仍然存在，请清除浏览器缓存后重试。

### Q: 支付过程中遇到问题怎么办？

**A:** 请检查支付信息是否正确填写，网络连接是否稳定。如果支付失败但已扣款，请联系客服处理退款事宜。

## 更新日志

### v1.0.0 (2026-03-05)

- ✨ 首次发布
- 🎯 实现三大外卖平台的价格对比
- 📱 支持PWA安装到主屏幕
- 💳 集成微信支付和银行卡支付
- 📍 实现基于位置的商家推荐

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 联系方式

如有问题或建议，请通过以下方式联系：

- **项目地址**：[https://github.com/snowdanrow/bubie-weigu](https://github.com/snowdanrow/bubie-weigu)
- **Issue反馈**：[https://github.com/snowdanrow/bubie-weigu/issues](https://github.com/snowdanrow/bubie-weigu/issues)

---

**不瘪微鼓** - 让每一笔外卖都更划算！ 🎉