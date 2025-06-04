import "./Slider.css";
function Slider({range, setRange}) {
    return (
        <div className="">
            <input
                type="range"
                min="0"
                max="100"
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="custom-slider"
                style={{
                    background: `linear-gradient(to right, #E94057 0%, #E94057 ${range}%, #e5e3e8 ${range}%, #e5e3e8 100%)`
                }}
            />
        </div>
    )
}

export default Slider;