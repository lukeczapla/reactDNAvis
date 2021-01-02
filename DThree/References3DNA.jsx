

export const bases = [
            "SEQRES   1 A    1  A\n" +
                    "ATOM      2  N9    A A   1      -1.291   4.498   0.000\n" +
                    "ATOM      3  C8    A A   1       0.024   4.897   0.000\n" +
                    "ATOM      4  N7    A A   1       0.877   3.902   0.000\n" +
                    "ATOM      5  C5    A A   1       0.071   2.771   0.000\n" +
                    "ATOM      6  C6    A A   1       0.369   1.398   0.000\n" +
                    "ATOM      8  N1    A A   1      -0.668   0.532   0.000\n" +
                    "ATOM      9  C2    A A   1      -1.912   1.023   0.000\n" +
                    "ATOM     10  N3    A A   1      -2.320   2.290   0.000\n" +
                    "ATOM     11  C4    A A   1      -1.267   3.124   0.000\n" +
                    "END",
            "SEQRES   1 A    1  G\n" +
                    "ATOM      2  N9    G A   1      -1.289   4.551   0.000\n" +
                    "ATOM      3  C8    G A   1       0.023   4.962   0.000\n" +
                    "ATOM      4  N7    G A   1       0.870   3.969   0.000\n" +
                    "ATOM      5  C5    G A   1       0.071   2.833   0.000\n" +
                    "ATOM      6  C6    G A   1       0.424   1.460   0.000\n" +
                    "ATOM      8  N1    G A   1      -0.700   0.641   0.000\n" +
                    "ATOM      9  C2    G A   1      -1.999   1.087   0.000\n" +
                    "ATOM     11  N3    G A   1      -2.342   2.364   0.001\n" +
                    "ATOM     12  C4    G A   1      -1.265   3.177   0.000\n" +
                    "END",
            "SEQRES   1 A    1  T\n" +
                    "ATOM      2  N1    T A   1      -1.284   4.500   0.000\n" +
                    "ATOM      3  C2    T A   1      -1.462   3.135   0.000\n" +
                    "ATOM      5  N3    T A   1      -0.298   2.407   0.000\n" +
                    "ATOM      6  C4    T A   1       0.994   2.897   0.000\n" +
                    "ATOM      8  C5    T A   1       1.106   4.338   0.000\n" +
                    "ATOM     10  C6    T A   1      -0.024   5.057   0.000\n" +
                    "END",
            "SEQRES   1 A    1  C\n" +
                    "ATOM      2  N1    C A   1      -1.285   4.542   0.000\n" +
                    "ATOM      3  C2    C A   1      -1.472   3.158   0.000\n" +
                    "ATOM      5  N3    C A   1      -0.391   2.344   0.000\n" +
                    "ATOM      6  C4    C A   1       0.837   2.868   0.000\n" +
                    "ATOM      8  C5    C A   1       1.056   4.275   0.000\n" +
                    "ATOM      9  C6    C A   1      -0.023   5.068   0.000\n" +
                    "END",
            "SEQRES   1 A    1  U\n" +
                    "ATOM      2  N1    U A   1      -1.284   4.500   0.000\n" +
                    "ATOM      3  C2    U A   1      -1.462   3.131   0.000\n" +
                    "ATOM      5  N3    U A   1      -0.302   2.397   0.000\n" +
                    "ATOM      6  C4    U A   1       0.989   2.884   0.000\n" +
                    "ATOM      8  C5    U A   1       1.089   4.311   0.000\n" +
                    "ATOM      9  C6    U A   1      -0.024   5.053   0.000\n"
    ];

    
function parseBases() {
  let letters = ["A", "G", "T", "C"];
  let i = 0;
  let result = {};
  letters.forEach((letter) => {
    let lines = bases[i].split("\n");
    let atoms = [];
    for (let j = 1; j < lines.length-1; j++) {
      let atom = {};
      atom.name = lines[j].charAt(13) + (lines[j].charAt(14) !== ' ' ? lines[j].charAt(14): '') + (lines[j].charAt(15) !== ' ' ? lines[j].charAt(15): '');
      atom.x = parseFloat(lines[j].substring(30, 38));
      atom.y = parseFloat(lines[j].substring(38, 46));
      atom.z = parseFloat(lines[j].substring(46, 54));
      atoms.push(atom);
    }
    i++;
    result[letter] = atoms;
  });

  return result;
}

