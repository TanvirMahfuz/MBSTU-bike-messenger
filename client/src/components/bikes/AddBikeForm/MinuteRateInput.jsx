export default function MinuteRateInput({ value, onChange }) {
  return (
    <div>
      <label
        htmlFor="minuteRate"
        className="block text-sm font-medium text-gray-700">
        Minute Rate ($)
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          id="minuteRate"
          name="minuteRate"
          type="number"
          min="0.01"
          step="0.01"
          required
          value={value}
          onChange={onChange}
          className="pl-7 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="0.50"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        How much per minute to charge renters
      </p>
    </div>
  );
}
