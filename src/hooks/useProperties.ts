import { useState, useEffect } from 'react';
import { Property, PropertyFilters } from '../types/property';
import { propertyApi } from '../services/api/propertyApi';
import { PaginatedResponse } from '../types/api';

export const useProperties = (filters?: PropertyFilters, autoFetch: boolean = true) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const fetchProperties = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await propertyApi.getProperties(filters, page, pagination.limit);
      if (page === 1) {
        setProperties(response.data);
      } else {
        setProperties((prev) => [...prev, ...response.data]);
      }
      setPagination(response.pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchProperties(1);
    }
  }, [filters]);

  const loadMore = () => {
    if (!loading && pagination.page < pagination.totalPages) {
      fetchProperties(pagination.page + 1);
    }
  };

  const refresh = () => {
    fetchProperties(1);
  };

  return {
    properties,
    loading,
    error,
    pagination,
    fetchProperties,
    loadMore,
    refresh,
  };
};

