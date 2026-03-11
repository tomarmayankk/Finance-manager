const InputSlider = ({ label, value, setValue, min, max, step = 1 }) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-8 w-full">
      {/* Label + Number Input */}
      <div className="flex justify-between items-center mb-3">
        <label className="font-medium text-gray-700">{label}</label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-20 p-1 text-right border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Slider Container */}
      <div className="relative w-full h-2 rounded-full bg-gray-200">
        {/* Filled Track */}
        <div
          className="absolute top-0 left-0 h-2 rounded-full bg-blue-500"
          style={{ width: `${percent}%` }}
        ></div>

        {/* Actual Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute top-0 left-0 w-full h-2 bg-transparent appearance-none cursor-pointer"
          style={{ pointerEvents: "auto" }}
        />
      </div>
    </div>
  );
};

export default InputSlider;