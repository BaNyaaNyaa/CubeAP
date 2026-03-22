/**
 * Represent a move to rotate the cube
 */
export default class PuzzleRotationMove extends Move {
  /**
   * @param {THREE.Vector3} axis - Axis of rotation
   * @param {number} angle - Angle of rotation.
   */
  constructor(axis, angle) {
    this.axis = axis;
    this.angle = angle;
  }

  /**
   * Returns the move that inverses this move
   * @returns Move
   */
  inverse() {
    return new PuzzleRotationMove(this.axis.clone(), -this.angle);
  }
}