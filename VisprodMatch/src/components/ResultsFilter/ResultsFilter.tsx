interface ResultsFilterProps {
  limit: number;
  onLimitChange: (limit: number) => void;
}
const ResultsFilter = ({ limit, onLimitChange }: ResultsFilterProps) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      <label htmlFor="results-limit" className="text-white">
        Show results:
      </label>
      <select
        id="results-limit"
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
        className="bg-gray-700 text-white rounded px-2 py-1"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default ResultsFilter