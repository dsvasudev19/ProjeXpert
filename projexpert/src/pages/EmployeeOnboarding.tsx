import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, MapPin, Mail, User, Briefcase, Trophy, Code, Building } from 'lucide-react';

const steps = [
  { title: 'Personal', icon: User },
  { title: 'Contact', icon: Mail },
  { title: 'Address', icon: MapPin },
  { title: 'Skills', icon: Code },
  { title: 'Achievements', icon: Trophy },
  { title: 'Projects', icon: Briefcase },
  { title: 'Experience', icon: Building },
];

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(() => {
    const savedData = sessionStorage.getItem('onboardingData');
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    sessionStorage.setItem('onboardingData', JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    console.log('Final Submission:', formData);
    sessionStorage.removeItem('onboardingData');
    alert('Onboarding submitted successfully!');
  };

  const handleChange = (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex flex-col items-center relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200'
                  } transition-colors duration-300`}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={`text-sm mt-2 ${index <= currentStep ? 'text-green-600' : 'text-gray-400'}`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-5 -right-20 w-20 h-1 ${
                      index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <div className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                <User className="w-6 h-6" /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <select
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                <Mail className="w-6 h-6" /> Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  name="linkedin"
                  placeholder="LinkedIn Profile"
                  value={formData.linkedin || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  name="website"
                  placeholder="Personal Website (Optional)"
                  value={formData.website || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                <MapPin className="w-6 h-6" /> Address Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State/Province"
                  value={formData.state || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip/Postal Code"
                  value={formData.zipCode || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <select
                  name="country"
                  value={formData.country || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="India">India</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                <Code className="w-6 h-6" /> Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="skills"
                  placeholder="Skills (e.g., JavaScript, React)"
                  value={formData.skills || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  name="languages"
                  placeholder="Languages (e.g., English, Spanish)"
                  value={formData.languages || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                <Trophy className="w-6 h-6" /> Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  name="achievements"
                  placeholder="List any achievements (e.g., awards, certifications)"
                  value={formData.achievements || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                <Briefcase className="w-6 h-6" /> Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  name="projects"
                  placeholder="Describe any notable projects you've worked on"
                  value={formData.projects || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
                <Building className="w-6 h-6" /> Experience
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <textarea
                  name="experience"
                  placeholder="Describe your work experience"
                  value={formData.experience || ''}
                  onChange={handleChange}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" /> Previous
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="ml-auto flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit <Check className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
