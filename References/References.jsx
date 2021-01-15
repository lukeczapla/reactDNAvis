import numeric from 'numeric';

let stepM = numeric.identity(4);
let Qhalf = numeric.identity(4);
let bseq = [];
let bvalues = [];
let frames = [];

export const bases = [
        "SEQRES   1 A    1  A\n" +
                "ATOM      1  C1'   A A   1      -2.479   5.346   0.000\n" +
                "ATOM      2  N9    A A   1      -1.291   4.498   0.000\n" +
                "ATOM      3  C8    A A   1       0.024   4.897   0.000\n" +
                "ATOM      4  N7    A A   1       0.877   3.902   0.000\n" +
                "ATOM      5  C5    A A   1       0.071   2.771   0.000\n" +
                "ATOM      6  C6    A A   1       0.369   1.398   0.000\n" +
                "ATOM      7  N6    A A   1       1.611   0.909   0.000\n" +
                "ATOM      8  N1    A A   1      -0.668   0.532   0.000\n" +
                "ATOM      9  C2    A A   1      -1.912   1.023   0.000\n" +
                "ATOM     10  N3    A A   1      -2.320   2.290   0.000\n" +
                "ATOM     11  C4    A A   1      -1.267   3.124   0.000\n" +
                "END",
        "SEQRES   1 A    1  G\n" +
                "ATOM      1  C1'   G A   1      -2.477   5.399   0.000\n" +
                "ATOM      2  N9    G A   1      -1.289   4.551   0.000\n" +
                "ATOM      3  C8    G A   1       0.023   4.962   0.000\n" +
                "ATOM      4  N7    G A   1       0.870   3.969   0.000\n" +
                "ATOM      5  C5    G A   1       0.071   2.833   0.000\n" +
                "ATOM      6  C6    G A   1       0.424   1.460   0.000\n" +
                "ATOM      7  O6    G A   1       1.554   0.955   0.000\n" +
                "ATOM      8  N1    G A   1      -0.700   0.641   0.000\n" +
                "ATOM      9  C2    G A   1      -1.999   1.087   0.000\n" +
                "ATOM     10  N2    G A   1      -2.949   0.139  -0.001\n" +
                "ATOM     11  N3    G A   1      -2.342   2.364   0.001\n" +
                "ATOM     12  C4    G A   1      -1.265   3.177   0.000\n" +
                "END",
        "SEQRES   1 A    1  T\n" +
                "ATOM      1  C1'   T A   1      -2.481   5.354   0.000\n" +
                "ATOM      2  N1    T A   1      -1.284   4.500   0.000\n" +
                "ATOM      3  C2    T A   1      -1.462   3.135   0.000\n" +
                "ATOM      4  O2    T A   1      -2.562   2.608   0.000\n" +
                "ATOM      5  N3    T A   1      -0.298   2.407   0.000\n" +
                "ATOM      6  C4    T A   1       0.994   2.897   0.000\n" +
                "ATOM      7  O4    T A   1       1.944   2.119   0.000\n" +
                "ATOM      8  C5    T A   1       1.106   4.338   0.000\n" +
                "ATOM      9  C7    T A   1       2.466   4.961   0.001\n" +
                "ATOM     10  C6    T A   1      -0.024   5.057   0.000\n" +
                "END",
        "SEQRES   1 A    1  C\n" +
                "ATOM      1  C1'   C A   1      -2.477   5.402   0.000\n" +
                "ATOM      2  N1    C A   1      -1.287   4.523   0.000\n" +
                "ATOM      3  C2    C A   1      -1.477   3.143   0.000\n" +
                "ATOM      4  O2    C A   1      -2.623   2.684   0.001\n" +
                "ATOM      5  N3    C A   1      -0.385   2.335   0.000\n" +
                "ATOM      6  C4    C A   1       0.849   2.855   0.000\n" +
                "ATOM      7  N4    C A   1       1.883   2.020   0.001\n" +
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


export function parseBases() {
  let letters = ["A", "G", "T", "C", "pho"];
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

export const phoRot = [[0.28880532, -0.40811277, -0.8659639, 0.0],
                       [-0.50008344, 0.70707284, -0.50010651, 0.0],
                       [0.81639941, 0.57748763, 0.0, 0.0],
                       [0.0, 0.0, 0.0, 1.0]];

function calculateFrame(ic, isphosphate = false) {
  let uscale = 5.0;
  let u = [[ic[0], ic[1], ic[2]]];
  let v = [[ic[3], ic[4], ic[5]]];
  // scale the coordinates
  u = numeric.mul(u, 0.5/uscale);
  // calculate skew-symmetric matrix related to u
  let uvec = numeric.identity(3);
  uvec[0][0] = 0.0;  uvec[1][1] = 0.0; uvec[2][2] = 0.0;
  uvec[0][1] = -u[0][2]; uvec[0][2] = u[0][1]; uvec[1][2] = -u[0][0];
  uvec = numeric.sub(uvec, numeric.transpose(uvec));

//  console.log(uvec);

  let v1 = numeric.dot(u, numeric.transpose(u))[0][0];

  let upuu = numeric.add(uvec, numeric.dot(uvec, uvec));

  upuu = numeric.mul(upuu, 2.0/(1.0 + v1));
  // calculate the rotation matrix that goes with u
  let Q = numeric.add(numeric.identity(3), upuu);

  // assign it as the 3x3 result portion of 4x4 SE(3) matrix
  let result = numeric.identity(4);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) result[i][j] = Q[i][j];

  let uhalf = numeric.mul(u, uscale*(2.0/(1.0+Math.sqrt(1.0 + numeric.dot(u, numeric.transpose(u))[0][0]))));
  u = numeric.mul(uhalf, 0.5/uscale);

  uvec = numeric.identity(3);
  uvec[0][0] = 0.0;  uvec[1][1] = 0.0; uvec[2][2] = 0.0;
  uvec[0][1] = -u[0][2]; uvec[0][2] = u[0][1]; uvec[1][2] = -u[0][0];
  uvec = numeric.sub(uvec, numeric.transpose(uvec));

//  console.log(numeric.dot(u, numeric.transpose(u)));
  v1 = numeric.dot(u, numeric.transpose(u))[0][0];
  //upuu = numeric.mul(upuu, 2.0/(1.0 + v1));
  upuu = numeric.add(uvec, numeric.dot(uvec, uvec));
  Qhalf = numeric.add(numeric.identity(3), numeric.mul(upuu, 2.0/(1.0+v1)));

  if (isphosphate) {
//    let p__rot = [[0.28880532, -0.40811277, -0.8659639, 0.0],
//                  [-0.50008344, 0.70707284, -0.50010651, 0.0],
//                  [0.81639941, 0.57748763, 0.0, 0.0],
//                  [0.0, 0.0, 0.0, 1.0]];
//    result = numeric.dot(result, numeric.inv(p__rot));
    result[0][3] = v[0][0];
    result[1][3] = v[0][1];
    result[2][3] = v[0][2];

    return result;
  }
  //console.log(JSON.stringify(Qhalf));
  let q = numeric.dot(Qhalf, numeric.transpose(v));
  //let q = numeric.dot(v, Qhalf);
 // console.log(q[0][0]);
  //result[0][3] = v[0][0];
  //result[1][3] = v[0][1];
  //result[2][3] = v[0][2];
  
  result[0][3] = q[0][0]; result[1][3] = q[1][0]; result[2][3] = q[2][0];

  return result;

}


export function calculateQhalf(fra) {
    let uscale = 5.0;
    let trace = fra[0][0]+fra[1][1]+fra[2][2];
//    let q = [[fra[0][3]], [fra[1][3]], [fra[2][3]]];
    let a = [[fra[2][1]-fra[1][2]], [fra[0][2]-fra[2][0]], [fra[1][0]-fra[0][1]]];
    let u = numeric.mul(a, uscale*(2.0/(trace+1.0)));
    u = numeric.mul(u, 0.5/uscale);
    let v1 = numeric.dot(numeric.transpose(u), u)[0];
    let uhalf = numeric.mul(u, uscale*2.0/(1.0+Math.sqrt(1.0+v1)));
    u = numeric.mul(uhalf, 0.5/uscale);
    let uvec = numeric.identity(3);
    uvec[0][0] = 0.0;  uvec[1][1] = 0.0; uvec[2][2] = 0.0;
    uvec[0][1] = -u[0][2]; uvec[0][2] = u[0][1]; uvec[1][2] = -u[0][0];
    uvec = numeric.sub(uvec, numeric.transpose(uvec));

    v1 = numeric.dot(numeric.transpose(u), u)[0];
    let upuu = numeric.add(uvec, numeric.dot(uvec, uvec));

    return numeric.add(numeric.identity(3), numeric.mul(upuu, 2.0/(1.0+v1)));
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


function complement(s, rna) {
    let result = "";
    if (s.charAt(1) === 'C')  result = "G";
    if (s.charAt(1) === 'T' || s.charAt(1) === 'U') result = "A";
    if (s.charAt(1) === 'G')  result = "C";
    if (s.charAt(1) === 'A') {
      if (rna === undefined || rna === false) result = "T"; else result = 'U';
    }
    if (s.charAt(0) === 'C')  result += "G";
    if (s.charAt(0) === 'T' || s.charAt(0) === 'U') result += "A";
    if (s.charAt(0) === 'G')  result += "C";
    if (s.charAt(0) === 'A') {
        if (rna === undefined || rna === false) result += "T";
        else result += "U";
    }
    return result;
}


export function get30Coordinates(ic, step, saveState = false) {

//    if (Ai === undefined)
//      let A = numeric.identity(4);
//    else
//      let A = Ai;
	if (saveState) frames = [];
    let A = numeric.identity(4);
    let bfra = calculateFrame(ic.slice(0, 6)); // first pairing pars
    if (saveState) console.log(JSON.stringify(bfra));

	let eig = jeigen(bfra);
	let Asqrt = numeric.identity(4);
	for (let i = 0; i < 4; i++) {
		Asqrt[i][i] = Math.sqrt(eig.eigenvalues[i]);
	}
	let res = numeric.dot(numeric.dot(eig.eigenvectors, Asqrt), numeric.inv(eig.eigenvectors));
	if (saveState) {
		console.log(JSON.stringify(numeric.dot(Qhalf, Qhalf)));
		console.log(JSON.stringify(bfra));
	}
    bfra[0][3] = -ic[3] / 2.0;
    bfra[1][3] = -ic[4] / 2.0;
    bfra[2][3] = -ic[5] / 2.0;
    Qhalf = numeric.transpose(Qhalf);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      bfra[i][j] = Qhalf[i][j];
    }
    // bfra is now in the middle

    let crick = numeric.dot(A, bfra)
    let watson = numeric.dot(crick, calculateFrame(ic.slice(0, 6)));
    crick[0][1] *= -1; crick[1][1] *= -1; crick[2][1] *= -1; crick[0][2] *= -1; crick[1][2] *= -1; crick[2][2] *= -1;
    if (saveState) {
    	frames.push(watson);
    	frames.push(crick);
	}

    // send true to use phoRotation matrix
    let phoC = numeric.dot(crick, calculateFrame(ic.slice(6, 12), true));
    if (saveState) frames.push(phoC);

    // let's get the middle frame
    if (saveState) {
      stepM = numeric.add(calculateFrame(ic.slice(12, 18)), numeric.identity(4));
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
        stepM[i][j] = Qhalf[i][j];
      }
      stepM[0][3] = stepM[0][3] / 2.0;
      stepM[1][3] = stepM[1][3] / 2.0;
      stepM[2][3] = stepM[2][3] / 2.0;
      //console.log(JSON.stringify(stepM));
      frames.push(calculateFrame(ic.slice(12, 18)));
    }
    A = numeric.dot(numeric.identity(4), calculateFrame(ic.slice(12, 18)));
    

    bfra = calculateFrame(ic.slice(24, 30));
    
    bfra[0][3] = -ic[27] / 2.0;
    bfra[1][3] = -ic[28] / 2.0;
    bfra[2][3] = -ic[29] / 2.0;
    Qhalf = numeric.transpose(Qhalf);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      bfra[i][j] = Qhalf[i][j];
    }
    let crick2 = numeric.dot(A, bfra);
    let watson2 = numeric.dot(crick2, calculateFrame(ic.slice(24, 30)));
    crick2[0][1] *= -1; crick2[1][1] *= -1; crick2[2][1] *= -1; crick2[0][2] *= -1; crick2[1][2] *= -1; crick2[2][2] *= -1;
    if (saveState) {
		frames.push(watson2);
		frames.push(crick2);
	}

    let phoW = numeric.dot(watson2, calculateFrame(ic.slice(18, 24), true));
    if (saveState) frames.push(phoW);

    let strW1 = step[1];
    let strW2 = step[2];

    let strC1 = complement(step[1], false);
    let strC2 = complement(step[2], false);

    let W1 = [];
    let W2 = [];
    let C1 = [];
    let C2 = [];
    let P1 = [];
    let P2 = [];

  //  console.log(strW1+strC1+ " " + strW2 + strC2);

    let ldict = parseBases();
  //  console.log(strW1+strW2+"*"+strC1+strC2);
    W1 = [...ldict[strW1]];
    W2 = [...ldict[strW2]];
    C1 = [...ldict[strC1]];
    C2 = [...ldict[strC2]];
    P1 = [...ldict["pho"]];
    P2 = [...ldict["pho"]];

    let current = 1;
    let result = [];
    //let refs = [watson, crick, watson2, crick2, phoC, phoW];
    //console.log(refs);
    let values = [];
    let bletters = [strW1, "pho", strW2, strC2, "pho", strC1];
    [W1, P1, W2, C2, P2, C1].forEach(function(element) {
        let ref = [];
        if (current === 1) ref = watson;
        if (current === 2) ref = phoW;
        if (current === 3) ref = watson2;
        if (current === 4) ref = crick2;
        if (current === 5) ref = phoC;
        if (current === 6) ref = crick;
        if (saveState) console.log(JSON.stringify(ref));
      //  console.log(ref);
		let set = [];
        for (let i = 0; i < element.length; i++) {
            let toAdd = {...element[i]};
            let toPush = {...element[i]};
            let valx = toAdd.x;
            let valy = toAdd.y;
            let valz = toAdd.z;
            toAdd.x = ref[0][3]+ref[0][0]*valx+ref[0][1]*valy+ref[0][2]*valz;
            toAdd.y = ref[1][3]+ref[1][0]*valx+ref[1][1]*valy+ref[1][2]*valz;
            toAdd.z = ref[2][3]+ref[2][0]*valx+ref[2][1]*valy+ref[2][2]*valz;
            toPush.x = toAdd.x;
            toPush.y = toAdd.y;
            toPush.z = toAdd.z;

            result.push(toAdd);
	     	set.push(toPush);
            //console.log(element[i].z);
        }
		values.push(set);
        current++;
    });
    if (saveState) {
    	bvalues = values;
    	bseq = bletters;
    }
    return result;
