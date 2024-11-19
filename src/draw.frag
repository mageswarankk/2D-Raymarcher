#version 330 core

in vec2 uv;
in vec4 color;

out vec4 FragColor;

uniform ivec2 u_resolution;
uniform vec2 u_mousePos;
uniform vec2 u_lastMousePos;
uniform int u_mouseClicked;
uniform sampler2D u_canvasTexture;

float brushRadius = 0.25f / min(u_resolution.x, u_resolution.y);

float distSquared(vec2 a, vec2 b) {
    vec2 d = a - b;
    return dot(d, d);
}

float sdfLineSquared(vec2 p, vec2 from, vec2 to) {
  vec2 toStart = p - from;
  vec2 line = to - from;
  float lineLengthSquared = dot(line, line);
  float t = clamp(dot(toStart, line) / lineLengthSquared, 0.0, 1.0);
  vec2 closestVector = toStart - line * t;
  return dot(closestVector, closestVector);
}

void main() {
    vec2 fixedUv = ((uv + 1.0f) / 2.0f);
    vec4 current = texture(u_canvasTexture, fixedUv);
    if (u_mouseClicked == 1) {
        // Draw light
        if (sdfLineSquared(uv, u_lastMousePos, u_mousePos) <= brushRadius) {
            current = vec4(u_mousePos, 1.0f, 1.0f);
        }
    }
    else if (u_mouseClicked == 2) {
        // Draw black
        if (sdfLineSquared(uv, u_lastMousePos, u_mousePos) <= brushRadius) {
            current = vec4(0.0f, 0.0f, 0.0f, 1.0f);
        }
    }
    FragColor = current;
}
