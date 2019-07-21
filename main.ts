enum PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

/**
 * Sonar and ping utilities
 */
//% weight=10 color=#2c3e50 icon="\uf211" block="YLWL:Sonar"
namespace ylwl_sonar {

    //% blockId=sonar_ping block="ping pin %pin|echo %echo|unit %unit"
    export function ping(pin: DigitalPin, echo: DigitalPin, unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(pin, PinPullMode.PullNone);
        pins.digitalWritePin(pin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(pin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(pin, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.round(d / 58);
            case PingUnit.Inches: return Math.round(d / 148);
            default: return d;
        }
    }

}