#include"vao.h"

VAO::VAO() {
	glGenVertexArrays(1, &ID);
}

void VAO::linkAttrib(VBO VBO, GLuint layout, GLuint numComponents, GLenum type, GLsizei stride, void* offset) {
	VBO.bindVBO();
	glVertexAttribPointer(layout, numComponents, type, GL_FALSE, stride, offset);
	glEnableVertexAttribArray(layout);
	VBO.unbindVBO();
}

void VAO::bindVAO() {
	glBindVertexArray(ID);
}

void VAO::unbindVAO() {
	glBindVertexArray(0);
}

void VAO::deleteVAO() {
	glDeleteVertexArrays(1, &ID);
}