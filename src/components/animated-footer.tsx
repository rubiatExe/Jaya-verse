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
          <svg viewBox="0 0 27 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
            <path d="M10.311 0.748011C11.545 -0.323989 13.333 -0.236989 14.451 0.953011C15.938 2.53601 16.5 4.31201 16.5 6.00001C16.5 8.76101 13.761 11 11 11C10.518 11 10.052 10.946 9.60399 10.849C4.16799 12.352 0.443993 16.883 0.500993 21.5C0.503993 21.776 0.276993 22 0.000992823 22C-0.00200717 22 -0.00200717 22 -0.00200717 22C4.18799 15.65 8.61799 10.354 11.233 7.00001C11.392 6.78601 11.5 6.54101 11.5 6.28901C11.5 5.25001 10.222 4.41401 9.24399 4.97501C7.87299 5.77601 6.55699 7.23401 5.48599 9.00001L5.55199 9.00001C4.46999 7.42001 4.57399 5.47801 5.86299 4.18901C7.23299 2.81901 8.89599 1.95601 10.311 0.748011Z" fill="#E1BEE7"/>
            <path d="M16.689 0.748011C15.455 -0.323989 13.667 -0.236989 12.549 0.953011C11.062 2.53601 10.5 4.31201 10.5 6.00001C10.5 8.76101 13.239 11 16 11C16.482 11 16.948 10.946 17.396 10.849C22.832 12.352 26.556 16.883 26.499 21.5C26.496 21.776 26.723 22 26.999 22C27.002 22 27.002 22 27.002 22C22.812 15.65 18.382 10.354 15.767 7.00001C15.608 6.78601 15.5 6.54101 15.5 6.28901C15.5 5.25001 16.778 4.41401 17.756 4.97501C19.127 5.77601 20.443 7.23401 21.514 9.00001L21.448 9.00001C22.53 7.42001 22.426 5.47801 21.137 4.18901C19.767 2.81901 18.104 1.95601 16.689 0.748011Z" fill="#F9A8D4"/>
          </svg>
        </div>
        <div className="dog">
          {/* Dog SVG */}
          <svg viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
            <path d="M35.6906 43.3458C34.1834 42.5117 33.6297 40.5016 34.4638 38.9944C34.8084 38.3829 35.277 37.8615 35.8363 37.4702L25.8842 30.3234C22.9037 32.771 18.8516 33.3967 15.1685 31.9837C10.4819 30.2497 7.77073 25.579 8.49852 20.7617C9.24047 15.8481 13.4511 12.0455 18.2021 11.6765C23.0901 11.2971 27.4832 14.4602 29.1012 19.0649L41.4259 10.2703C40.7424 8.91283 40.8749 7.19599 41.7524 6.0454L48.6565 0.85848C49.9463 -0.103021 51.7801 0.165593 52.7416 1.45537C53.7031 2.74514 53.4345 4.57899 52.1447 5.54049L45.2406 10.7274C45.7168 11.4468 45.8722 12.3788 45.6418 13.2546L52.241 22.3963C53.6247 24.354 54.4037 26.8879 53.7687 29.3343C52.8072 33.0837 49.1803 35.7187 45.2169 35.473C41.3905 35.2377 38.0608 32.4658 37.3654 28.7109L35.6906 43.3458Z" fill="#D1C4E9"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedFooter;
