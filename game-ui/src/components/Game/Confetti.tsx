
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function Confetti() {
    return <div data-testid="confetti"><Fireworks autorun={{ speed: 3 }} /></div>
}