import numeric from 'numeric';

/*
export const bases = [
            "SEQRES   1 A    1  A\n" +
                    "ATOM      2  N9    A A   1      -1.291   4.498   0.001\n" +
                    "ATOM      3  C8    A A   1       0.024   4.897  -0.001\n" +
                    "ATOM      4  N7    A A   1       0.877   3.902   0.001\n" +
                    "ATOM      5  C5    A A   1       0.071   2.771  -0.001\n" +
                    "ATOM      6  C6    A A   1       0.369   1.398   0.001\n" +
                    "ATOM      8  N1    A A   1      -0.668   0.532  -0.001\n" +
                    "ATOM      9  C2    A A   1      -1.912   1.023   0.001\n" +
                    "ATOM     10  N3    A A   1      -2.320   2.290  -0.001\n" +
                    "ATOM     11  C4    A A   1      -1.267   3.124   0.001\n" +
                    "END",
            "SEQRES   1 A    1  G\n" +
                    "ATOM      2  N9    G A   1      -1.289   4.551  -0.001\n" +
                    "ATOM      3  C8    G A   1       0.023   4.962   0.001\n" +
                    "ATOM      4  N7    G A   1       0.870   3.969  -0.001\n" +
                    "ATOM      5  C5    G A   1       0.071   2.833   0.001\n" +
                    "ATOM      6  C6    G A   1       0.424   1.460  -0.001\n" +
                    "ATOM      8  N1    G A   1      -0.700   0.641   0.001\n" +
                    "ATOM      9  C2    G A   1      -1.999   1.087  -0.001\n" +
                    "ATOM     11  N3    G A   1      -2.342   2.364   0.001\n" +
                    "ATOM     12  C4    G A   1      -1.265   3.177  -0.001\n" +
                    "END",
            "SEQRES   1 A    1  T\n" +
                    "ATOM      2  N1    T A   1      -1.284   4.500  -0.001\n" +
                    "ATOM      3  C2    T A   1      -1.462   3.135   0.001\n" +
                    "ATOM      5  N3    T A   1      -0.298   2.407  -0.001\n" +
                    "ATOM      6  C4    T A   1       0.994   2.897   0.001\n" +
                    "ATOM      8  C5    T A   1       1.106   4.338  -0.001\n" +
                    "ATOM     10  C6    T A   1      -0.024   5.057   0.001\n" +
                    "END",
            "SEQRES   1 A    1  C\n" +
                    "ATOM      2  N1    C A   1      -1.285   4.542   0.001\n" +
                    "ATOM      3  C2    C A   1      -1.472   3.158  -0.001\n" +
                    "ATOM      5  N3    C A   1      -0.391   2.344   0.001\n" +
                    "ATOM      6  C4    C A   1       0.837   2.868  -0.001\n" +
                    "ATOM      8  C5    C A   1       1.056   4.275   0.001\n" +
                    "ATOM      9  C6    C A   1      -0.023   5.068  -0.001\n" +
                    "END",
		    "SEQRES   1 A    1  A\n" +
				    "ATOM      1  O3'   A A   1       0.000  -0.929  -1.315\n" +
		            "ATOM      2  P     A A   1       0.000   0.000   0.000\n" +
		            "ATOM      3  OP1   A A   1      -1.208   0.854  -0.000\n" +
		            "ATOM      4  OP2   A A   1       1.208   0.854   0.000\n" +
		            "ATOM      5  O5'   A A   1       0.000  -0.930   1.315\n" +
		            "END"
    ];
*/

