#version 330 core

in vec2 uv;
in vec4 color;

out vec4 FragColor;

uniform ivec2 u_resolution;
uniform vec2 u_mousePos;
uniform int u_mouseClicked;
uniform sampler2D u_canvasTexture;
uniform sampler2D u_uvMapTexture;

float brushRadius = 0.25f / min(u_resolution.x, u_resolution.y);

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float distSquared(vec2 a, vec2 b) {
    vec2 d = a - b;
    return dot(d, d);
}

bool outOfBounds(vec2 uv) {
  return uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0;
}

vec4 raymarch() {
    int rayCount = 8;      // 0 - 32   (2**5)
    float raySize = 64;    // 0 - 512 (2**10)
    int maxSteps = 128;    // 0 - 512 (2**10)

    const float TAU = 6.283185307179586f;

    vec2 fixedUv = ((uv + 1.0f) / 2.0f);
    vec2 coord = fixedUv * vec2(u_resolution);
    
    vec4 light = texture(u_canvasTexture, fixedUv);
    
    if (light.a > 0.1) return light;

    float oneOverRayCount = 1.0 / float(rayCount);
    float tauOverRayCount = TAU * oneOverRayCount;
    float noise = rand(fixedUv);

    vec4 radiance = vec4(0.0);

    for (int i = 0; i < rayCount; i++) {
        float angle = tauOverRayCount * (float(i) + noise);
        vec2 rayDirectionUv = vec2(cos(angle), -sin(angle)) / raySize;

        // Our current position, plus one step.
        vec2 sampleUv = fixedUv + rayDirectionUv;
        
        for (int step = 0; step < maxSteps; step++) {
            if (outOfBounds(sampleUv)) break;
            vec4 sampleLight = texture(u_canvasTexture, sampleUv);
            if (sampleLight.w > 0.1) {
              radiance += sampleLight;
              break;
            }
            sampleUv += rayDirectionUv;
        }
    }
    return radiance * oneOverRayCount;
}

void main() {
    if (distSquared(uv, u_mousePos) < brushRadius)
        FragColor = vec4(1.0f, 0.992f, 0.933f, 1.0f); // Light color
    else 
        FragColor = raymarch();
}
