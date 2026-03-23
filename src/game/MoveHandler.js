import LayerRotationMove from "./move/LayerRotationMove.js";
import PuzzleRotationMove from "./move/PuzzleRotationMove.js";
import Layer from "./move/Layer.js";

export default class MoveHandler {


  constructor(cubeSize) {
    this.cubeSize = cubeSize;

    this.possibleAxis = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
    this.possibleIndices = Array.from({length: Math.floor(cubeSize/2)}, (_, i) => i + 1).flatMap(i => [i, -i]);
    this.possibleAngleMultipliers = [1, 2, -1];

    this.positionFromFace = {
      D: new THREE.Vector3(0, -1, 0), U: new THREE.Vector3(0, 1, 0),
      L: new THREE.Vector3(-1, 0, 0), R: new THREE.Vector3(1, 0, 0),
      F: new THREE.Vector3(0, 0, 1), B: new THREE.Vector3(0, 0, -1)
    }
  }

  /**
   * Randomly generates the given number of moves
   * 
   * @param {number} length 
   * @returns {LayerRotationMove[]} moves
   */
  generateRandomMoves(length) {
    const moves = [];

    for (let i = 0 ; i < length ; i++) {
      moves.push(this.generateRandomMove());
    }

    return moves;
  }

  /**
   * Generated a random move
   * 
   * @returns {LayerRotationMove}
   */
  generateRandomMove() {
    const axis = this.#getRandomElementFromArray(this.possibleAxis);
    const index = this.#getRandomElementFromArray(this.possibleIndices);
    const angle = (Math.PI / 2) * this.#getRandomElementFromArray(this.possibleAngleMultipliers);
    return new LayerRotationMove(new Layer(index, axis), angle)
  }

  /**
   * Returns a random element from the given array
   * 
   * @template T
   * @param {Array<T>} array 
   * @returns {T}
   */
  #getRandomElementFromArray(array) {
    return array[Math.floor(Math.random()*array.length)]
  }

  /**
   * Convert the notation to a move relative to the position of the cube
   * 
   * @param {string} notation The notation of the move as a string
   * @param {THREE.Quaternion} inverseQuaternion The quaternion representing the position of the cube
   * @returns {Move} The actual move
   */
  convertNotationToMove(notation, inverseQuaternion) {
    console.log(notation);
    const face = notation.charAt( 0 );
    const modifier = notation.charAt( 1 );
    if (['x', 'y', 'z'].includes(face)) {
      const axis = new THREE.Vector3();
      axis[face] = 1;
      const angle = -Math.PI / 2 * ( ( modifier == "'" ) ? - 1 : 1 );

      return new PuzzleRotationMove(axis, angle);
    }

    const coefficient = this.cubeSize > 3 && face !== face.toLowerCase() ? 2 : 1;

    const absolutePosition = this.positionFromFace[face.toUpperCase()].clone();

    const relativePosition = absolutePosition.applyQuaternion(inverseQuaternion);
    const relativeMainAxis = Object.keys( relativePosition ).reduce(
      ( a, b ) => Math.abs( relativePosition[ a ] ) > Math.abs( relativePosition[ b ] ) ? a : b
    );

    const relativeRow = coefficient*relativePosition[relativeMainAxis];
    const angle = ( Math.PI / 2 ) * - Math.sign(relativeRow) * ( ( modifier == "'" ) ? - 1 : 1 );

    const axis = new THREE.Vector3();
    axis[relativeMainAxis] = 1;

    return new LayerRotationMove(new Layer(relativeRow, axis), angle);
  }

}