import { useState } from 'react';


const Notifications = () => {

    const [notifications, setNotifications] = useState({
        email: true,
        slack: false,
        sms: false,
    });


    return (
        <div>
            <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Notification Preferences</h3>
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800 capitalize">{key}</h4>
                          <p className="text-sm text-gray-600">Receive notifications via {key}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => setNotifications({ ...notifications, [key]: !value })}
                          className="toggle toggle-success"
                        />
                      </div>
                    ))}
                  </div>
                </div>
        </div>
    )
}

export default Notifications;
