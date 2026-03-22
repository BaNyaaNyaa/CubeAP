export default class Layer {
  /**
   * @param {number[]} index - Index of the layer on the axis
   * @param {THREE.Vector3} axis - Axis of rotation
   */
  constructor(index, axis) {
    this.index = index;
    this.axis = axis;
  }
}