precision mediump float;

uniform float uTime;
uniform vec2 uResolution;

float noise3D(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    
    // Smoothstep interpolation
    vec3 u = f * f * (3.0 - 2.0 * f);
    
    float n000 = dot(rand3(i), f - vec3(0.0, 0.0, 0.0));
    float n001 = dot(rand3(i + vec3(0.0, 0.0, 1.0)), f - vec3(0.0, 0.0, 1.0));
    float n010 = dot(rand3(i + vec3(0.0, 1.0, 0.0)), f - vec3(0.0, 1.0, 0.0));
    float n011 = dot(rand3(i + vec3(0.0, 1.0, 1.0)), f - vec3(0.0, 1.0, 1.0));
    float n100 = dot(rand3(i + vec3(1.0, 0.0, 0.0)), f - vec3(1.0, 0.0, 0.0));
    float n101 = dot(rand3(i + vec3(1.0, 0.0, 1.0)), f - vec3(1.0, 0.0, 1.0));
    float n110 = dot(rand3(i + vec3(1.0, 1.0, 0.0)), f - vec3(1.0, 1.0, 0.0));
    float n111 = dot(rand3(i + vec3(1.0, 1.0, 1.0)), f - vec3(1.0, 1.0, 1.0));
    
    // Trilinear interpolation
    float n00 = mix(n000, n001, u.z);
    float n01 = mix(n010, n011, u.z);
    float n10 = mix(n100, n101, u.z);
    float n11 = mix(n110, n111, u.z);
    
    float n0 = mix(n00, n01, u.y);
    float n1 = mix(n10, n11, u.y);
    
    return mix(n0, n1, u.x);
}

vec3 rand3(vec3 n) {
    vec3 s = vec3(12.9898, 78.233, 45.164);
    vec3 k = vec3(0.0, 0.0, 0.0);
    vec3 f = fract(n * s);
    f = f * f * (3.0 - 2.0 * f);
    vec3 u = mix(f, k, step(k, f));

    return fract(vec3(dot(u, vec3(1.0, 57.0, 113.0)),
                       dot(u, vec3(57.0, 113.0, 1.0)),
                       dot(u, vec3(113.0, 1.0, 57.0)))) * 2.0 - 1.0;
}


void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec3 pos = vec3(st * 2.0 - 1.0, uTime);
    
    float frequency = 0.5;
    float amplitude = 1.0;
    float n = noise3D(pos, frequency, amplitude);
    
    gl_FragColor = vec4(vec3(n), 1.0);
}