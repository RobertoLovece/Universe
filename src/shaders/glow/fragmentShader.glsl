varying vec3 vertexNormal;

void main() {
    float intensity = pow(0.01 - dot(vertexNormal, vec3(0.0, 0.0, 0.4)), 2.0);

    gl_FragColor = vec4(0.0, 0.5, 0.7, 1.0) * intensity;
}