#ifndef SHADER_H
#define SHADER_H

#include<glad/glad.h>
#include<string>
#include<fstream>
#include<sstream>
#include<iostream>
#include<cerrno>

std::string getFileContents(const char* filename);

class Shader {
public:
	GLuint ID;
	Shader(const char* vertexShaderFile, const char* fragmentShaderFile);

	void activateShader();
	void dectivateShader();
	void deleteShader();
private:
	void compileErrors(unsigned int shader, const char* type);
};

#endif