export function calculatetp(A) {

    let M = [0,0,0,0,0,0];
    let PI = Math.PI;

    let cosgamma, gamma, phi, omega, sgcp, omega2_minus_phi,
            sm, cm, sp, cp, sg, cg;

    cosgamma = A[2][2];
    if (cosgamma > 1.0) cosgamma = 1.0;
    else if (cosgamma < -1.0) cosgamma = -1.0;

    gamma = Math.acos(cosgamma);

    sgcp = A[1][1]*A[0][2]-A[0][1]*A[1][2];

    if (gamma == 0.0) omega = -Math.atan2(A[0][1],A[1][1]);
    else omega = Math.atan2(A[2][1]*A[0][2]+sgcp*A[1][2],sgcp*A[0][2]-A[2][1]*A[1][2]);

    omega2_minus_phi = Math.atan2(A[1][2],A[0][2]);

    phi = omega/2.0 - omega2_minus_phi;

    M[0] = gamma*Math.sin(phi)*180.0/PI;
    M[1] = gamma*Math.cos(phi)*180.0/PI;
    M[2] = omega*180.0/PI;

    sm = Math.sin(omega/2.0-phi);
    cm = Math.cos(omega/2.0-phi);
    sp = Math.sin(phi);
    cp = Math.cos(phi);
    sg = Math.sin(gamma/2.0);
    cg = Math.cos(gamma/2.0);

    M[3] = (cm*cg*cp-sm*sp)*A[0][3]+(sm*cg*cp+cm*sp)*A[1][3]-sg*cp*A[2][3];
    M[4] = (-cm*cg*sp-sm*cp)*A[0][3]+(-sm*cg*sp+cm*cp)*A[1][3]+sg*sp*A[2][3];
    M[5] = (cm*sg)*A[0][3]+(sm*sg)*A[1][3]+cg*A[2][3];

    return M;

}


export function calculateA(tp) {

    let M = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]];
    let PI = Math.PI;

    let t1 = tp[0]*PI/180.0;
    let t2 = tp[1]*PI/180.0;
    let t3 = tp[2]*PI/180.0;

    let gamma = Math.sqrt(t1*t1+t2*t2);
    let phi = Math.atan2(t1,t2);
    let omega = t3;

    let sp = Math.sin(omega/2.0+phi);
    let cp = Math.cos(omega/2.0+phi);
    let sm = Math.sin(omega/2.0-phi);
    let cm = Math.cos(omega/2.0-phi);
    let sg = Math.sin(gamma);
    let cg = Math.cos(gamma);

    M[0][0] = cm*cg*cp-sm*sp;
    M[0][1] = -cm*cg*sp-sm*cp;
    M[0][2] = cm*sg;
    M[1][0] = sm*cg*cp+cm*sp;
    M[1][1] = -sm*cg*sp+cm*cp;
    M[1][2] = sm*sg;
    M[2][0] = -sg*cp;
    M[2][1] = sg*sp;
    M[2][2] = cg;

    sp = Math.sin(phi); cp = Math.cos(phi); sg = Math.sin(gamma/2.0); cg = Math.cos(gamma/2.0);

    M[0][3] = tp[3]*(cm*cg*cp-sm*sp) + tp[4]*(-cm*cg*sp-sm*cp) + tp[5]*(cm*sg);
    M[1][3] = tp[3]*(sm*cg*cp+cm*sp) + tp[4]*(-sm*cg*sp+cm*cp) + tp[5]*(sm*sg);
    M[2][3] = tp[3]*(-sg*cp) + tp[4]*(sg*sp) + tp[5]*(cg);

    return M;

}



export function calculateM(tp) {

    let M = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]];
    let PI = Math.PI;

    let t1 = tp[0]*PI/180.0;
    let t2 = tp[1]*PI/180.0;
    let t3 = tp[2]*PI/180.0;

    let gamma = 0.5*Math.sqrt(t1*t1+t2*t2);
    let phi = Math.atan2(t1,t2);
    let omega = t3;

    let sp = Math.sin(phi);
    let cp = Math.cos(phi);
    let sm = Math.sin(omega/2.0-phi);
    let cm = Math.cos(omega/2.0-phi);
    let sg = Math.sin(gamma);
    let cg = Math.cos(gamma);

    M[0][0] = cm*cg*cp-sm*sp;
    M[0][1] = -cm*cg*sp-sm*cp;
    M[0][2] = cm*sg;
    M[1][0] = sm*cg*cp+cm*sp;
    M[1][1] = -sm*cg*sp+cm*cp;
    M[1][2] = sm*sg;
    M[2][0] = -sg*cp;
    M[2][1] = sg*sp;
    M[2][2] = cg;

	M[0][3] = 0.0;
	M[1][3] = 0.0;
	M[2][3] = 0.0;

    sp = Math.sin(phi); cp = Math.cos(phi); sg = Math.sin(gamma/2.0); cg = Math.cos(gamma/2.0);

    M[0][3] = (tp[3]*(cm*cg*cp-sm*sp) + tp[4]*(-cm*cg*sp-sm*cp) + tp[5]*(cm*sg))/2.0;
    M[1][3] = (tp[3]*(sm*cg*cp+cm*sp) + tp[4]*(-sm*cg*sp+cm*cp) + tp[5]*(sm*sg))/2.0;
    M[2][3] = (tp[3]*(-sg*cp) + tp[4]*(sg*sp) + tp[5]*(cg))/2.0;

    return M;

}




