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
	//float dist = length(gl_PointCoord.xy - vec2(0.9));

	// adjust values to change effect
	float disc = smoothstep(0.4,0.45,dist);
	//float disc = smoothstep(0.3,0.45,dist);
	if(disc>0.01) discard;

	// this line is causing issues on IOS
	// vec3 color = palette[int(vRand)];


	int number;

	if (cRand > 4.99999) {	
		number = 5;
	} else if (cRand > 3.99999) {
		number = 4;
	} else if (cRand > 2.99999) {
		number = 3;
	} else if (cRand > 1.99999) {
		number = 2;
	} else if (cRand > 0.99999) {
		number = 1;
	} else if (cRand > 0.0) {
		number = 0;
	}
	

	// number = int(vRand);
	// vec3 color = palette[1];
	vec3 color = palette[number];

	//--- vec3 color = vec3(1.);
	gl_FragColor = vec4(1.0,1.0,1.0,vRand * 0.1);
	// gl_FragColor = vec4(1.0,1.0,1.0,0.1);
	gl_FragColor = vec4(color,0.1);
}
