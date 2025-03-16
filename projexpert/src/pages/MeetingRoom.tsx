import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { axiosInstance } from '../axiosIntance';

const MeetingRoom = () => {
  const { id } = useParams<{ id: string }>(); // Get meeting ID from URL
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);
  const [meetingData, setMeetingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const res = await axiosInstance.get(`/admin/timeline/meetings/${id}`);
        if (res.status === 200) {
          setMeetingData(res.data);
        } else {
          setError('Failed to fetch meeting data');
        }
      } catch (err: any) {
        setError('Error fetching meeting: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingData();
  }, [id]);

  useEffect(() => {
    if (!meetingData) return;

    const loadJitsiScript = () => {
      if (!window.JitsiMeetExternalAPI) {
        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js'; // Use your Jitsi domain if custom
        script.async = true;
        script.onload = initializeJitsi;
        document.body.appendChild(script);
      } else {
        initializeJitsi();
      }
    };

    const initializeJitsi = () => {
      if (containerRef.current && !apiRef.current) {
        apiRef.current = new window.JitsiMeetExternalAPI('meet.jit.si', {
          roomName: meetingData.jitsiMeetingId,
          parentNode: containerRef.current,
          width: '100%',
          height: '100%',
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: false,
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
              'tileview'
            ],
          },
        });

        apiRef.current.addEventListener('videoConferenceJoined', () => {
          console.log('Joined the meeting');
        });
      }
    };

    loadJitsiScript();

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
        apiRef.current = null;
      }
    };
  }, [meetingData]);

  const handleLeaveMeeting = () => {
    navigate('/'); // Navigate back to the calendar or home page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 mb-32">
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <h1 className="text-lg font-semibold text-gray-900">
          Meeting: {meetingData?.title || 'Loading...'}
        </h1>
        <button
          onClick={handleLeaveMeeting}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
        >
          <X className="w-4 h-4 mr-2" />
          Leave Meeting
        </button>
      </div>
      <div
        ref={containerRef}
        className="flex-1 w-full"
      />
    </div>
  );
};

export default MeetingRoom;


