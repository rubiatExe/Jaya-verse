"use client"

import React from 'react';

const AnimatedFooter = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '50px',
      pointerEvents: 'none',
      overflow: 'hidden',
      zIndex: 10
    }}>
      <style jsx>{`
        .scene {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .butterfly {
          position: absolute;
          bottom: 20px;
          width: 20px;
          height: 20px;
          animation: fly 15s linear infinite;
        }

        .dog {
          position: absolute;
          bottom: 0px;
          width: 50px;
          height: 50px;
          animation: run 15s linear infinite;
          transform: rotate(180deg);
        }

        @keyframes run {
          0% {
            left: -50px;
            transform: translateY(0);
          }
          25% {
            transform: translateY(-5px);
          }
          50% {
            left: 50%;
            transform: translateY(0);
          }
          75% {
            transform: translateY(-5px);
          }
          100% {
            left: calc(100% + 50px);
            transform: translateY(0);
          }
        }

        @keyframes fly {
          0% {
            left: -20px;
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(15deg);
          }
          50% {
            left: 55%;
            transform: translateY(0) rotate(-15deg);
          }
          75% {
            transform: translateY(-20px) rotate(10deg);
          }
          100% {
            left: calc(100% + 20px);
            transform: translateY(0) rotate(0deg);
          }
        }
      `}</style>
      <div className="scene">
        <div className="butterfly">
          {/* Butterfly SVG */}
          <svg viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.311 0.748011C11.545 -0.323989 13.333 -0.236989 14.451 0.953011C15.938 2.53601 16.5 4.31201 16.5 6.00001C16.5 8.76101 13.761 11 11 11C10.518 11 10.052 10.946 9.60399 10.849C4.16799 12.352 0.443993 16.883 0.500993 21.5C0.503993 21.776 0.276993 22 0.000992823 22C-0.00200717 22 -0.00200717 22 -0.00200717 22C4.18799 15.65 8.61799 10.354 11.233 7.00001C11.392 6.78601 11.5 6.54101 11.5 6.28901C11.5 5.25001 10.222 4.41401 9.24399 4.97501C7.87299 5.77601 6.55699 7.23401 5.48599 9.00001L5.55199 9.00001C4.46999 7.42001 4.57399 5.47801 5.86299 4.18901C7.23299 2.81901 8.89599 1.95601 10.311 0.748011Z" fill="#E1BEE7"/>
            <path d="M16.689 0.748011C15.455 -0.323989 13.667 -0.236989 12.549 0.953011C11.062 2.53601 10.5 4.31201 10.5 6.00001C10.5 8.76101 13.239 11 16 11C16.482 11 16.948 10.946 17.396 10.849C22.832 12.352 26.556 16.883 26.499 21.5C26.496 21.776 26.723 22 26.999 22C27.002 22 27.002 22 27.002 22C22.812 15.65 18.382 10.354 15.767 7.00001C15.608 6.78601 15.5 6.54101 15.5 6.28901C15.5 5.25001 16.778 4.41401 17.756 4.97501C19.127 5.77601 20.443 7.23401 21.514 9.00001L21.448 9.00001C22.53 7.42001 22.426 5.47801 21.137 4.18901C19.767 2.81901 18.104 1.95601 16.689 0.748011Z" fill="#F9A8D4"/>
          </svg>
        </div>
        <div className="dog">
          {/* Dog SVG */}
          <svg viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3094 0.654228C19.8166 1.48834 20.3703 3.49841 19.5362 5.00561C19.1916 5.61706 18.723 6.13845 18.1637 6.52984L28.1158 13.6766C31.0963 11.229 35.1484 10.6033 38.8315 12.0163C43.5181 13.7503 46.2293 18.421 45.5015 23.2383C44.7595 28.1519 40.5489 31.9545 35.7979 32.3235C30.9099 32.7029 26.5168 29.5398 24.8988 24.9351L12.5741 33.7297C13.2576 35.0872 13.1251 36.804 12.2476 37.9546L5.34351 43.1415C4.05374 44.103 2.21988 43.8344 1.25838 42.5446C0.296884 41.2548 0.565499 39.421 1.85527 38.4595L8.75936 33.2726C8.28315 32.5532 8.12781 31.6212 8.35821 30.7454L1.75899 21.6037C0.375276 19.646 -0.403759 17.1121 0.231268 14.6657C1.19277 10.9163 4.81971 8.28131 8.78311 8.52703C12.6095 8.76233 15.9392 11.5342 16.6346 15.2891L18.3094 0.654228Z" fill="#D1C4E9"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFooter;
