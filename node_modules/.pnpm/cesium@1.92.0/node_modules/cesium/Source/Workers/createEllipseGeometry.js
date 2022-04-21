/* This file is automatically rebuilt by the Cesium build process. */
define(['./Matrix2-feb45b00', './defaultValue-94c3e563', './EllipseGeometry-9999d21f', './RuntimeError-c581ca93', './ComponentDatatype-b1ea011a', './WebGLConstants-7dccdc96', './GeometryOffsetAttribute-3e8c299c', './Transforms-c9f24aab', './_commonjsHelpers-3aae1032-f55dc0c4', './combine-761d9c3f', './EllipseGeometryLibrary-3d58ec34', './GeometryAttribute-a247c9b5', './GeometryAttributes-7df9bef6', './GeometryInstance-226aaa98', './GeometryPipeline-8bdf78c5', './AttributeCompression-b89638a2', './EncodedCartesian3-7fbeca3f', './IndexDatatype-c4099fe9', './IntersectionTests-cddae83a', './Plane-d4dd64b5', './VertexFormat-e46f29d6'], (function (Matrix2, defaultValue, EllipseGeometry, RuntimeError, ComponentDatatype, WebGLConstants, GeometryOffsetAttribute, Transforms, _commonjsHelpers3aae1032, combine, EllipseGeometryLibrary, GeometryAttribute, GeometryAttributes, GeometryInstance, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, VertexFormat) { 'use strict';

  function createEllipseGeometry(ellipseGeometry, offset) {
    if (defaultValue.defined(offset)) {
      ellipseGeometry = EllipseGeometry.EllipseGeometry.unpack(ellipseGeometry, offset);
    }
    ellipseGeometry._center = Matrix2.Cartesian3.clone(ellipseGeometry._center);
    ellipseGeometry._ellipsoid = Matrix2.Ellipsoid.clone(ellipseGeometry._ellipsoid);
    return EllipseGeometry.EllipseGeometry.createGeometry(ellipseGeometry);
  }

  return createEllipseGeometry;

}));
