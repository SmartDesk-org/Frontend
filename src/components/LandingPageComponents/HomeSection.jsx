// src/components/HomeSection.jsx
import React, { useState } from 'react';
import demoVideo from '../../assets/demo-video.mp4';

export default function HomeSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-5 px-3 container">
      <div className="text-center mx-auto" style={{ maxWidth: '800px' }}>
        <h2 className="fw-bold mb-4 text-dark fs-1">
          Optimize Your Workspace with Smart Desk & Employee Check-in System
        </h2>

        <p className="fs-5 text-muted mb-4">
          Manage desks, meeting rooms, and employee attendance seamlessly with our digital platform.
        </p>

        <div
          className={`position-relative mx-auto rounded shadow ${isPlaying ? 'w-100' : 'w-50'}`}
          style={{ maxWidth: isPlaying ? '900px' : '450px', cursor: isPlaying ? 'default' : 'pointer' }}
          onClick={!isPlaying ? handlePlayClick : undefined}
        >
          {!isPlaying && (
            <>
              <img
                src="/src/assets/demo-video-thumbnail.jpg"
                alt="Demo video thumbnail"
                className="w-100 rounded"
                style={{ userSelect: 'none' }}
              />
              <button
                type="button"
                aria-label="Play video"
                className="btn btn-primary position-absolute top-50 start-50 translate-middle rounded-circle p-3"
                style={{ fontSize: '2rem', opacity: 0.9 }}
                onClick={handlePlayClick}
              >
                ▶
              </button>
            </>
          )}

          {isPlaying && (
            <video
              className="d-block mx-auto rounded shadow w-100"
              style={{ maxWidth: '900px' }}
              src={demoVideo}
              controls
              autoPlay
            //   muted
            //   loop
              playsInline
            />
          )}
        </div>
      </div>
    </section>
  );
}