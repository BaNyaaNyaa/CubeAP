import Move from "./Move.js"

/**
 * Represent a move on the cube
 */
export default class LayerRotationMove extends Move {
  /**
   * @param {Layer} layer - Layer where the move is applied
   * @param {number} angle - Angle of rotation.
   */
  constructor(layer, angle) {
    super();
    this.layer = layer;
    this.angle = angle;
  }

  /**
   * Returns the move that inverses this move
   * @returns Move
   */
  inverse() {
    return new Move(this.layer, -this.angle);
  }
}