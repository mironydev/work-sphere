"use client";

import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const particlesInit = async (engine) => {
  await loadSlim(engine);
};

const ShootingStars = () => {
  const options = useMemo(
    () => ({
      fullScreen: {
        enable: false,
      },

      background: {
        color: {
          value: "transparent",
        },
      },

      fpsLimit: 60,

      particles: {
        number: {
          value: 45,
        },

        color: {
          value: "#ffffff",
        },

        opacity: {
          value: {
            min: 0.15,
            max: 0.6,
          },
        },

        size: {
          value: {
            min: 0.5,
            max: 1.5,
          },
        },

        shape: {
          type: "circle",
        },

        move: {
          enable: true,
          speed: {
            min: 0.15,
            max: 0.5,
          },
          random: true,
          outModes: {
            default: "out",
          },
        },

        twinkle: {
          particles: {
            enable: true,
            frequency: 0.03,
            opacity: 1,
          },
        },
      },

      detectRetina: true,
    }),
    [],
  );

  return (
    <ParticlesProvider init={particlesInit}>
      <Particles
        id="shooting-stars"
        options={options}
        className="absolute inset-0 z-0"
      />
    </ParticlesProvider>
  );
};

export default ShootingStars;
