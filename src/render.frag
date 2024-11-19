#version 330 core

in vec2 uv;
in vec4 color;

out vec4 FragColor;

uniform ivec2 u_resolution;
uniform vec2 u_mousePos;
uniform int u_mouseClicked;
uniform sampler2D u_canvasTexture;
uniform sampler2D u_distanceFieldTexture;

#define TAU 6.2831853f
#define EPS 0.001f

float brushRadius = 0.25f / min(u_resolution.x, u_resolution.y);

float rand(vec2 co) {
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
    int rayCount = 64;
    int maxSteps = 64;

    vec2 fixedUv = (uv + 1.0f) / 2.0f;
    vec2 coord = fixedUv * vec2(u_resolution);
    
    vec4 light = texture(u_canvasTexture, fixedUv);
    
    if (light.a > 0.1) return light;

    float oneOverRayCount = 1.0 / float(rayCount);
    float tauOverRayCount = TAU * oneOverRayCount;
    float noise = rand(fixedUv);

    vec4 radiance = vec4(0.0);

    for (int i = 0; i < rayCount; i++) {
        float angle = tauOverRayCount * (float(i) + noise*5.0f);
        vec2 rayDirection = vec2(cos(angle), -sin(angle));

        vec2 sampleUv = fixedUv;
        
        for (int step = 1; step < maxSteps; step++) {            
            float dist = texture(u_distanceFieldTexture, sampleUv).r;
            sampleUv += rayDirection * (dist + noise*0.01f);
            if (outOfBounds(sampleUv)) break;

            vec4 sampleLight = texture(u_canvasTexture, sampleUv);
            if (sampleLight.a > 0.1) {
                radiance += sampleLight;
                break;
            }
        }
    }
    return radiance * oneOverRayCount;
}

void main() {
    if (distSquared(uv, u_mousePos) < brushRadius)
        FragColor = vec4(u_mousePos, 1.0f, 1.0f);
    else 
        FragColor = raymarch();
}
