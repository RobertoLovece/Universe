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

	float disc = smoothstep(0.4,0.45,dist);
	if(disc>0.01) discard;

	// this line is causing issues on IOS
	// vec3 color = palette[int(vRand)];
	vec3 color = vec3(0.011764705882352941,0.21176470588235294,0.28627450980392155);
	vec3 color1 = vec3(0.803921568627451, 0.7019607843137254, 0.5019607843137255);
	vec3 color2 = vec3(0.011764705882352941, 0.396078431372549, 0.39215686274509803);
	vec3 color3 = vec3(0.011764705882352941, 0.21176470588235294, 0.28627450980392155);
	vec3 color4 = vec3(0.011764705882352941, 0.08627450980392157, 0.20392156862745098);

	int number;

	if (cRand == 5.0) {
		number = 5;
	} else if (cRand == 4.0) {
		number = 4;
	} else if (cRand == 3.0) {
		number = 3;
	} else if (cRand == 2.0) {
		number = 2;
	} else if (cRand == 1.0) {
		number = 1;
	} else if (cRand == 0.0) {
		number = 0;
	}

	vec3 colors[5] = vec3[5](color, color1, color2, color3, color4); 
	color = colors[number];


	//--- vec3 color = vec3(1.);
	gl_FragColor = vec4(1.0,1.0,1.0,vRand*0.1);
	// gl_FragColor = vec4(1.0,1.0,1.0,0.1);
	gl_FragColor = vec4(color,0.1);
}