export function jeigen(a) {

  if (a.length !== a[0].length) return null;

  let ip, iq, i, j;
  let tresh, theta, tau, t, sm, s, h, g, c;

  let x = [];
  let v = [];
  //let v = a.slice();
  for (i = 0; i < a.length; i++) {
    let vt1 = [];
    let vt2 = [];
    for (j = 0; j < a.length; j++) {
      if (i === j) vt1.push(1.0); else vt1.push(0.0);
      vt2.push(a[i][j]);
    }
    x.push(vt2);
    v.push(vt1);
  }
  //let x = numeric.eye(a.length);

  let b = [];
  let z = [];
  let d = [];
  for (i = 0; i < a.length; i++) {
    b.push(0.0);
    z.push(0.0);
    d.push(0.0);
  }

  tresh = 0.0;

  for (ip = 0; ip < a.length; ip++) {
    d[ip]=x[ip][ip]
    b[ip]=d[ip];
    z[ip]=0.0;
  }

  for (i = 0; i < 500; i++) {

    sm = 0.0;
    for(ip=0; ip < a.length-1; ip++)
      for (iq=ip+1; iq < a.length; iq++) sm += Math.abs(x[ip][iq]);
    if (sm === 0.0) {
       let result = {eigenvectors: v, eigenvalues: d};
       return result;
    }

    for (ip = 0; ip < a.length-1; ip++) {
      for (iq = ip+1; iq < a.length; iq++) {
        g = 100.0*Math.abs(x[ip][iq]);
        if (Math.abs(x[ip][iq]) > tresh) {

          h = d[iq]-d[ip];

          if ((Math.abs(h)+g) === Math.abs(h)) {
	      if (h !== 0.0)
  	        t = (x[ip][iq])/h;
          else t = 0.0;
	      } else {
            if (x[ip][iq] !== 0.0) theta = 0.5*h/x[ip][iq];
	        else theta = 0.0;
            t = 1.0/(Math.abs(theta)+Math.sqrt(1.0+theta*theta));
            if (theta < 0.0) t = -t;
	      }

          c = 1.0/Math.sqrt(1.0+t*t);
          s = t*c;
          tau = s/(1.0+c);
          h = t*x[ip][iq];
          z[ip] -= h;
          z[iq] += h;
          d[ip] -= h;
          d[iq] += h;

          x[ip][iq] = 0.0;
	  for (j = 0; j <= ip-1; j++) {
            g=x[j][ip];
            h=x[j][iq];
            x[j][ip]=g-s*(h+g*tau);
            x[j][iq]=h+s*(g-h*tau);
	  }
          for (j = ip+1; j <= iq-1; j++) {
            g=x[ip][j];
            h=x[j][iq];
            x[ip][j]=g-s*(h+g*tau);
            x[j][iq]=h+s*(g-h*tau);
          }
          for (j = iq+1; j < a.length; j++) {
            g=x[ip][j];
            h=x[iq][j];
            x[ip][j]=g-s*(h+g*tau);
            x[iq][j]=h+s*(g-h*tau);
	      }
          for (j = 0; j < a.length; j++) {
	        g=v[j][ip];
            h=v[j][iq];
            v[j][ip]=g-s*(h+g*tau);
            v[j][iq]=h+s*(g-h*tau);
	      }

        }
      }
      }
      for (ip=0; ip < a.length; ip++) {
	    b[ip] += z[ip];
        d[ip] = b[ip];
	    z[ip] = 0.0;
      }
  }

  console.log("could not solve eigenvectors of matrix in 500 iterations");
  return null;

}


