/**
 * Utility functions for image handling and fallbacks.
 */

export const getFallbackImage = (category: string) => {
  const fallbacks: Record<string, string> = {
    "Residencial": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    "Interiores": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    "Espacio Público": "https://images.unsplash.com/photo-1575517111478-7f6afd0973db?q=80&w=2070&auto=format&fit=crop",
    "Planificación": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    "Cultura": "https://images.unsplash.com/photo-1503387762-592dc58ef45b?q=80&w=2070&auto=format&fit=crop",
    "Salud": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop"
  };
  return fallbacks[category] || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop";
};
