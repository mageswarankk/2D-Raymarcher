#version 330 core

layout (location = 0) in vec3 aPos;
layout (location = 1) in vec4 aColor;

out vec2 uv;
out vec4 color;

void main() {
   uv = vec2(aPos.x, aPos.y);
   color = aColor;

   gl_Position = vec4(aPos, 1.0);
}
