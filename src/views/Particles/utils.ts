import { Vector } from "./types";

const G = 6.6743e-11; // gravitational constant in m^3 kg^-1 s^-2

/**
 * Calculate the velocity and acceleration vectors of an object in orbit.
 *
 * @param m1 - Mass of the central object in kilograms.
 * @param position - Position vector of the object relative to the central mass.
 * @returns { velocity: Vector, acceleration: Vector }.
 */
export const getOrbitalDynamics = (
  m1: number,
  position: Vector
): { velocity: Vector; acceleration: Vector } => {
  const rMagnitude = Math.sqrt(
    position.x ** 2 + position.y ** 2 + position.z ** 2
  );

  // Calculate acceleration magnitude
  const a = (G * m1) / rMagnitude ** 2;

  // Calculate unit vector in the direction of position
  const rHat: Vector = {
    x: position.x / rMagnitude,
    y: position.y / rMagnitude,
    z: position.z / rMagnitude,
  };

  // Calculate acceleration vector
  const acceleration: Vector = {
    x: -a * rHat.x,
    y: -a * rHat.y,
    z: -a * rHat.z,
  };

  // Calculate velocity direction (arbitrarily chosen to be perpendicular to both rHat and z-axis)
  const vMagnitude = Math.sqrt((G * m1) / rMagnitude);
  const velocity: Vector = {
    x: -vMagnitude * rHat.y,
    y: vMagnitude * rHat.x,
    z: 0, // As an example, this gives a velocity vector in the xy-plane
  };

  return { velocity, acceleration };
};
