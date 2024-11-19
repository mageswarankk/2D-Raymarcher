#version 330 core

in vec2 uv;
in vec4 color;

out vec4 FragColor;

uniform sampler2D u_jfaTexture;

void main() {
	vec2 fixedUv = ((uv + 1.0f) / 2.0f);
    vec2 nearestSeed = texture(u_jfaTexture, fixedUv).xy;
	// Clamp by the size of our texture (1.0 in uv space).
	float dist = clamp(distance(fixedUv, nearestSeed), 0.0, 1.0);
	// Normalize and visualize the distance
	FragColor = vec4(vec3(dist), 1.0);
}
