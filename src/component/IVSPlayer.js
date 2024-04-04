import React, { useEffect, useRef } from "react";

const IVSPlayerComponent = () => {
  // Create a reference to the video player element
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    // Access the IVSPlayer package from the global window object
    const IVSPlayerPackage = window.IVSPlayer;

    // First, check if the browser supports the IVS player.
    if (!IVSPlayerPackage.isPlayerSupported) {
      console.warn("The current browser does not support the IVS player.");
      return;
    }
    // Define constants for IVS player states and event types
    const PlayerState = IVSPlayerPackage.PlayerState;
    const PlayerEventType = IVSPlayerPackage.PlayerEventType;

    // Initialize player
    const player = IVSPlayerPackage.create();
    console.log("IVS Player version:", player.getVersion());
    player.attachHTMLVideoElement(videoPlayerRef.current);

    // Attach event listeners
    player.addEventListener(PlayerState.PLAYING, () => {
      console.log("Player State - PLAYING");
      console.log("Latency: " + player.getLiveLatency());
    });

    player.addEventListener(PlayerState.ENDED, () => {
      console.log("Player State - ENDED");
    });

    player.addEventListener(PlayerState.READY, () => {
      console.log("Player State - READY");
    });

    player.addEventListener(PlayerEventType.ERROR, (err) => {
      console.warn("Player Event - ERROR:", err);
    });

    player.addEventListener(PlayerEventType.TEXT_METADATA_CUE, (cue) => {
      const metadataText = cue.text;
      const position = player.getPosition().toFixed(2);
      console.log(
        `PlayerEvent - TEXT_METADATA_CUE: "${metadataText}". Observed ${position}s after playback started.`
      );
    });

    player.addEventListener(PlayerState.BUFFERING, () => {
      console.log("Player State - BUFFERING");
    });

    player.addEventListener(PlayerEventType.REBUFFERING, () => {
      console.log("Player State - REBUFFERING");
    });

    // Setup stream and play
    player.setAutoplay(true);
    player.load(
      // "https://4c9c5ad51406.us-east-1.playback.live-video.net/api/video/v1/us-east-1.688601466634.channel.aJ49M1CkU2YR.m3u8"
      "https://8c781dc5e91e.us-east-1.playback.live-video.net/api/video/v1/us-east-1.905418223467.channel.7FuWjmSBM0Kn.m3u8"
    );
    player.setVolume(0.5);

    // Clean up resources when the component unmounts
    return () => {};
  }, []);

  return <video ref={videoPlayerRef} width="560" height="315" controls />;
};

export default IVSPlayerComponent;
