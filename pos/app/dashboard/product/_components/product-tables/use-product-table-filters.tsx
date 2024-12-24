'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export const CATEGORY_OPTIONS = [
  { value: 'North Indian', label: 'North Indian' },
  { value: 'South Indian', label: 'South Indian' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'Street Food', label: 'Street Food' },
  { value: 'Indian Sweets', label: 'Indian Sweets' },
  { value: 'Tandoori', label: 'Tandoori' },
  { value: 'Biryani', label: 'Biryani' },
  { value: 'Indian Snacks', label: 'Indian Snacks' },
  { value: 'Desserts', label: 'Desserts' },
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Non-Vegetarian', label: 'Non-Vegetarian' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Thali', label: 'Thali' },
  { value: 'Mughlai', label: 'Mughlai' },
  { value: 'Rajasthani', label: 'Rajasthani' },
  { value: 'Gujarati', label: 'Gujarati' },
  { value: 'Goan', label: 'Goan' },
  { value: 'Kebabs', label: 'Kebabs' },
  { value: 'Chaats', label: 'Chaats' },
  { value: 'Idli Dosa', label: 'Idli Dosa' },
  { value: 'Paneer', label: 'Paneer' },
  { value: 'Rice Dishes', label: 'Rice Dishes' },
  { value: 'Parathas', label: 'Parathas' },
  { value: 'Curry', label: 'Curry' },
  { value: 'Pulao', label: 'Pulao' },
  { value: 'Sweets', label: 'Sweets' },
  { value: 'Salads', label: 'Salads' },
  { value: 'Soups', label: 'Soups' },
  { value: 'Momos', label: 'Momos' },
  { value: 'Lassi', label: 'Lassi' },
  { value: 'Tea and Coffee', label: 'Tea and Coffee' },
  { value: 'Fusion', label: 'Fusion' }
];

export function useProductTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [categoriesFilter, setCategoriesFilter] = useQueryState(
    'categories',
    searchParams.categories.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setCategoriesFilter(null);

    setPage(1);
  }, [setSearchQuery, setCategoriesFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!categoriesFilter;
  }, [searchQuery, categoriesFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    categoriesFilter,
    setCategoriesFilter
  };
}
