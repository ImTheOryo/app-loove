import "./DoubleSlider.css";

function DoubleSlider({minVal, setMinVal, maxVal, setMaxVal}) {


    const min = 18;
    const max = 100;

    const getPercent = (value) => ((value - min) / (max - min)) * 100;

    return (
        <div className="relative">
            <div className="slider-track"></div>
            <div
                className="slider-range"
                style={{
                    left: `${getPercent(minVal)}%`,
                    width: `${getPercent(maxVal) - getPercent(minVal)}%`,
                }}
            ></div>

            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(e) => {
                    const val = Math.min(Number(e.target.value), maxVal - 1);
                    setMinVal(val);
                }}
                className="thumb thumb-left"
            />

            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(e) => {
                    const val = Math.max(Number(e.target.value), minVal + 1);
                    setMaxVal(val);
                }}
                className="thumb thumb-right"
            />
        </div>
    )
}
export default DoubleSlider;