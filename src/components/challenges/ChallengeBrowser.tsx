import { useState } from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChallengeTemplate } from '../../hooks/useChallenges';
import { ChallengeCard } from '.';

interface ChallengeBrowserProps {
  categories: string[];
  templates: ChallengeTemplate[];
  onSelectTemplate: (template: ChallengeTemplate) => void;
}

const ChallengeBrowser = ({ categories, templates, onSelectTemplate }: ChallengeBrowserProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular'); // popular, duration, difficulty

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'duration':
        return a.duration - b.duration;
      case 'popular':
      default:
        return 0; // Keep original order for popular
    }
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mindfulness': return '🧘';
      case 'gratitude': return '🙏';
      case 'exercise': return '💪';
      case 'sleep': return '😴';
      case 'social': return '🤝';
      default: return '🌟';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search challenges..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          >
            <option value="popular">Most Popular</option>
            <option value="duration">Duration</option>
          </select>
          <SortAsc className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <CategoryPill
          label="All"
          icon="🌟"
          isActive={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
          count={templates.length}
        />
        {categories.map((category) => {
          const categoryTemplates = templates.filter(t => t.category === category);
          return (
            <CategoryPill
              key={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              icon={getCategoryIcon(category)}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              count={categoryTemplates.length}
            />
          );
        })}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {sortedTemplates.length} challenge{sortedTemplates.length !== 1 ? 's' : ''} found
        </p>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Challenge Grid */}
      <AnimatePresence mode="wait">
        {sortedTemplates.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No challenges found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ChallengeCard
                  challenge={{
                    id: template.id,
                    title: template.title,
                    description: template.description,
                    duration: `${template.duration} days`,
                    difficulty: 'easy', // You might want to add difficulty to template
                    category: template.category,
                    totalSteps: template.tasks.length,
                  }}
                  onClick={() => onSelectTemplate(template)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Category Pill Component
const CategoryPill = ({ 
  label, 
  icon, 
  isActive, 
  onClick, 
  count 
}: {
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
  count: number;
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-200 whitespace-nowrap ${
        isActive
          ? 'border-purple-300 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 shadow-lg'
          : 'border-gray-200 bg-white/80 text-gray-600 hover:bg-white hover:border-gray-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
      <span className={`text-xs px-2 py-1 rounded-full ${
        isActive 
          ? 'bg-purple-200 text-purple-700' 
          : 'bg-gray-100 text-gray-500'
      }`}>
        {count}
      </span>
    </motion.button>
  );
};

export default ChallengeBrowser;