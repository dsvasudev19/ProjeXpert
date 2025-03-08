
import { JitsiMeeting } from '@jitsi/react-sdk';

const JitsiMeetingComponent = () => {
  return (
    <JitsiMeeting
      domain="meet.jit.si"
      roomName="YourMeetingRoomName"
      configOverwrite={{
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        prejoinPageEnabled: false,    // Disables the prejoin (welcome) screen
        disableDeepLinking: true,     // Prevents opening external apps
        disableInviteFunctions: true, // Removes invite options
        requireDisplayName: false,    // Doesn't require users to enter a name
        enableClosePage: false,       // Disables the thank you/close page
        enableWelcomePage: false,     // Disables welcome page
      }}
      interfaceConfigOverwrite={{
        SHOW_JITSI_WATERMARK: false,
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        MOBILE_APP_PROMO: false,      // Disables mobile app promotion
        HIDE_INVITE_MORE_HEADER: true,
        filmStripOnly: false,
        VERTICAL_FILMSTRIP: true,
        DISABLE_FOCUS_INDICATOR: true,
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'desktop', 'fullscreen',
          'hangup', 'settings'
          // Remove other buttons you don't need
        ],
      }}

      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = '700px';
        iframeRef.style.width = '100%';
      }}
    />

  );
};

export default JitsiMeetingComponent;