
import { useEffect, useState } from 'react';
import { useTagStore } from '@/store/tagStore';
import { useDefinitionsStore } from '@/store/definitionsStore';
import prioritizationService from '@/services/prioritizationService';

export function usePrioritizationData() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    tags, 
    setTags, 
    setLoading: setTagsLoading, 
    setError: setTagsError 
  } = useTagStore();
  
  const { 
    priorities, 
    statuses, 
    setPriorities, 
    setStatuses,
    setLoading: setDefinitionsLoading,
    setError: setDefinitionsError
  } = useDefinitionsStore();

  // Function to load all prioritization data
  const loadAllData = async () => {
    setIsLoading(true);
    setError(null);
    setTagsLoading(true);
    setDefinitionsLoading(true);
    
    try {
      // Load tags and definitions in parallel
      const [tagsResult, definitionsResult] = await Promise.all([
        prioritizationService.getTags(),
        prioritizationService.getDefinitions()
      ]);
      
      setTags(tagsResult.tags);
      setPriorities(definitionsResult.priorities);
      setStatuses(definitionsResult.statuses);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load prioritization data';
      setError(errorMessage);
      setTagsError(errorMessage);
      setDefinitionsError(errorMessage);
    } finally {
      setIsLoading(false);
      setTagsLoading(false);
      setDefinitionsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    tags,
    priorities,
    statuses,
    loadAllData
  };
}
