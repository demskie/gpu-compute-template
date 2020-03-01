import * as gpu from "gpu-compute";
import { readFileSync } from "fs";

export const searchAndReplace = {
  "float round(float);": gpu.functionStrings.round,
  "float floatEquals(float, float);": gpu.functionStrings.floatEquals,
  "float floatNotEquals(float, float);": gpu.functionStrings.floatNotEquals,
  "float floatLessThan(float, float);": gpu.functionStrings.floatLessThan,
  "float floatGreaterThan(float, float);": gpu.functionStrings.floatGreaterThan,
  "float floatLessThanOrEqual(float, float);": gpu.functionStrings.floatLessThanOrEqual,
  "float floatGreaterThanOrEqual(float, float);": gpu.functionStrings.floatGreaterThanOrEqual,
  "float vec2ToUint16(vec2);": gpu.functionStrings.vec2ToUint16,
  "vec2 uint16ToVec2(float);": gpu.functionStrings.uint16ToVec2,
  "float vec2ToInt16(vec2);": gpu.functionStrings.vec2ToInt16,
  "vec2 int16ToVec2(float);": gpu.functionStrings.int16ToVec2,
  "void unpackBooleans(float, inout bool arr[8]);": gpu.functionStrings.unpackBooleans,
  "void packBooleans(bool arr[8]);": gpu.functionStrings.packBooleans
};

const fooFrag = readFileSync(require.resolve("./shaders/foo.frag"), "utf8");

export function foo() {
  const shader = new gpu.ComputeShader(fooFrag, searchAndReplace);
  const target = new gpu.RenderTarget(1);
  target.pushTextureData(new Uint8Array([0, 0, 0, 2]));
  target.compute(shader, { u_bytes: target, u_addToAlpha: 2, u_texWidth: 1 });
  const output = target.readPixels();
  return output[3];
}
