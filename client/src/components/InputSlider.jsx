const InputSlider = ({ label, value, setValue, min, max, step = 1 }) => {
  return (
    <div className="mb-6 w-full">
      
      {/* Label + Input */}
      <div className="flex justify-between items-center mb-2">
        <label className="text-gray-700 font-medium">{label}</label>

        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => setValue(e.target.value)}
          className="w-32 px-3 py-2 border rounded-md text-right"
        />
      </div>

      {/* Slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full cursor-pointer"
      />

    </div>
  );
};

export default InputSlider;