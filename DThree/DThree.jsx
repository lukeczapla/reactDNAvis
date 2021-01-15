import './DThree.css';
import React, {Component} from 'react';
import * as trois from 'three';
import numeric from 'numeric';
import Eigenvector from './Eigenvector.jsx';
import * as ref from '../References/References.jsx';
import * as ref3 from '../References/References3DNA.jsx';

class DThree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modeNum : '0',
      showIC: false,
      isDragging: false,
      useScale: true,
      parameters3: [],
      phoW: [0,0,0],
      phoC: [0,0,0],
      startX: 0,
      startY: 0,
      translateX: 0,
      translateY: 0,
      lastTranslateX: 0,
      lastTranslateY: 0,
      evalue: '',
      midVal: '',
      mean: props.mean,
      cov: props.cov,
      tetramer: props.tetramer,
      eigenvalues: [],
      eigenvectors: [],
      eigenlist: [],
      pdbText: ''
    };
    this.scene = null;
    this.camera = null;
    this.renderer = null;
  }

 onMouseMove = ({clientX, clientY}) => {
   if (!this.state.isDragging) return;
   this.setState({
     translateX: clientX - this.state.startX + this.state.lastTranslateX,
     translateY: clientY - this.state.startY + this.state.lastTranslateY
   });
 };

 onMouseUp = ({clientX, clientY}) => {
   this.mount.removeEventListener('mousemove', this.onMouseMove);
   this.mount.removeEventListener('mouseup', this.onMouseUp);
   this.setState({
     lastTranslateX: this.state.translateX,
     lastTranslateY: this.state.translateY,
     startX: 0,
     startY: 0,
     isDragging: false
   });
 };

 onMouseDown = ({clientX,  clientY}) => {
   this.mount.addEventListener('mousemove', this.onMouseMove);
   this.mount.addEventListener('mouseup', this.onMouseUp);
   //console.log(event);
   this.setState({
     startX: clientX,
     startY: clientY,
     isDragging: true
   });
 };

 componentWillUnmount() {
   this.mount.removeEventListener('mousemove', this.onMouseMove);
   this.mount.removeEventListener('mouseup', this.onMouseUp);
   this.mount.removeEventListener('mousedown', this.onMouseDdown);
 }

 componentDidMount() {
    //console.log(ref.parseBases());
    let cov = this.state.cov;
    //console.log(cov);
    let F = numeric.inv(cov);
    let eigen = ref.jeigen(F);
    //console.log(eigen);
    let eigenlist = [];
    eigen.eigenvalues.forEach((item, index) => {
	let val = {index: index, value: item};
	eigenlist.push(val);
    });
    eigenlist.sort((a, b) => (a.value > b.value ? 1 : -1));
    let modeN = eigenlist[0].index + '';
    this.setState({evalue: eigen.eigenvalues[parseInt(modeN)],
    eigenvalues: eigen.eigenvalues, eigenvectors: eigen.eigenvectors, eigenlist: eigenlist, modeNum: modeN});
    let demo = this.state.mean;
    let points = ref.get30Coordinates(demo, this.state.tetramer, true);
    let PhoW = ref.getAtomSets().atoms[1][1];
    let PhoC = ref.getAtomSets().atoms[4][1];
    ref3.getBasePlanes(ref.getAtomSets());
    let midframe = ref.getMidFrame();
    let px = PhoW.x - midframe[0][3];
    let py = PhoW.y - midframe[1][3];
    let pz = PhoW.z - midframe[2][3];
	let pw = [
		px*midframe[0][0]+py*midframe[1][0]+pz*midframe[2][0],
		px*midframe[0][1]+py*midframe[1][1]+pz*midframe[2][1],
		px*midframe[0][2]+py*midframe[1][2]+pz*midframe[2][2]
	];
    px = PhoC.x - midframe[0][3];
    py = PhoC.y - midframe[1][3];
    pz = PhoC.z - midframe[2][3];	
    let pc = [
    	px*midframe[0][0]+py*midframe[1][0]+pz*midframe[2][0],
		px*midframe[0][1]+py*midframe[1][1]+pz*midframe[2][1],
		px*midframe[0][2]+py*midframe[1][2]+pz*midframe[2][2]
	];
	this.setState({
		phoW: pw, 
		phoC: pc, 
		parameters3: ref3.getParameters(),
		pdbText: ref.writePDB()
	});
    //console.log(points);
    document.body.style.backgroundColor = "white";
    this.scene = new trois.Scene();
    this.scene.background = new trois.Color( 0xffffff );
    this.camera = new trois.OrthographicCamera(-20, 20, 20, -20, -40, 500);
    this.scene.add(this.camera);
    this.renderer = new trois.WebGLRenderer();
    this.renderer.setSize(600, 600);
//    this.renderer.setSize( window.innerWidth, window.innerHeight);
    this.mount.appendChild(this.renderer.domElement);
    this.mount.addEventListener('mousedown', this.onMouseDown);

    this.camera.zoom = 1.0;

    let avgx=0.0, avgy=0.0, avgz=0.0;
    for (let i = 0; i < points.length; i++) {
      avgx += points[i].x;
      avgy += points[i].y;
      avgz += points[i].z;
    }
    avgx /= points.length; avgy /= points.length; avgz /= points.length;
    let spheres = [];
    let val = '';
    points.forEach((atom) => {
      //  console.log(atom);
        let geometry = new trois.SphereGeometry(1.4, 10, 10, 10);
        let color = 0xAA00AA;
        if (atom.name.charAt(0) === 'O') color = 0xCC0000;
        if (atom.name.charAt(0) === 'C') color = 0x777777;
        if (atom.name.charAt(0) === 'N') color = 0x0000CC;

	if (atom.name === 'P') {
		let px = atom.x - ref.getMidBasis()[0][3];
		let py = atom.y - ref.getMidBasis()[1][3];
		let pz = atom.z - ref.getMidBasis()[2][3];
		let pxx = px*ref.getMidBasis()[0][0] + py*ref.getMidBasis()[1][0] + pz*ref.getMidBasis()[2][0];
                let pyy = px*ref.getMidBasis()[0][1] + py*ref.getMidBasis()[1][1] + pz*ref.getMidBasis()[2][1];
                let pzz = px*ref.getMidBasis()[0][2] + py*ref.getMidBasis()[1][2] + pz*ref.getMidBasis()[2][2];
		val += pxx + ", " + pyy + ", " + pzz + " ... ";
	}

        let material = new trois.MeshLambertMaterial({color: color});
        let sphere = new trois.Mesh(geometry, material);
        sphere.position.set(atom.x-avgx, atom.y-avgy, atom.z-avgz);
        this.scene.add(sphere);
        spheres.push(sphere);
    });
    this.setState({ midVal: val });
    const light1 = new trois.PointLight( 0xffffff, 5, 200 );
    light1.position.set(0, 0, 50);
    this.scene.add(light1);
    const light2 = new trois.PointLight( 0xffffff, 5, 200 );
    light2.position.set(0, 0, -50);
    this.scene.add(light2);

    let angle = 0;
    //his.camera.position.z = 0.0;
    this.camera.position.x = 20.0*Math.cos(angle);
    this.camera.position.z = 20.0*Math.sin(angle);

    this.camera.lookAt(0.0, 0.0, 0.0);

    let scale = 1/Math.sqrt(eigen.eigenvalues[parseInt(modeN)]);
    let x = 0;
    let dir = 1;
    const animate = () => {
      if (this.state.useScale) scale = 1.0/Math.sqrt(eigen.eigenvalues[parseInt(this.state.modeNum)]);
      else scale = 1.0;
      let icnew = numeric.add(demo, numeric.mul(x/50*scale, eigen.eigenvectors[parseInt(this.state.modeNum)]));
      let points = ref.get30Coordinates(icnew, this.state.tetramer, false);
      let i = 0;
      points.forEach((atom) => {
        spheres[i].position.set(atom.x-avgx, atom.y-avgy, atom.z-avgz);
        i++;
      })
      //this.camera.position.x = 5*Math.cos(angle);
      //this.camera.position.y = 5*Math.sin(angle);
      let theta = this.state.translateX / 100.0; let phi = -this.state.translateY / 100.0;
      this.camera.position.x = 30.0*Math.cos(theta)*Math.cos(phi);
      this.camera.position.z = 30.0*Math.sin(theta)*Math.cos(phi);
      this.camera.position.y = 30.0*Math.sin(phi);
    //  console.log(this.state.translateX + " and " + this.state.translateY);
      this.camera.lookAt(0.0, 0.0, 0.0);
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
//      angle += 0.01;
      x += dir;
      if (x === 100) {
        dir = -1;
      }
      if (x === -100) {
        dir = 1;
      }
      //if (angle > 6.28) angle = 0;
    }
  //  this.camera.position.x = 20;
    console.log("animating.....");
    animate();
  }

  inputChanged = (event) => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name] : value
      });
      if (name === 'modeNum')
        this.setState({evalue: this.state.eigenvalues[parseInt(value)]});
  }


  render() {
  
    let valtitles = ["pair 1", "pho W", "bp step", "pho C", "pair 2"];
    let val3titles = ["pair 1", "bp step", "pair 2"];
    let meanvals = [this.state.mean.slice(0,6), this.state.mean.slice(6, 12), this.state.mean.slice(12, 18), this.state.mean.slice(18, 24), this.state.mean.slice(24, 30)];
    
    
    return (<>
    	<div className="data-window">
	<b>Mean state:</b><input type="checkbox" name="showIC" checked={this.state.showIC} onChange={this.inputChanged}/>Show original internal (rad/5) form<table><tbody>{meanvals.map((value,index) => (<tr><td>{valtitles[index]}</td><td>{(value[0]*(this.state.showIC ? 1 : 11.4591559*ref.scale(value[0],value[1],value[2]))).toFixed(5)}</td><td>{(value[1]*(this.state.showIC ? 1 : 11.4591559*ref.scale(value[0],value[1],value[2]))).toFixed(5)}</td><td>{(value[2]*(this.state.showIC ? 1 : 11.4591559*ref.scale(value[0],value[1],value[2]))).toFixed(5)}</td><td>{value[3]}</td><td>{(value[4]).toFixed(5)}</td><td>{(value[5]).toFixed(5)}</td></tr>))}</tbody></table>
	<b>Phosphates:</b><table><thead style={{border: "0 none"}}><tr><td></td><td>x_p</td><td>y_p</td><td>z_p</td></tr></thead><tbody><tr><td>watson</td><td>{this.state.phoW[0].toFixed(5)}</td><td>{this.state.phoW[1].toFixed(5)}</td><td>{this.state.phoW[2].toFixed(5)}</td></tr><tr><td>crick</td><td>{this.state.phoC[0].toFixed(5)}</td><td>{this.state.phoC[1].toFixed(5)}</td><td>{this.state.phoC[2].toFixed(5)}</td></tr></tbody></table>
	{this.state.eigenvalues.length > 0 ? <><select value={this.state.modeNum} name="modeNum" onChange={this.inputChanged}>
        {this.state.eigenlist.map((value) => (
            <option key={value.value} value={value.index}>{value.index + ": eigenvalue: " + value.value}</option>
        ))}</select> <input type="checkbox" name="useScale" onChange={this.inputChanged} checked={this.state.useScale}/> Scale by standard deviation</>
        : null}
	<div style={{border: "solid", margin: "auto", width:"600px", height: "600px", justifyContent: "center", textAlign: "center"}} ref={ref => (this.mount = ref)}></div>
	  {this.state.eigenvectors.length > 0 ? <Eigenvector vector={this.state.eigenvectors[parseInt(this.state.modeNum)]}/> : null}<br/><br/>
	  	<b>3DNA state:</b><table><tbody>{this.state.parameters3.map((value,index) => (<tr><td>{val3titles[index]}</td><td>{value[0].toFixed(5)}</td><td>{value[1].toFixed(5)}</td><td>{value[2].toFixed(5)}</td><td>{value[3].toFixed(5)}</td><td>{value[4].toFixed(5)}</td><td>{value[5].toFixed(5)}</td></tr>))}</tbody></table><br/><br/>
	  <u><b>PDB text file</b></u>
	  <pre>{this.state.pdbText}</pre><br/>
	  <pre>{JSON.stringify(ref.getFrames())}</pre>
	  </div>
	  </>);
  }
//<button onClick={() => {}}>Animate</button>
}

export default DThree;
