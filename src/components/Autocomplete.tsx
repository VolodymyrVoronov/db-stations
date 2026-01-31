import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Simulated API call
const fetchSuggestions = async (
  query: string,
  initialValues: string[] = [],
): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

  return initialValues.filter((suggestion) =>
    suggestion.toLowerCase().includes(query.toLowerCase()),
  );
};

export interface IAutoCompleteProps {
  value?: string;
  initialValues?: string[];

  onChange?: (value: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
}

export default function Autocomplete({
  value = "",
  initialValues = [],

  onChange,
  onSuggestionClick,
}: IAutoCompleteProps) {
  const [query, setQuery] = useState(value);
  const [debouncedQuery] = useDebounce(query, 300);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fetchSuggestionsCallback = useCallback(
    async (q: string) => {
      if (q.trim() === "") {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      const results = await fetchSuggestions(q, initialValues);
      setSuggestions(results);
      setIsLoading(false);
    },
    [initialValues],
  );

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery && isFocused) {
        await fetchSuggestionsCallback(debouncedQuery);
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, fetchSuggestionsCallback, isFocused]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange?.(newValue);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setQuery(suggestions[selectedIndex]);
      setSuggestions([]);
      setSelectedIndex(-1);
      onSuggestionClick?.(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onChange?.(suggestion);
    onSuggestionClick?.(suggestion);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for click events on suggestions
    setTimeout(() => {
      setIsFocused(false);
      setSuggestions([]);
      setSelectedIndex(-1);
    }, 200);
  };

  return (
    <div className="mx-auto w-full max-w-xs rounded-md bg-white">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search station..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="h-12 pr-8"
          aria-label="Search input"
          aria-autocomplete="list"
          aria-controls="suggestions-list"
          aria-expanded={suggestions.length > 0}
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-0 right-0 h-full"
          aria-label="Search"
          disabled
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {isLoading && isFocused && (
        <div
          className="bg-background absolute z-10 mt-2 rounded-md border p-2"
          aria-live="polite"
        >
          Loading...
        </div>
      )}

      {suggestions.length > 0 && !isLoading && isFocused && (
        <ul
          id="suggestions-list"
          className="bg-background absolute z-10 mt-2 rounded-md border"
          role="listbox"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={`hover:bg-muted cursor-pointer px-4 py-2 ${
                index === selectedIndex ? "bg-muted" : ""
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
