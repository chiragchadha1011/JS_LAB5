/* Constants
-------------------------------------------------- */
// Selecting elements representing battery status and level
const statusElement = document.querySelector('#battery dd:nth-of-type(1)');
const levelOutput = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeProgressBar = document.querySelector('#battery dd:nth-of-type(2) progress');

/* Functions
-------------------------------------------------- */

// Function to render or update the battery image based on the battery level
function renderBatteryImage(battery) {
    const batteryLevel = Math.round(battery.level * 100);
    const imageUrl = `https://robohash.org/100percent/${batteryLevel}.png`;
    const imageElement = document.getElementById('battery-image');

    // If the image element doesn't exist, create a new one; otherwise, update the source
    if (!imageElement) {
        const newImage = document.createElement('img');
        newImage.id = 'battery-image';
        newImage.src = imageUrl;
        document.body.appendChild(newImage);
    } else {
        imageElement.src = imageUrl;
    }
}

// Function to update the displayed battery status, charge level, and image
function displayBatteryStatus(battery) {
    updateChargingStatus(battery);
    updateChargeLevel(battery);
    renderBatteryImage(battery);
}

// Function to update the displayed charging status based on the battery object
function updateChargingStatus(battery) {
    statusElement.textContent = battery.charging ? "Charging..." : "Discharging...";
}

// Function to update the displayed charge level based on the battery object
function updateChargeLevel(battery) {
    const levelPercentage = (battery.level * 100).toFixed(2);
    levelOutput.textContent = `${levelPercentage}%`;
    chargeProgressBar.value = battery.level * 100;
}

// Event handler function for changes in the charging status
function handleChargingChange(battery) {
    updateChargingStatus(battery);
}

// Event handler function for changes in the charge level
function handleLevelChange(battery) {
    updateChargeLevel(battery);
}

/* Battery Information
-------------------------------------------------- */
// Retrieve battery information using the Battery API
navigator.getBattery().then(battery => {
    // Initial display of battery status, level, and image
    displayBatteryStatus(battery);

    // Event listeners for changes in charging status and charge level
    battery.addEventListener("chargingchange", () => {
        handleChargingChange(battery);
    });

    battery.addEventListener("levelchange", () => {
        handleLevelChange(battery);
    });
});