export const bases = [
        "SEQRES   1 A    1  A\n" +
             //   "ATOM      1  C1'   A A   1      -2.479   5.346   0.000\n" +
                "ATOM      2  N9    A A   1      -1.291   4.498   0.000\n" +
                "ATOM      3  C8    A A   1       0.024   4.897   0.000\n" +
                "ATOM      4  N7    A A   1       0.877   3.902   0.000\n" +
                "ATOM      5  C5    A A   1       0.071   2.771   0.000\n" +
                "ATOM      6  C6    A A   1       0.369   1.398   0.000\n" +
               // "ATOM      7  N6    A A   1       1.611   0.909   0.000\n" +
                "ATOM      8  N1    A A   1      -0.668   0.532   0.000\n" +
                "ATOM      9  C2    A A   1      -1.912   1.023   0.000\n" +
                "ATOM     10  N3    A A   1      -2.320   2.290   0.000\n" +
                "ATOM     11  C4    A A   1      -1.267   3.124   0.000\n" +
                "END",
        "SEQRES   1 A    1  G\n" +
              //  "ATOM      1  C1'   G A   1      -2.477   5.399   0.000\n" +
                "ATOM      2  N9    G A   1      -1.289   4.551   0.000\n" +
                "ATOM      3  C8    G A   1       0.023   4.962   0.000\n" +
                "ATOM      4  N7    G A   1       0.870   3.969   0.000\n" +
                "ATOM      5  C5    G A   1       0.071   2.833   0.000\n" +
                "ATOM      6  C6    G A   1       0.424   1.460   0.000\n" +
               // "ATOM      7  O6    G A   1       1.554   0.955   0.000\n" +
                "ATOM      8  N1    G A   1      -0.700   0.641   0.000\n" +
                "ATOM      9  C2    G A   1      -1.999   1.087   0.000\n" +
                "ATOM     10  N2    G A   1      -2.949   0.139  -0.001\n" +
                "ATOM     11  N3    G A   1      -2.342   2.364   0.001\n" +
                "ATOM     12  C4    G A   1      -1.265   3.177   0.000\n" +
                "END",
        "SEQRES   1 A    1  T\n" +
             //   "ATOM      1  C1'   T A   1      -2.481   5.354   0.000\n" +
                "ATOM      2  N1    T A   1      -1.284   4.500   0.000\n" +
                "ATOM      3  C2    T A   1      -1.462   3.135   0.000\n" +
             //   "ATOM      4  O2    T A   1      -2.562   2.608   0.000\n" +
                "ATOM      5  N3    T A   1      -0.298   2.407   0.000\n" +
                "ATOM      6  C4    T A   1       0.994   2.897   0.000\n" +
             //   "ATOM      7  O4    T A   1       1.944   2.119   0.000\n" +
                "ATOM      8  C5    T A   1       1.106   4.338   0.000\n" +
            //    "ATOM      9  C7    T A   1       2.466   4.961   0.001\n" +
                "ATOM     10  C6    T A   1      -0.024   5.057   0.000\n" +
                "END",
        "SEQRES   1 A    1  C\n" +
             //   "ATOM      1  C1'   C A   1      -2.477   5.402   0.000\n" +
                "ATOM      2  N1    C A   1      -1.287   4.523   0.000\n" +
                "ATOM      3  C2    C A   1      -1.477   3.143   0.000\n" +
           //     "ATOM      4  O2    C A   1      -2.623   2.684   0.001\n" +
                "ATOM      5  N3    C A   1      -0.385   2.335   0.000\n" +
                "ATOM      6  C4    C A   1       0.849   2.855   0.000\n" +
         //       "ATOM      7  N4    C A   1       1.883   2.020   0.001\n" +
                "ATOM      8  C5    C A   1       1.065   4.271   0.000\n" +
                "ATOM      9  C6    C A   1      -0.038   5.062   0.000\n" +
                "END",
        "SEQRES   1 A    1  A\n" +
		        "ATOM      1  O3'   A A   1       0.000  -0.929  -1.315\n" +
                "ATOM      2  P     A A   1       0.000   0.000   0.000\n" +
                "ATOM      3  OP1   A A   1      -1.208   0.854  -0.000\n" +
                "ATOM      4  OP2   A A   1       1.208   0.854   0.000\n" +
                "ATOM      5  O5'   A A   1       0.000  -0.930   1.315\n" +
                "END"
];


let midFrame = [];
    
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

    if (gamma === 0.0) omega = -Math.atan2(A[0][1],A[1][1]);
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

function centroid(vec) {
	let x = 0.0, y = 0.0, z = 0.0;
	for (let i = 0; i < vec.length; i++) {
		x += vec[i][0];
		y += vec[i][1];
		z += vec[i][2];
	}
	return [x/vec.length, y/vec.length, z/vec.length];
}

