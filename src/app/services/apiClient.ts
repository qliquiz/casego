export const apiClient = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} - ${errorText}`);
      throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Network error:', error);
    throw new Error('Ошибка сети. Попробуйте позже.');
  }
};
