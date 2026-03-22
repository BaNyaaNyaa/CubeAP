/**
 * Represent a move on the cube
 */
export default class Move {

  /**
   * @param {string} type Type of move
   */
  constructor(type) {
    this.type = type;
  }

  /**
   * Returns the move that inverses this move
   * @returns Move
   */
  inverse() {
  }
}