// copy 2D array
function clone(vec) {
	let result = [];
	result.length = vec.length;
	for (let i = 0; i < vec.length; i++) {
	  result[i] = [];
	  result[i].length = vec[i].length;
	  for (let j = 0; j < vec[i].length; j++) {
	    result[i][j] = vec[i][j];
	  }
	}
	return result;
}

function translate(val, points) {

  for (let i = 0; i < points.length; i++) {
  	points[i][0] += val[0];
  	points[i][1] += val[1];
  	points[i][2] += val[2];
  }

}

function superposition(fixed, moved) {
	let cena = centroid(fixed);
	let cenb = centroid(moved);
	cena[0] = -cena[0]; cena[1] = -cena[1]; cena[2] = -cena[2];
	cenb[0] = -cenb[0]; cenb[1] = -cenb[1]; cenb[2] = -cenb[2];

    let a = clone(fixed);
    translate(cena, a);

    let b = clone(moved);
    translate(cenb, b);

    let corr = numeric.dot(numeric.transpose(b), a);
	
    let svd = numeric.svd(corr);
    let u = clone(svd.U);
    let u_trans = numeric.transpose(u);
    let vt = clone(svd.V);
    let vt_orig = clone(svd.V);
    let rot_notrans = numeric.dot(vt, u_trans);
    let rot = numeric.transpose(rot_notrans)
    let det = numeric.det(rot);
    let cb_tmp;
    if (det < 0) {
    	console.log("det < 0");
    	vt = vt_orig;
    	vt[2][0] = -vt[2][0];
    	vt[2][1] = -vt[2][1];
    	vt[2][2] = -vt[2][2];
		cb_tmp = numeric.transpose(vt);	
		rot_notrans = numeric.dot(cb_tmp, u_trans);
		rot = numeric.transpose(rot_notrans);
    }
    
    cb_tmp = numeric.dot([cenb], rot);
    let trans = [cena[0] - cb_tmp[0][0], cena[1]-cb_tmp[0][1], cena[2] - cb_tmp[0][2]];
    console.log(JSON.stringify(rot));
    console.log(JSON.stringify(trans));
    let result = [];
    result.length = 4;
    //
    rot = numeric.transpose(rot);
    result[0] = [rot[0][0], rot[0][1], rot[0][2], -trans[0]];
    result[1] = [rot[1][0], rot[1][1], rot[1][2], -trans[1]];
    result[2] = [rot[2][0], rot[2][1], rot[2][2], -trans[2]];
    result[3] = [0.0, 0.0, 0.0, 1.0];
    console.log(JSON.stringify(result));
    return result;
}

export function fitFrames(x) {
	let atoms = x.atoms;
	if (atoms.length === 0) return;
	let letters = x.letters;
	let bases = parseBases();
	console.log(letters);
	console.log(bases);
	let W1 = [], W2 = [], C1 = [], C2 = [];
	let rW1 = [], rW2 = [], rC1 = [], rC2 = [];
	console.log(atoms[0].length);
	console.log(bases[letters[0]].length);
	console.log(letters[0] + letters[2] + letters[3] + letters[5]);
	for (let i = 0; i < atoms[0].length; i++) {
		for (let j = 0; j < bases[letters[0]].length; j++) {
		  if (atoms[0][i].name === bases[letters[0]][j].name) {
 		    W1.push([atoms[0][i].x, atoms[0][i].y, atoms[0][i].z]);
		    rW1.push([bases[letters[0]][j].x, bases[letters[0]][j].y, bases[letters[0]][j].z]);
		  }
		} 
	}
	for (let i = 0; i < atoms[2].length; i++) {
		for (let j = 0; j < bases[letters[2]].length; j++) {
		  if (atoms[2][i].name === bases[letters[2]][j].name) {
 		    W2.push([atoms[2][i].x, atoms[2][i].y, atoms[2][i].z]);
		    rW2.push([bases[letters[2]][j].x, bases[letters[2]][j].y, bases[letters[2]][j].z]);
		  }
		}
	}

	for (let i = 0; i < atoms[3].length; i++) {
		for (let j = 0; j < bases[letters[3]].length; j++) {
		  if (atoms[3][i].name === bases[letters[3]][j].name) {
 		    C2.push([atoms[3][i].x, atoms[3][i].y, atoms[3][i].z]);
		    rC2.push([bases[letters[3]][j].x, bases[letters[3]][j].y, bases[letters[3]][j].z]);
		  }
		} 
	}

	for (let i = 0; i < atoms[5].length; i++) {
		for (let j = 0; j < bases[letters[5]].length; j++) {
		  if (atoms[5][i].name === bases[letters[5]][j].name) {
 		    C1.push([atoms[5][i].x, atoms[5][i].y, atoms[5][i].z]);
		    rC1.push([bases[letters[5]][j].x, bases[letters[5]][j].y, bases[letters[5]][j].z]);
		  }
		} 
	}

	let result = [superposition(W1, rW1), superposition(C1, rC1), superposition(W2, rW2), superposition(C2, rC2)];
    console.log(JSON.stringify(result));
    return result;
	
}

