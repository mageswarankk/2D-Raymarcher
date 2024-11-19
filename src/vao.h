#ifndef VAO_CLASS_H
#define VAO_CLASS_H

#include<glad/glad.h>
#include"vbo.h"

class VAO {
public:
	GLuint ID;
	VAO();

	void linkAttrib(VBO VBO, GLuint layout, GLuint numComponents, GLenum type, GLsizei stride, void* offset);
	void bindVAO();
	void unbindVAO();
	void deleteVAO();
};

#endif