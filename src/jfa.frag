#version 330 core

in vec2 uv;
in vec4 color;

out vec4 FragColor;

uniform ivec2 u_resolution;
uniform sampler2D u_inputTexture;
uniform int u_offset;

void main() {
	vec4 nearestSeed = vec4(-2.0);
	float nearestDist = 9999999.9;

	for (float y = -1.0; y <= 1.0; y += 1.0) {
		for (float x = -1.0; x <= 1.0; x += 1.0) {
			vec2 fixedUv = ((uv + 1.0f) / 2.0f);
			vec2 sampleUv = uv + vec2(x,y) * u_offset / u_resolution;
			vec2 fixedSampleUv = ((sampleUv + 1.0f) / 2.0f);

			vec4 sampleValue = texture(u_inputTexture, fixedSampleUv);
			vec2 sampleSeed = sampleValue.xy;

			if (sampleSeed.x != 0.0 || sampleSeed.y != 0.0) {
				vec2 diff = sampleSeed - fixedUv;
				float dist = dot(diff, diff);
				if (dist < nearestDist) {
					nearestDist = dist;
					nearestSeed = sampleValue;
				}
			}
		}
	}

	FragColor = nearestSeed;
}