function setRow(matrix, row, val) {
	for (let i = 0; i < val.length; i++) {
		matrix[row][i] = val[i];
	}
}

function setColumn(matrix, col, val) {
	for (let i = 0; i < val.length; i++) {
		matrix[i][col] = val[i];
	}
}

function removeComponent(m1, m2) {
	let dot = 0.0;
	let result = [];
	result.length = m1.length;
	for (let i = 0; i < m1.length; i++) {
		dot += m1[i]*m2[i];
	}
	for (let i = 0; i < m1.length; i++) {
		result[i] = m1[i] - dot*m2[i];
	}
	
	return result;
	
}

export function getBasePlanes(x) {
	//console.log(x);
	let frames = fitFrames(x);
	if (!frames) return;
	//console.log(JSON.stringify(frames));
	let ref1 = clone(frames[0]);
	let ref2 = clone(frames[1]);
	
	let temp = clone(ref1);
	let temp2 = clone(ref1);
	let y2 = [ref2[0][1], ref2[1][1], ref2[2][1]];
	let z1 = [ref1[0][2], ref1[1][2], ref1[2][2]];
	// known as z3 in java code
	let z2 = [ref2[0][2], ref2[1][2], ref2[2][2]];
	if (z1[0]*z2[0] + z1[1]*z2[1] + z1[2]*z2[2] < 0.0) {
		for (let i = 0; i < 3; i++) {
			y2[i] = -y2[i];
			z2[i] = -z2[i];
		}
		setColumn(ref2, 1, y2);
		setColumn(ref2, 2, z2);
	}
	
	temp = numeric.add(temp, ref2);
	temp = numeric.mul(0.5, temp);
	let test = [[temp[0][0], temp[0][1], temp[0][2]], [temp[1][0], temp[1][1], temp[1][2]], [temp[2][0], temp[2][1], temp[2][2]]];
	let testsvd = numeric.svd(test);
	let Q = numeric.dot(testsvd.U, numeric.transpose(testsvd.V));
	let x2 = [temp[0][0], temp[1][0], temp[2][0]];
	y2 = [temp[0][1], temp[1][1], temp[2][1]];
	z2 = [temp[0][2], temp[1][2], temp[2][2]];
	x2 = removeComponent(x2, y2);
	x2 = removeComponent(x2, z2);
	y2 = removeComponent(y2, z2);


	//temp[0][0] = x2[0]; temp[1][0] = x2[1]; temp[2][0] = x2[2];
	//temp[0][1] = y2[0]; temp[1][1] = y2[1]; temp[2][1] = y2[2];
	//temp[0][2] = z2[0]; temp[1][2] = z2[1]; temp[2][2] = z2[2];
    temp[0][0] = Q[0][0]; temp[1][0] = Q[1][0]; temp[2][0] = Q[2][0];
	temp[0][1] = Q[0][1]; temp[1][1] = Q[1][1]; temp[2][1] = Q[2][1];
	temp[0][2] = Q[0][2]; temp[1][2] = Q[1][2]; temp[2][2] = Q[2][2];


	for (let i = 0; i < 3; i++) {
		let r = Math.sqrt(temp[0][i]*temp[0][i] + temp[1][i]*temp[1][i] + temp[2][i]*temp[2][i]);
		temp[0][i] /= r; temp[1][i] /= r; temp[2][i] /= r;
	}

	let pairingParameters = calculatetp(numeric.dot(numeric.inv(ref2), temp2));
	console.log("Pairing Parameters:");
	console.log(pairingParameters);
	let result = [0, 0];
	result[0] = clone(temp);
	
	ref1 = clone(frames[2]);
	ref2 = clone(frames[3]);
	
	temp = clone(ref1);
	temp2 = clone(ref1);
	y2 = [ref2[0][1], ref2[1][1], ref2[2][1]];
	// known as z3 in java code
	z2 = [ref2[0][2], ref2[1][2], ref2[2][2]];
	z1 = [ref1[0][2], ref1[1][2], ref1[2][2]];
	if (z1[0]*z2[0] + z1[1]*z2[1] + z1[2]*z2[2] < 0.0) {
		for (let i = 0; i < 3; i++) {
			y2[i] = -y2[i];
			z2[i] = -z2[i];
		}
		setColumn(ref2, 1, y2);
		setColumn(ref2, 2, z2);
	}
	
	temp = numeric.add(temp, ref2);
	temp = numeric.mul(0.5, temp);
	//console.log(temp);
	test = [[temp[0][0], temp[0][1], temp[0][2]], [temp[1][0], temp[1][1], temp[1][2]], [temp[2][0], temp[2][1], temp[2][2]]];
	testsvd = numeric.svd(test);
	Q = numeric.dot(testsvd.U, numeric.transpose(testsvd.V));
	x2 = [temp[0][0], temp[1][0], temp[2][0]];
	y2 = [temp[0][1], temp[1][1], temp[2][1]];
	z2 = [temp[0][2], temp[1][2], temp[2][2]];
	x2 = removeComponent(x2, y2);
	x2 = removeComponent(x2, z2);
	y2 = removeComponent(y2, z2);
	
	//temp[0][0] = x2[0]; temp[1][0] = x2[1]; temp[2][0] = x2[2];
	//temp[0][1] = y2[0]; temp[1][1] = y2[1]; temp[2][1] = y2[2];
	//temp[0][2] = z2[0]; temp[1][2] = z2[1]; temp[2][2] = z2[2];
    temp[0][0] = Q[0][0]; temp[1][0] = Q[1][0]; temp[2][0] = Q[2][0];
	temp[0][1] = Q[0][1]; temp[1][1] = Q[1][1]; temp[2][1] = Q[2][1];
	temp[0][2] = Q[0][2]; temp[1][2] = Q[1][2]; temp[2][2] = Q[2][2];

	for (let i = 0; i < 3; i++) {
		let r = Math.sqrt(temp[0][i]*temp[0][i] + temp[1][i]*temp[1][i] + temp[2][i]*temp[2][i]);
		temp[0][i] /= r; temp[1][i] /= r; temp[2][i] /= r;
	}

	pairingParameters = calculatetp(numeric.dot(numeric.inv(ref2), temp2));
	console.log("Pairing Parameters:");
	console.log(pairingParameters);
	result[1] = clone(temp);	
	let stepParameters = calculatetp(numeric.dot(numeric.inv(result[0]), result[1]));
	console.log("Step Parameters:");
	console.log(stepParameters);
	midFrame = calculateM(stepParameters);
	console.log(JSON.stringify(midFrame));
	return result;

}

export function testSuperposition() {
	let points = [[0, 0, 0], [2,0,0], [0,2,0]];
	let ref = [[0, 0, 2], [0, 2, 2], [2,0,2]];
	console.log(superposition(points, ref));
	return(superposition(points, ref));
}

export function midFrameTest(P, A1, A2) {
	let A = numeric.dot(numeric.inv(A1), A2);
	let steps = calculatetp(A);
	let basis = calculateM(steps);
	
	let x_p = P[0] - basis[0][3];
	let y_p = P[1] - basis[1][3];
	let z_p = P[2] - basis[2][3];
	
	let xp = x_p * basis[0][0] + y_p * basis[1][0] + z_p * basis[2][0];
	let yp = x_p * basis[0][1] + y_p * basis[1][1] + z_p * basis[2][1];
	let zp = x_p * basis[0][2] + y_p * basis[1][2] + z_p * basis[2][2];

	
	return [xp, yp, zp];
}


