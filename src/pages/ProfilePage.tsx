import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Key, 
  Download, 
  Trash2,
  ChevronRight,
  Edit2,
  Loader2,
  Save
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className="py-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Profile Settings</h1>
        <p className="text-neutral-700">
          Manage your account settings and preferences
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4">
            <nav className="space-y-1">
              <NavItem 
                icon={<User size={18} />}
                label="Profile"
                isActive={activeTab === 'profile'}
                onClick={() => setActiveTab('profile')}
              />
              <NavItem 
                icon={<Settings size={18} />}
                label="Preferences"
                isActive={activeTab === 'preferences'}
                onClick={() => setActiveTab('preferences')}
              />
              <NavItem 
                icon={<Bell size={18} />}
                label="Notifications"
                isActive={activeTab === 'notifications'}
                onClick={() => setActiveTab('notifications')}
              />
              <NavItem 
                icon={<Shield size={18} />}
                label="Privacy"
                isActive={activeTab === 'privacy'}
                onClick={() => setActiveTab('privacy')}
              />
              <NavItem 
                icon={<Key size={18} />}
                label="Security"
                isActive={activeTab === 'security'}
                onClick={() => setActiveTab('security')}
              />
            </nav>
            
            <div className="border-t border-neutral-200 mt-4 pt-4 space-y-1">
              <NavItem 
                icon={<Download size={18} />}
                label="Export Data"
                isActive={activeTab === 'export'}
                onClick={() => setActiveTab('export')}
              />
              <NavItem 
                icon={<Trash2 size={18} className="text-error-500" />}
                label="Delete Account"
                isActive={activeTab === 'delete'}
                onClick={() => setActiveTab('delete')}
                danger
              />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'preferences' && <PreferencesSection />}
          {activeTab === 'notifications' && <NotificationsSection />}
          {activeTab === 'privacy' && <PrivacySection />}
          {activeTab === 'security' && <SecuritySection />}
          {activeTab === 'export' && <ExportSection />}
          {activeTab === 'delete' && <DeleteSection />}
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  danger?: boolean;
}