//    return [W1, C1, W2, C2, P1, P2];  // from before
}

export function getAtomSets() {
    return {
      atoms: bvalues,
      letters: bseq
    };
}

export function getMidBasis() {
    return stepM;
}


function numN(val, N) {
	let str = ""+val;
	if (str.length >= N) return str;
	while (str.length < N) str = " " + str;
	return str;
}

function numN2(val, N) {
	let str = ""+val;
	if (str.length >= N) return str;
	while (str.length < N) str = str + " ";
	return str;
}

export function getMidFrame() {
	return stepM;
}

export function scale(t1, t2, t3) {
	t1 *= 11.4591559; t2 *= 11.4591559; t3 *= 11.4591559;
	let th = Math.sqrt(t1*t1+t2*t2+t3*t3);
	let r = Math.PI*th/180.0;
	let r2 = r/2.0;
	//console.log(r2/Math.tan(r2));
	return r2/Math.tan(r2);
}

export function writePDB() {
	let data = getAtomSets();
	let letters = data.letters;
	let line = "ATOM      1  P     A A   1       0.000   0.000   0.000 ";
	let atom = 1;
	let result = "";
	//console.log(letters);
	Object.keys(data.atoms).forEach((key, index) => {
		//if (index >= 4) return;
		for (let i = 0; i < data.atoms[key].length; i++) {
		  let res = index+1;
		  if (index >= 2) res--;
		  if (index >= 5) res--;
		  let resname = letters[key].charAt(0);
		  if (index === 1 || index === 4) {
		    if (data.atoms[key][i].name === "O3'") {
		      resname = letters[index-1].charAt(0);
		      res--;
		    } else resname = letters[index+1].charAt(0);
		  }
		  line = "ATOM  " + numN(atom, 5) + "  " + numN2(data.atoms[key][i].name, 3) + "   " + resname + " " + (index < 3 ? "A": "B") + "   " + res + "     " + numN(data.atoms[key][i].x.toFixed(3), 7) + " " + numN(data.atoms[key][i].y.toFixed(3), 7) + " " + numN(data.atoms[key][i].z.toFixed(3), 7) + " ";
		  atom++;
		  result += line + "\n";
		 }
	});
	result += "END\n";
	return result;
}

export function getFrames() {
	return frames;
}


