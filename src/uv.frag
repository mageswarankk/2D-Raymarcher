#version 330 core

in vec2 uv;
in vec4 color;

out vec4 FragColor;

uniform vec3 u_resolution;
uniform sampler2D u_canvasTexture;

void main() {
	vec2 fixedUv = ((uv + 1.0f) / 2.0f);
	float alpha = texture(u_canvasTexture, fixedUv).a;
	FragColor = vec4(fixedUv*alpha, 0.0f, 1.0f);
}
