# LuFast PWA - Hướng dẫn cài đặt

## Yêu cầu để cài đặt PWA trên Android

1. **HTTPS BẮT BUỘC** - PWA chỉ hoạt động trên HTTPS hoặc localhost
2. Dùng **Chrome browser** trên Android
3. Truy cập ứng dụng qua **HTTPS**

## Các bước cài đặt

### 1. Deploy lên hosting có HTTPS
Bạn cần deploy ứng dụng lên một hosting có SSL/HTTPS. Một số lựa chọn miễn phí:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

### 2. Mở ứng dụng trên Chrome Android
1. Mở Chrome trên điện thoại Android
2. Truy cập URL HTTPS của ứng dụng
3. Chờ ứng dụng load hoàn toàn

### 3. Cài đặt PWA
Chrome sẽ tự động hiển thị thông báo cài đặt nếu ứng dụng đủ điều kiện:
- **Nút "Add to Home Screen"** sẽ xuất hiện trong menu 3 chấm (⋮)
- Hoặc **banner cài đặt** sẽ hiện ở dưới cùng

Nếu không thấy nút cài đặt:
1. Nhấn menu 3 chấm (⋮)
2. Chọn "Add to Home Screen" hoặc "Install app"
3. Xác nhận cài đặt

### 4. Kiểm tra sau cài đặt
- App sẽ xuất hiện trên màn hình chính
- Mở app sẽ không có thanh địa chỉ Chrome
- App hoạt động offline cơ bản

## Files đã thêm
- `manifest.json` - Cấu hình PWA
- `sw.js` - Service Worker cho offline support
- `README.md` - Hướng dẫn này

## Lưu ý quan trọng
- **KHÔNG THỂ cài đặt PWA từ file:// protocol**
- **CẦN HTTPS** để Chrome hiển thị nút cài đặt
- Test trên localhost có thể dùng nhưng không thể cài đặt PWA
