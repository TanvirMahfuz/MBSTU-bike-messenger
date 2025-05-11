export default function LocationInput({ value, onChange }) {
  return (
    <div>
      <label
        htmlFor="location"
        className="block text-sm font-medium text-gray-700">
        Location
      </label>
      <div className="mt-1">
        <input
          id="location"
          name="location"
          type="text"
          required
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Where is the bike located?"
        />
      </div>
    </div>
  );
}
