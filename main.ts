// ==========================================
// PANIC DOLL PROTO-SYSTEM (CORRECTED)
// ==========================================

// CHOOSE YOUR MODE: Change to true for the Transmitter (Doll) 
// or false for the Receiver (Placeholder Police Base)
let IS_TRANSMITTER = true;

// Setup identical radio groups so both micro:bits can talk to each other
radio.setGroup(99);
radio.setTransmitPower(7); // Max range power

if (IS_TRANSMITTER) {
    // ------------------------------------------
    // TRANSMITTER CODE (Inside the Panic Doll)
    // ------------------------------------------
    basic.showString("DOLL");

    // Input 1: Left Eye -> Minor Problem (Button A)
    input.onButtonPressed(Button.A, function () {
        basic.showString("MINR");
        radio.sendNumber(1); // Protocol code 1: Minor emergency
        basic.clearScreen();
    });

    // Input 2: Right Eye -> Medium Problem / Street Thuggery (Button B)
    input.onButtonPressed(Button.B, function () {
        basic.showString("MEDM");
        radio.sendNumber(2); // Protocol code 2: Medium emergency
        basic.clearScreen();
    });

    // Input 3: Mouth -> Deadly Emergency (Buttons A + B together)
    input.onButtonPressed(Button.AB, function () {
        basic.showString("CRIT");
        radio.sendNumber(3); // Protocol code 3: Deadly emergency
        basic.clearScreen();
    });

} else {
    // ------------------------------------------
    // RECEIVER CODE (Placeholder for Police IP Link)
    // ------------------------------------------
    basic.showString("BASE");

    // Listen for incoming panic radio signals
    radio.onReceivedNumber(function (receivedNumber) {

        if (receivedNumber == 1) {
            // Minor Alert Action
            basic.showIcon(IconNames.Asleep);
            basic.showString("ALERT: MINOR PROB");

        } else if (receivedNumber == 2) {
            // Medium Alert Action (e.g., Street Thuggery)
            basic.showIcon(IconNames.Angry);
            basic.showString("ALERT: MEDIUM THUGGERY");

        } else if (receivedNumber == 3) {
            // Deadly Alert Action
            for (let i = 0; i < 4; i++) {
                // Flash an alarm icon rapidly
                basic.showIcon(IconNames.Skull);
                basic.pause(100);
                basic.clearScreen();
                basic.pause(100);
            }
            basic.showString("CRITICAL: DEADLY EMERGENCY");
        }
        basic.clearScreen();
    });
}
