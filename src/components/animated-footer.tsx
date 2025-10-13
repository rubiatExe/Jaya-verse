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
            <path d="M16.689 21.252C15.455 22.324 13.667 22.237 12.549 21.047C11.062 19.464 10.5 17.688 10.5 16C10.5 13.239 13.239 11 16 11C16.482 11 16.948 11.054 17.396 11.151C22.832 9.64801 26.556 5.11701 26.499 0.500011C26.496 0.224011 26.723 0.000011234 26.999 0.000011234C27.002 0.000011234 27.002 0.000011234 27.002 0.000011234C22.812 6.35001 18.382 11.646 15.767 15C15.608 15.214 15.5 15.459 15.5 15.711C15.5 16.75 16.778 17.586 17.756 17.025C19.127 16.224 20.443 14.766 21.514 13L21.448 13C22.53 14.58 22.426 16.522 21.137 17.811C19.767 19.181 18.104 20.044 16.689 21.252Z" fill="#E1BEE7"/>
            <path d="M10.311 21.252C11.545 22.324 13.333 22.237 14.451 21.047C15.938 19.464 16.5 17.688 16.5 16C16.5 13.239 13.761 11 11 11C10.518 11 10.052 11.054 9.60399 11.151C4.16799 9.64801 0.443993 5.11701 0.500993 0.500011C0.503993 0.224011 0.276993 0.000011234 0.000992823 0.000011234C-0.00200717 0.000011234 -0.00200717 0.000011234 -0.00200717 0.000011234C4.18799 6.35001 8.61799 11.646 11.233 15C11.392 15.214 11.5 15.459 11.5 15.711C11.5 16.75 10.222 17.586 9.24399 17.025C7.87299 16.224 6.55699 14.766 5.48599 13L5.55199 13C4.46999 14.58 4.57399 16.522 5.86299 17.811C7.23299 19.181 8.89599 20.044 10.311 21.252Z" fill="#F9A8D4"/>
          </svg>
        </div>
        <div className="dog">
          {/* Dog SVG */}
          <svg viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3094 0.654205C19.8166 1.48831 20.3703 3.49836 19.5362 5.00559C19.1916 5.61706 18.723 6.13849 18.1637 6.52979L28.1158 13.6766C31.0963 11.229 35.1484 10.6033 38.8315 12.0163C43.5181 13.7503 46.2293 18.421 45.5015 23.2383C44.7595 28.1519 40.5489 31.9545 35.7979 32.3235C30.9099 32.7029 26.5168 29.5398 24.8988 24.9351L12.5741 33.7297C13.2576 35.0872 13.1251 36.804 12.2476 37.9546L5.34351 43.1415C4.05373 44.103 2.21992 43.8344 1.25842 42.5446C0.29692 41.2549 0.565492 39.421 1.85527 38.4595L8.75936 33.2726C8.28315 32.5532 8.12778 31.6212 8.3582 30.7454L1.75902 21.6037C0.375306 19.646 -0.403734 17.1121 0.231288 14.6657C1.19279 10.9163 4.81969 8.28131 8.78308 8.52697C12.6095 8.76231 15.9392 11.5342 16.6346 15.2891L18.3094 0.654205Z" fill="#D1C4E9"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFooter;
