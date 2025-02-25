import React, { useState, useEffect } from "react";

const TestPage: React.FC = () => {
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  useEffect(() => {
    const checkAccess = setTimeout(() => {
      const iframe = document.getElementById("miro-iframe") as HTMLIFrameElement | null;
      if (iframe && iframe.contentWindow?.length === 0) {
        setIsBlocked(true);
      }
    }, 3000);

    return () => clearTimeout(checkAccess);
  }, []);

  const openMiroLogin = () => {
    window.open("https://miro.com/login/", "_blank", "width=800,height=600");
  };

  return (
    <div style={{ width: "100%", height: "650px", border: "1px solid black" }}>
      {!isBlocked ? (
        <iframe
          id="miro-iframe"
          src="https://miro.com/app/board/uXjVLo5zv4Y=/"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allowFullScreen
        />
      ) : (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>Embedding blocked. Click below to log in:</p>
          <button
            onClick={openMiroLogin}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Login to Miro
          </button>
        </div>
      )}
    </div>
  );
};

export default TestPage;
