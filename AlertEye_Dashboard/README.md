
# alertEye Core AI - Raspberry Pi Deployment Guide

This dashboard is designed to run on a Raspberry Pi 4 or 5. It acts as the UI frontend for the `alertEye` violence detection system.

## Hardware Requirements
- **Raspberry Pi 4/5** (4GB RAM recommended)
- **USB Webcam** or **Pi Camera Module 3**
- **Active Cooling** (Highly recommended for YOLO inference)

## Prerequisites

### 1. Backend (Python/YOLO)
On your Pi, install the requirements for the inference engine:
```bash
pip install ultralytics opencv-python Flask flask-cors
```
*Note: Run your existing Python script modified to serve a WebSocket or HTTP stream to this dashboard.*

### 2. UI Frontend
Ensure you have Node.js installed:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Setup & Execution

1. **Clone & Install Dependencies:**
   ```bash
   git clone <your-repo>
   cd alertEye-dashboard
   npm install
   ```

2. **Configure API Key:**
   Export your Gemini API Key in the shell environment:
   ```bash
   export API_KEY='your_gemini_api_key'
   ```

3. **Development Mode:**
   ```bash
   npm run dev
   ```

4. **Production Build:**
   ```bash
   npm run build
   # Serve using a simple server like 'serve'
   sudo npm install -g serve
   serve -s build
   ```

## Optimization Tips for Pi
- **Use YOLOv8n (Nano):** The `v_model.pt` should be the Nano version for real-time performance on Pi.
- **Hardware Acceleration:** In Chromium (on Pi), ensure `GPU Acceleration` is enabled in `chrome://flags` to render the dashboard smoothly.
- **Frame Rate:** The dashboard is optimized to poll the backend every 4 seconds. For higher frequency, reduce the interval in `App.tsx`, but monitor CPU temps closely.
- **Headless Mode:** If you only need the processing, run the Python script as a systemd service.

## Security Note
Keep your `API_KEY` safe. Do not commit it to public repositories.
