export default function Select({}) {
  return (
    <select
      name="bargaining"
      className="block w-1/2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="" disabled>
        -- 선택 --
      </option>
      <option value="yes">가능</option>
      <option value="no" selected>
        불가능
      </option>
    </select>
  );
}
