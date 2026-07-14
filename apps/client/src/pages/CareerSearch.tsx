import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

interface Career {
  _id: string;
  title: string;
  description: string;
  category: string;
  requiredSkills: string[];
  educationRequired: string;
  averageSalary: string;
  growthOutlook: string;
  workEnvironment: string;
}

interface Suggestion {
  _id: string;
  title: string;
  category: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export default function CareerSearch() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('name_asc');
  const [careers, setCareers] = useState<Career[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get<{ categories: string[] }>(`${API}/careers/categories`)
      .then((res) => setCategories(res.data.categories))
      .catch(() => {});
  }, []);

  const fetchCareers = useCallback(
    async (searchPage: number, searchQuery: string, searchCategory: string, searchSort: string) => {
      setLoading(true);
      try {
        const params: Record<string, string | number> = {
          q: searchQuery,
          page: searchPage,
          limit: 12,
        };
        if (searchCategory) params.category = searchCategory;

        const sortMap: Record<string, string> = {
          name_asc: 'name_asc',
          name_desc: 'name_desc',
          salary_high: 'salary_high',
          salary_low: 'salary_low',
          relevance: 'relevance',
        };
        params.sort = sortMap[searchSort] || 'name_asc';

        const res = await axios.get<{ careers: Career[]; pagination: Pagination }>(
          `${API}/careers/search`,
          { params }
        );
        setCareers(res.data.careers);
        setPagination(res.data.pagination);
      } catch {
        setCareers([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchCareers(page, query, category, sort);
  }, [page, category, sort, fetchCareers]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setPage(1);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length >= 1) {
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await axios.get<{ suggestions: Suggestion[] }>(
            `${API}/careers/suggestions`,
            { params: { q: value } }
          );
          setSuggestions(res.data.suggestions);
          setShowSuggestions(true);
        } catch {
          setSuggestions([]);
        }
      }, 250);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: Suggestion) => {
    setQuery(suggestion.title);
    setShowSuggestions(false);
    setCategory(suggestion.category);
  };

  const clearCategory = () => {
    setCategory('');
    setPage(1);
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const growthBadge = (outlook: string) => {
    const colors: Record<string, string> = {
      'Fast Growing': 'bg-green-100 text-green-700',
      Growing: 'bg-blue-100 text-blue-700',
      Stable: 'bg-gray-100 text-gray-600',
      Declining: 'bg-red-100 text-red-700',
    };
    return colors[outlook] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-[var(--text-h)] mb-1">
          Explore Careers
        </h1>
        <p className="text-[var(--text)] mb-6">
          Search, filter, and discover career paths that match your interests
        </p>

        <div ref={searchRef} className="relative mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search careers..."
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-h)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 top-full left-0 right-0 mt-1 bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-lg overflow-hidden">
                  {suggestions.map((s) => (
                    <li
                      key={s._id}
                      onClick={() => selectSuggestion(s)}
                      className="px-4 py-2.5 cursor-pointer hover:bg-[var(--accent-bg)] text-[var(--text-h)] flex justify-between items-center"
                    >
                      <span>{s.title}</span>
                      <span className="text-xs text-[var(--text)]">{s.category}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-h)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2.5 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--text-h)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] appearance-none cursor-pointer min-w-[150px]"
            >
              <option value="name_asc">Name A-Z</option>
              <option value="name_desc">Name Z-A</option>
              <option value="salary_high">Salary: High to Low</option>
              <option value="salary_low">Salary: Low to High</option>
              <option value="relevance">Relevance</option>
            </select>
          </div>
        </div>

        {category && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-[var(--text)]">Active filter:</span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--accent-bg)] text-[var(--accent)] rounded-full text-sm">
              {category}
              <button onClick={clearCategory} className="hover:opacity-70 ml-1">
                &times;
              </button>
            </span>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-[var(--text)]">Searching careers...</div>
        ) : careers.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text)] text-lg mb-2">No careers found</p>
            <p className="text-sm text-[var(--text)]">
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--text)] mb-4">
              {pagination?.total} career{pagination?.total !== 1 ? 's' : ''} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {careers.map((career) => (
                <div
                  key={career._id}
                  className="border border-[var(--border)] rounded-xl p-5 hover:shadow-md transition-shadow bg-[var(--bg)] flex flex-col"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-medium text-[var(--text-h)]">
                      {career.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${growthBadge(career.growthOutlook)}`}
                    >
                      {career.growthOutlook}
                    </span>
                  </div>

                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent)] self-start mb-3">
                    {career.category}
                  </span>

                  <p className="text-sm text-[var(--text)] mb-3 line-clamp-2">
                    {career.description}
                  </p>

                  <div className="mt-auto space-y-1.5 text-xs text-[var(--text)]">
                    <div className="flex justify-between">
                      <span>Salary</span>
                      <span className="font-medium text-[var(--text-h)]">
                        {career.averageSalary}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Education</span>
                      <span className="font-medium text-[var(--text-h)] truncate ml-2">
                        {career.educationRequired}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Work</span>
                      <span className="font-medium text-[var(--text-h)]">
                        {career.workEnvironment}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {career.requiredSkills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text)]"
                      >
                        {skill}
                      </span>
                    ))}
                    {career.requiredSkills.length > 4 && (
                      <span className="text-xs px-2 py-0.5 text-[var(--text)]">
                        +{career.requiredSkills.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-[var(--border)] rounded-lg text-sm text-[var(--text-h)] disabled:opacity-40 hover:bg-[var(--accent-bg)] transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-[var(--text)]">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 border border-[var(--border)] rounded-lg text-sm text-[var(--text-h)] disabled:opacity-40 hover:bg-[var(--accent-bg)] transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}