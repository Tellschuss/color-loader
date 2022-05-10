RGBA(`
    vec2 uv = gl_FragCoord.xy/resolution - 0.5;
    uv.x *= resolution.x/resolution.y;

    float d = length(uv);

    if (d>0.29 || d < 0.16) {
      gl_FragColor = vec4(0.,0.,0.,1.);
      return;
    }

    d = pow(d, 3.3);

    float c;
    float r = 0.2;

    for (float i = 1e-6; i < 5.0; i += 0.05) {
        float t = time/2. + pow(i, 0.8);
        vec2 uv2 = uv + vec2(cos(t), sin(t)) * (r + sin(t*3.1+i/2.1)*0.013);
        vec3 hsl = vec3(time/14.+i/6., 0.55, 0.55);
        vec3 rgb = clamp(abs(mod(hsl.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0);
        rgb = hsl.z + hsl.y * (rgb-0.5)*(1.0-abs(2.0*hsl.z-1.0));
        c = smoothstep(0.001+d*i, 0.0, length(uv2));
        gl_FragColor += vec4(rgb * c, 1.);   
    }
`);
