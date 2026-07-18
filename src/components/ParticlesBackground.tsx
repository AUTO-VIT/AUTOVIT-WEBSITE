"use client";

import { useEffect, useState, useMemo, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const ParticlesBackground = memo(function ParticlesBackground() {
  const [init, setInit] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      const { loadSlim } = await import(
        /* webpackChunkName: "tsparticles-slim-custom" */ "@tsparticles/slim"
      );
      await loadSlim(engine);
    })
      .then(() => {
        setInit(true);
      })
      .catch((err) => {
        console.warn("Particles engine failed to initialize:", err);
        setError(true);
      });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },

      fullScreen: {
        enable: false,
      },

      fpsLimit: 120,

      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },

          resize: {
            enable: true,
          },
        },

        modes: {
          push: {
            quantity: 4,
          },
          grab: {
            distance: 180,

            links: {
              opacity: 0.5,
            },
          },
        },
      },

      particles: {
        color: {
          value: "#dc2626",
        },

        links: {
          color: "#dc2626",
          distance: 120,
          enable: true,
          opacity: 0.25,
          width: 1,
        },

        move: {
          enable: true,
          speed: 0.8,
          direction: "none",
          random: false,
          straight: false,

          outModes: {
            default: "bounce",
          },
        },

        number: {
          density: {
            enable: true,
          },

          value: 180,
        },

        opacity: {
          value: 0.5,
        },

        size: {
          value: {
            min: 1,
            max: 2,
          },
        },

        shape: {
          type: "circle",
        },
      },

      detectRetina: true,
    }),
    []
  );

  if (!init || error) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Particles
        id="tsparticles"
        options={options}
        className="w-full h-full"
      />
    </div>
  );
});

export default ParticlesBackground;