const NavItem = ({ icon, label, isActive, onClick, danger }: NavItemProps) => (
  <button 
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      isActive 
        ? 'bg-primary-50 text-primary-700' 
        : danger
          ? 'text-error-600 hover:bg-error-50'
          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const ProfileSection = () => {
  const { user } = useAuth();
  const { profile, loading, error, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    timezone: 'America/Los_Angeles'
  });

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        timezone: profile.timezone || 'America/Los_Angeles'
      });
    }
  }, [profile]);

  const handleSave = async () => {
    if (!profile) return;
    
    setIsSaving(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        timezone: profile.timezone || 'America/Los_Angeles'
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500 mx-auto mb-4" />
          <p className="text-neutral-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="bg-error-50 border border-error-200 rounded-lg p-6 max-w-md">
            <h3 className="text-error-800 font-medium mb-2">Unable to load profile</h3>
            <p className="text-error-600 text-sm mb-4">{error}</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || 'No email';
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-semibold text-primary-700">
              {userInitial}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{displayName}</h2>
              <p className="text-neutral-600">{userEmail}</p>
            </div>
          </div>
          <button 
            className="btn btn-ghost"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 size={18} />
            <span className="ml-2">{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Full Name
            </label>
            <input 
              type="text" 
              className="input"
              placeholder="Your full name"
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Email
            </label>
            <input 
              type="email" 
              className="input bg-neutral-50"
              value={userEmail}
              disabled
            />
            <p className="text-xs text-neutral-500 mt-1">Email cannot be changed</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Phone Number
            </label>
            <input 
              type="tel" 
              className="input"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Time Zone
            </label>
            <select 
              className="input"
              value={formData.timezone}
              onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
              disabled={!isEditing}
            >
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
            </select>
          </div>
        </div>
        
        {isEditing && (
          <div className="mt-6 pt-6 border-t border-neutral-200 flex gap-3">
            <button 
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
            <button 
              className="btn btn-ghost"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
        <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
        
        <div className="space-y-4">
          <div className="text-center py-8 text-neutral-500">
            <p>No emergency contacts added yet</p>
            <p className="text-sm mt-1">Add trusted contacts who can be reached in case of emergency</p>
          </div>
          
          <button className="btn btn-ghost w-full justify-center">
            + Add Emergency Contact
          </button>
        </div>
      </div>
    </div>
  );
};

interface EmergencyContactProps {
  name: string;
  relation: string;
  phone: string;
}

const EmergencyContact = ({ name, relation, phone }: EmergencyContactProps) => (
  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
    <div>
      <h4 className="font-medium">{name}</h4>
      <p className="text-sm text-neutral-600">{relation} • {phone}</p>
    </div>
    <button className="text-neutral-600 hover:text-neutral-900">
      <Edit2 size={18} />
    </button>
  </div>
);

const PreferencesSection = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
      <h2 className="text-lg font-semibold mb-4">App Preferences</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Dark Mode</h3>
            <p className="text-sm text-neutral-600">Enable dark mode for the app</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Voice Feedback</h3>
            <p className="text-sm text-neutral-600">Enable voice responses from AI</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Daily Reminders</h3>
            <p className="text-sm text-neutral-600">Get daily check-in reminders</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
      <h2 className="text-lg font-semibold mb-4">Language & Accessibility</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Language
          </label>
          <select className="input">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Text Size
          </label>
          <select className="input">
            <option>Normal</option>
            <option>Large</option>
            <option>Extra Large</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Screen Reader Support</h3>
            <p className="text-sm text-neutral-600">Enhanced accessibility features</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

const NotificationsSection = () => {
  const [notifications, setNotifications] = useState({
    checkinReminders: true,
    challengeUpdates: true,
    meditationReminders: true,
    communityActivity: false,
    resourceRecommendations: true,
    weekendDifferentSchedule: false,
  });
  const [quietHours, setQuietHours] = useState({
    start: '22:00',
    end: '08:00',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would save to your backend/localStorage
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log('Notifications saved:', { notifications, quietHours });
    } catch (error) {
      console.error('Failed to save notifications:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
        
        <div className="space-y-4">
          <NotificationSetting 
            title="Check-in Reminders"
            description="Daily reminders to track your mood"
            checked={notifications.checkinReminders}
            onChange={(value) => handleNotificationChange('checkinReminders', value)}
          />
          
          <NotificationSetting 
            title="Challenge Updates"
            description="Updates about your active challenges"
            checked={notifications.challengeUpdates}
            onChange={(value) => handleNotificationChange('challengeUpdates', value)}
          />
          
          <NotificationSetting 
            title="Meditation Reminders"
            description="Reminders for scheduled meditation sessions"
            checked={notifications.meditationReminders}
            onChange={(value) => handleNotificationChange('meditationReminders', value)}
          />
          
          <NotificationSetting 
            title="Community Activity"
            description="Updates from your support community"
            checked={notifications.communityActivity}
            onChange={(value) => handleNotificationChange('communityActivity', value)}
          />
          
          <NotificationSetting 
            title="Resource Recommendations"
            description="Personalized mental health resources"
            checked={notifications.resourceRecommendations}
            onChange={(value) => handleNotificationChange('resourceRecommendations', value)}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Notification Schedule</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Quiet Hours Start
            </label>
            <input 
              type="time" 
              className="input" 
              value={quietHours.start}
              onChange={(e) => setQuietHours(prev => ({ ...prev, start: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Quiet Hours End
            </label>
            <input 
              type="time" 
              className="input" 
              value={quietHours.end}
              onChange={(e) => setQuietHours(prev => ({ ...prev, end: e.target.value }))}
            />
          </div>
          
          <NotificationSetting 
            title="Weekend Different Schedule"
            description="Use different quiet hours on weekends"
            checked={notifications.weekendDifferentSchedule}
            onChange={(value) => handleNotificationChange('weekendDifferentSchedule', value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
        <div className="flex justify-end">
          <button 
            className="btn btn-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface NotificationSettingProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const NotificationSetting = ({ title, description, checked, onChange }: NotificationSettingProps) => (
  <div className="flex items-center justify-between">
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
    </label>
  </div>
);

const PrivacySection = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
      <h2 className="text-lg font-semibold mb-4">Privacy Settings</h2>
      
      <div className="space-y-4">
        <PrivacySetting 
          title="Profile Visibility"
          description="Control who can see your profile"
          options={['Public', 'Friends Only', 'Private']}
          defaultValue="Private"
        />
        
        <PrivacySetting 
          title="Activity Sharing"
          description="Share your wellness activities"
          options={['Everyone', 'Friends', 'No One']}
          defaultValue="Friends"
        />
        
        <PrivacySetting 
          title="Progress Visibility"
          description="Show your progress in challenges"
          options={['Public', 'Friends Only', 'Private']}
          defaultValue="Friends Only"
        />
      </div>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
      <h2 className="text-lg font-semibold mb-4">Data Privacy</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Data Collection</h3>
            <p className="text-sm text-neutral-600">Allow anonymous data collection for improvement</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Conversation History</h3>
            <p className="text-sm text-neutral-600">Store conversation history for personalization</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

interface PrivacySettingProps {
  title: string;
  description: string;
  options: string[];
  defaultValue: string;
}

const PrivacySetting = ({ title, description, options, defaultValue }: PrivacySettingProps) => (
  <div>
    <h3 className="font-medium">{title}</h3>
    <p className="text-sm text-neutral-600 mb-2">{description}</p>
    <select className="input" defaultValue={defaultValue}>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const SecuritySection = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
      <h2 className="text-lg font-semibold mb-4">Password & Authentication</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Current Password
          </label>
          <input type="password" className="input" placeholder="Enter current password" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            New Password
          </label>
          <input type="password" className="input" placeholder="Enter new password" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Confirm New Password
          </label>
          <input type="password" className="input" placeholder="Confirm new password" />
        </div>
        
        <button className="btn btn-primary">Update Password</button>
      </div>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
      <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Enable 2FA</h3>
            <p className="text-sm text-neutral-600">Add an extra layer of security</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
          </label>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
      <h2 className="text-lg font-semibold mb-4">Login History</h2>
      
      <div className="space-y-4">
        <LoginHistoryItem 
          device="Chrome on MacOS"
          location="San Francisco, CA"
          time="Just now"
          current
        />
        
        <LoginHistoryItem 
          device="Safari on iPhone"
          location="San Francisco, CA"
          time="Yesterday at 3:45 PM"
        />
        
        <LoginHistoryItem 
          device="Firefox on Windows"
          location="San Jose, CA"
          time="May 28, 2025 at 10:30 AM"
        />
      </div>
    </div>
  </div>
);

interface LoginHistoryItemProps {
  device: string;
  location: string;
  time: string;
  current?: boolean;
}

const LoginHistoryItem = ({ device, location, time, current }: LoginHistoryItemProps) => (
  <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
    <div>
      <div className="flex items-center gap-2">
        <h4 className="font-medium">{device}</h4>
        {current && (
          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
            Current Session
          </span>
        )}
      </div>
      <p className="text-sm text-neutral-600">{location} • {time}</p>
    </div>
    {!current && (
      <button className="text-error-600 hover:text-error-700 text-sm">
        End Session
      </button>
    )}
  </div>
);

const ExportSection = () => {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const handleExport = async (type: 'complete' | 'progress' | 'conversations') => {
    setIsExporting(type);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Exporting ${type} data...`);
      // Here you would trigger the actual export
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Export Your Data</h2>
        
        <p className="text-neutral-700 mb-6">
          Download a copy of your personal data. This includes your profile information,
          conversation history, progress data, and preferences.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Download size={24} className="text-primary-500" />
              <div>
                <h3 className="font-medium">Complete Data Export</h3>
                <p className="text-sm text-neutral-600">All your data in JSON format</p>
              </div>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => handleExport('complete')}
              disabled={isExporting === 'complete'}
            >
              {isExporting === 'complete' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Exporting...
                </>
              ) : (
                'Export'
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Download size={24} className="text-primary-500" />
              <div>
                <h3 className="font-medium">Progress Report</h3>
                <p className="text-sm text-neutral-600">Your wellness journey data</p>
              </div>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => handleExport('progress')}
              disabled={isExporting === 'progress'}
            >
              {isExporting === 'progress' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Exporting...
                </>
              ) : (
                'Export'
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Download size={24} className="text-primary-500" />
              <div>
                <h3 className="font-medium">Conversation History</h3>
                <p className="text-sm text-neutral-600">Your chat logs and interactions</p>
              </div>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => handleExport('conversations')}
              disabled={isExporting === 'conversations'}
            >
              {isExporting === 'conversations' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Exporting...
                </>
              ) : (
                'Export'
              )}
            </button>
          </div>
        </div>
        
        <p className="text-sm text-neutral-600 mt-6">
          Exports are provided in JSON format and may take a few minutes to generate.
          You'll receive an email when your export is ready to download.
        </p>
      </div>
    </div>
  );
};

const DeleteSection = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
      <div className="flex items-center gap-3 text-error-600 mb-6">
        <Trash2 size={24} />
        <h2 className="text-lg font-semibold">Delete Account</h2>
      </div>
      
      <div className="bg-error-50 border border-error-100 rounded-lg p-4 mb-6">
        <p className="text-error-800">
          Warning: This action cannot be undone. All your data will be permanently deleted.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Please type "DELETE" to confirm
          </label>
          <input type="text" className="input" placeholder="Type DELETE" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Password
          </label>
          <input type="password" className="input" placeholder="Enter your password" />
        </div>
        
        <div className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-neutral-300" id="confirm" />
          <label htmlFor="confirm" className="text-sm text-neutral-700">
            I understand that this action is permanent and cannot be undone
          </label>
        </div>
        
        <button className="btn bg-error-500 text-white hover:bg-error-600">
          Delete Account
        </button>
      </div>
    </div>
  </div>
);

export default ProfilePage;