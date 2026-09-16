// Helper functions for formatting dates, text, and badges

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const capitalizeText = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getStatusBadgeStyle = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'pending':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'graduate':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};
