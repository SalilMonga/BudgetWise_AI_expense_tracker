import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useProfile() {
  const { data, error, mutate } = useSWR('/api/profile', fetcher);

  const updateProfile = async (updates: { monthlyBudget?: number; darkMode?: boolean }) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      // Optimistically update the local data
      const updatedData = await response.json();
      mutate(updatedData, false); // Update the cache with the new data
      return updatedData;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return {
    profile: data,
    isLoading: !error && !data,
    isError: error,
    updateProfile,
  };
} 