uniform float time;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;
varying float vRand;
varying float cRand;
uniform vec3 palette[5];

void main()	{
	//--- vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
	float dist = length(gl_PointCoord.xy - vec2(0.5));

	// adjust values to change effect
	float disc = smoothstep(0.4,0.45,dist);
	if(disc>0.01) discard;

	vec3 color;
	
	for (int x = 0; x < 5; x++) {
		if (x == int(vRand)) {
			color = palette[x];
		}
	}

	//--- vec3 color = vec3(1.);
	gl_FragColor = vec4(1.0,1.0,1.0,vRand * 0.1);
	// gl_FragColor = vec4(1.0,1.0,1.0,0.1);
	gl_FragColor = vec4(color,0.1);
}
