import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MessageCircle, 
  Users, 
  BookOpen, 
  Video, 
  Headphones,
  MapPin,
  Clock,
  Star,
  ExternalLink,
  Search,
  Filter,
  Heart,
  Shield,
  Brain,
  Lightbulb,
  Calendar,
  Download,
  Share2,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Globe,
  Smartphone,
  Stethoscope
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'crisis' | 'therapy' | 'education' | 'community' | 'tools' | 'apps';
  type: 'hotline' | 'directory' | 'article' | 'video' | 'podcast' | 'app' | 'tool' | 'support-group';
  url?: string;
  phone?: string;
  availability?: string;
  rating?: number;
  reviews?: number;
  cost?: 'free' | 'paid' | 'insurance';
  languages?: string[];
  location?: string;
  tags: string[];
  featured?: boolean;
  urgent?: boolean;
}

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Resources', icon: <Globe size={16} />, color: 'bg-gray-500' },
    { id: 'crisis', label: 'Crisis Support', icon: <Phone size={16} />, color: 'bg-red-500' },
    { id: 'therapy', label: 'Professional Help', icon: <Stethoscope size={16} />, color: 'bg-blue-500' },
    { id: 'education', label: 'Learn & Understand', icon: <BookOpen size={16} />, color: 'bg-green-500' },
    { id: 'community', label: 'Community Support', icon: <Users size={16} />, color: 'bg-purple-500' },
    { id: 'tools', label: 'Self-Help Tools', icon: <Brain size={16} />, color: 'bg-orange-500' },
    { id: 'apps', label: 'Apps & Digital', icon: <Smartphone size={16} />, color: 'bg-pink-500' }
  ];

  const filterOptions = [
    'Free', 'Insurance Covered', 'Available 24/7', 'Multilingual', 
    'Teen Support', 'LGBTQ+ Friendly', 'Trauma-Informed', 'Evidence-Based'
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilters = selectedFilters.length === 0 || 
                          selectedFilters.some(filter => resource.tags.includes(filter));
    return matchesCategory && matchesSearch && matchesFilters;
  });

  const urgentResources = resources.filter(r => r.urgent);
  const featuredResources = resources.filter(r => r.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Crisis Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 mb-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6" />
            <div>
              <h3 className="font-semibold">In Crisis? Get Immediate Help</h3>
              <p className="text-sm opacity-90">24/7 support is available. You're not alone.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="tel:988" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
              Call 988
            </a>
            <a href="sms:741741" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
              Text HOME to 741741
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Mental Health Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive support for your mental health journey. From crisis intervention to professional therapy, 
            educational content to community support - find the help you need, when you need it.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search resources, topics, or support types..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} />
              Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
            </button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-4"
              >
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map(filter => (
                    <button
                      key={filter}
                      onClick={() => {
                        setSelectedFilters(prev => 
                          prev.includes(filter) 
                            ? prev.filter(f => f !== filter)
                            : [...prev, filter]
                        );
                      }}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedFilters.includes(filter)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all ${
                activeCategory === category.id
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.icon}
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>

        {/* Urgent Resources Alert */}
        {activeCategory === 'all' && urgentResources.length > 0 && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-semibold text-red-800">Immediate Support Available</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {urgentResources.slice(0, 4).map(resource => (
                <UrgentResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {/* Featured Resources */}
        {activeCategory === 'all' && featuredResources.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Featured Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.slice(0, 6).map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {/* Main Resources Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {activeCategory === 'all' ? 'All Resources' : categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <span className="text-gray-600">{filteredResources.length} resources found</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>

        {/* Additional Support Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold text-blue-800">Talk to Our AI Companion</h3>
            </div>
            <p className="text-blue-700 mb-4">
              Get immediate support from our empathetic AI companion. Available 24/7 for conversations, 
              crisis support, and personalized guidance.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Start Conversation
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-8 w-8 text-purple-600" />
              <h3 className="text-xl font-semibold text-purple-800">Find Professional Help</h3>
            </div>
            <p className="text-purple-700 mb-4">
              Connect with licensed therapists, counselors, and mental health professionals in your area. 
              Filter by insurance, specialty, and availability.
            </p>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
              Find Therapists
            </button>
          </div>
        </div>

        {/* Resource Submission */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="text-center">
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-green-800 mb-2">Help Others Find Support</h3>
            <p className="text-green-700 mb-6 max-w-2xl mx-auto">
              Know a great mental health resource? Share it with our community to help others on their journey to wellness.
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Submit Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component definitions for ResourceCard and UrgentResourceCard
const ResourceCard = ({ resource }: { resource: Resource }) => (
  <motion.div
    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="p-6">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getResourceIcon(resource.type)}
          <span className="text-sm font-medium text-gray-600 capitalize">{resource.type}</span>
        </div>
        {resource.featured && (
          <Star className="h-5 w-5 text-yellow-500 fill-current" />
        )}
      </div>

      <h3 className="font-semibold text-lg mb-2 text-gray-800">{resource.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {resource.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {resource.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>{resource.rating}</span>
            </div>
          )}
          {resource.cost && (
            <span className={`px-2 py-1 rounded-full text-xs ${
              resource.cost === 'free' ? 'bg-green-100 text-green-700' :
              resource.cost === 'insurance' ? 'bg-blue-100 text-blue-700' :
              'bg-orange-100 text-orange-700'
            }`}>
              {resource.cost === 'free' ? 'Free' : 
               resource.cost === 'insurance' ? 'Insurance' : 'Paid'}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {resource.phone && (
            <a href={`tel:${resource.phone}`} className="text-blue-600 hover:text-blue-700">
              <Phone size={18} />
            </a>
          )}
          {resource.url && (
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const UrgentResourceCard = ({ resource }: { resource: Resource }) => (
  <div className="bg-white rounded-lg p-4 border border-red-200">
    <div className="flex items-center gap-3">
      <Phone className="h-6 w-6 text-red-500" />
      <div className="flex-1">
        <h4 className="font-semibold text-red-800">{resource.title}</h4>
        <p className="text-sm text-red-600">{resource.availability}</p>
      </div>
      {resource.phone && (
        <a 
          href={`tel:${resource.phone}`}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Call Now
        </a>
      )}
    </div>
  </div>
);

const getResourceIcon = (type: string) => {
  const iconMap = {
    hotline: <Phone size={16} className="text-red-500" />,
    directory: <MapPin size={16} className="text-blue-500" />,
    article: <BookOpen size={16} className="text-green-500" />,
    video: <Video size={16} className="text-purple-500" />,
    podcast: <Headphones size={16} className="text-orange-500" />,
    app: <Smartphone size={16} className="text-pink-500" />,
    tool: <Brain size={16} className="text-indigo-500" />,
    'support-group': <Users size={16} className="text-teal-500" />
  };
  return iconMap[type as keyof typeof iconMap] || <Lightbulb size={16} className="text-gray-500" />;
};

// Sample resource data aligned with huggy's comprehensive approach
const resources: Resource[] = [
  // Crisis Support Resources
  {
    id: 'crisis-1',
    title: 'National Suicide Prevention Lifeline',
    description: '24/7 free and confidential support for people in distress, prevention and crisis resources.',
    category: 'crisis',
    type: 'hotline',
    phone: '988',
    availability: '24/7',
    cost: 'free',
    languages: ['English', 'Spanish'],
    tags: ['Free', 'Available 24/7', 'Multilingual', 'Crisis Support'],
    urgent: true,
    featured: true
  },
  {
    id: 'crisis-2',
    title: 'Crisis Text Line',
    description: 'Free, 24/7 support for those in crisis. Text HOME to 741741 from anywhere in the US.',
    category: 'crisis',
    type: 'hotline',
    phone: '741741',
    availability: '24/7',
    cost: 'free',
    tags: ['Free', 'Available 24/7', 'Text Support', 'Teen Support'],
    urgent: true
  },
  {
    id: 'crisis-3',
    title: 'LGBTQ National Hotline',
    description: 'Confidential support for LGBTQ+ individuals and their families.',
    category: 'crisis',
    type: 'hotline',
    phone: '1-888-843-4564',
    availability: 'Daily 4pm-12am ET',
    cost: 'free',
    tags: ['Free', 'LGBTQ+ Friendly', 'Crisis Support'],
    urgent: true
  },

  // Professional Help Resources
  {
    id: 'therapy-1',
    title: 'Psychology Today Therapist Directory',
    description: 'Find licensed therapists, psychiatrists, and mental health professionals in your area.',
    category: 'therapy',
    type: 'directory',
    url: 'https://www.psychologytoday.com',
    cost: 'insurance',
    tags: ['Insurance Covered', 'Professional Help', 'Therapy'],
    featured: true
  },
  {
    id: 'therapy-2',
    title: 'BetterHelp Online Therapy',
    description: 'Professional counseling with licensed therapists via video, phone, and messaging.',
    category: 'therapy',
    type: 'app',
    url: 'https://www.betterhelp.com',
    rating: 4.5,
    reviews: 15000,
    cost: 'paid',
    tags: ['Online Therapy', 'Professional Help', 'Evidence-Based']
  },
  {
    id: 'therapy-3',
    title: 'Open Path Collective',
    description: 'Affordable therapy sessions ($30-$60) with licensed mental health professionals.',
    category: 'therapy',
    type: 'directory',
    url: 'https://openpathcollective.org',
    cost: 'paid',
    tags: ['Affordable', 'Professional Help', 'Sliding Scale']
  },

  // Educational Resources
  {
    id: 'education-1',
    title: 'Understanding Depression: Complete Guide',
    description: 'Comprehensive resource covering symptoms, causes, treatments, and coping strategies for depression.',
    category: 'education',
    type: 'article',
    url: 'https://example.com/depression-guide',
    rating: 4.8,
    tags: ['Evidence-Based', 'Depression', 'Educational'],
    featured: true
  },
  {
    id: 'education-2',
    title: 'Anxiety and Panic Disorders Explained',
    description: 'Learn about different types of anxiety disorders, their symptoms, and effective treatments.',
    category: 'education',
    type: 'video',
    url: 'https://example.com/anxiety-video',
    rating: 4.7,
    tags: ['Evidence-Based', 'Anxiety', 'Educational']
  },
  {
    id: 'education-3',
    title: 'Mental Health First Aid Training',
    description: 'Learn how to identify, understand and respond to signs of mental illnesses and substance use disorders.',
    category: 'education',
    type: 'tool',
    url: 'https://www.mentalhealthfirstaid.org',
    cost: 'paid',
    tags: ['Training', 'Evidence-Based', 'First Aid']
  },

  // Community Support Resources
  {
    id: 'community-1',
    title: 'NAMI Support Groups',
    description: 'Free support groups for individuals with mental health conditions and their families.',
    category: 'community',
    type: 'support-group',
    url: 'https://www.nami.org/Support-Education/Support-Groups',
    cost: 'free',
    tags: ['Free', 'Support Groups', 'Community'],
    featured: true
  },
  {
    id: 'community-2',
    title: 'Depression and Bipolar Support Alliance',
    description: 'Peer-led support groups and online communities for mood disorders.',
    category: 'community',
    type: 'support-group',
    url: 'https://www.dbsalliance.org',
    cost: 'free',
    tags: ['Free', 'Peer Support', 'Depression', 'Bipolar']
  },

  // Self-Help Tools
  {
    id: 'tools-1',
    title: 'MindShift CBT Anxiety App',
    description: 'Evidence-based cognitive behavioral therapy tools for managing anxiety and worry.',
    category: 'tools',
    type: 'app',
    url: 'https://example.com/mindshift',
    rating: 4.6,
    cost: 'free',
    tags: ['Free', 'CBT', 'Anxiety', 'Evidence-Based']
  },
  {
    id: 'tools-2',
    title: 'Mood Tracking Journal',
    description: 'Digital tool for tracking mood patterns, triggers, and progress over time.',
    category: 'tools',
    type: 'tool',
    url: 'https://example.com/mood-tracker',
    cost: 'free',
    tags: ['Free', 'Mood Tracking', 'Self-Help']
  },

  // Digital Apps
  {
    id: 'apps-1',
    title: 'Headspace: Meditation & Sleep',
    description: 'Guided meditation, sleep stories, and mindfulness exercises for mental wellness.',
    category: 'apps',
    type: 'app',
    url: 'https://www.headspace.com',
    rating: 4.4,
    cost: 'paid',
    tags: ['Meditation', 'Sleep', 'Mindfulness'],
    featured: true
  },
  {
    id: 'apps-2',
    title: 'Calm: Sleep & Meditation',
    description: 'Sleep stories, meditation programs, and relaxation tools for better mental health.',
    category: 'apps',
    type: 'app',
    url: 'https://www.calm.com',
    rating: 4.5,
    cost: 'paid',
    tags: ['Meditation', 'Sleep', 'Relaxation']
  }
];

export default ResourcesPage;