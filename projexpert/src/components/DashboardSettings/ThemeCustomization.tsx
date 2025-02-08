import { useTheme } from '../../contexts/ThemeContext';

const ThemeCustomization = () => {
  const { theme, updateTheme } = useTheme();

  const handleThemeChange = (key: string, value: any) => {
    updateTheme({
      ...theme,
      [key]: value
    });
  };

  return (
    <div>
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800">Visual Customization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => handleThemeChange('primaryColor', e.target.value)}
              className="w-20 h-10 rounded cursor-pointer"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
            <input
              type="color"
              value={theme.secondaryColor}
              onChange={(e) => handleThemeChange('secondaryColor', e.target.value)}
              className="w-20 h-10 rounded cursor-pointer"
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">Gradient Intensity</label>
            <input
              type="range"
              min="0"
              max="100"
              value={theme.gradientIntensity}
              onChange={(e) => handleThemeChange('gradientIntensity', parseInt(e.target.value))}
              className="w-full range range-primary"
            />
          </div>
          <div className="form-group">
            <div className="p-4 rounded-lg border"
              style={{ 
                background: `linear-gradient(${theme.gradientIntensity}deg, ${theme.primaryColor}, ${theme.secondaryColor})`
              }}
            >
              <p className="text-white text-center">Theme Preview</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomization;