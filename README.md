#  LTE Throughput Calculator

 A simple **LTE Throughput Calculator** built with **React (Vite) and Node.js (Express)**.  
It calculates LTE **downlink throughput** based on bandwidth, frequency, cyclic prefix,  
and distance using the **Free Space Path Loss model** and LTE **SINR-to-MCS mapping**.

---

##  Features
-  **Frontend:** React + Vite + Axios  
-  **Backend:** Node.js + Express  
-  **Uses real LTE formulas for accurate calculations**  
-  **Handles input validation and error messages**  
-  **Responsive UI with a clean, modern design**  

---

##  Formulas Used

###  **Free Space Path Loss (FSPL)**
Loss(dB) = 20log(d) + 20log(f) + 32.45

where:
- `d` = distance (km)
- `f` = frequency (MHz)

###  Received Power Calculation
P_r = P_t - Loss

where:
- `P_r` = Received power (dBm)
- `P_t` = Transmission power (43 dBm)

###  SINR Calculation
SINR = P_r - P_n

where:
- `P_n` = Noise + Interference (-110 dBm)

###  LTE Throughput Calculation
T = BW × Spectral Efficiency

where:
- `BW` = Bandwidth (MHz)
- Spectral efficiency is mapped based on **SINR values**  

---
##  How to Run

###  Clone the Repository
git clone https://github.com/your-username/LTE-Throughput-Calculator.git cd LTE-Throughput-Calculator


###  Install Dependencies
npm install


###  Start the Backend (Node.js)
cd server node server.js


###  Start the Frontend (React)
cd client 
npm run dev


### 📌 5️⃣ Open the App in Browser
http://localhost:5173



