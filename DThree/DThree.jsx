import './DThree.css';
import React, {Component} from 'react';
import * as trois from 'three';
import numeric from 'numeric';
import Eigenvector from './Eigenvector.jsx';
import * as ref from './References.jsx';

class DThree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modeNum : '0',
      isDragging: false,
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
      eigenlist: []
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
    console.log(ref.parseBases());
    let cov = this.state.cov;
    console.log(cov);
    let F = numeric.inv(cov);
    let eigen = ref.jeigen(F);
    console.log(eigen);
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
    let points = ref.get30Coordinates(demo, this.state.tetramer);
    console.log(points);
    document.body.style.backgroundColor = "white";
    this.scene = new trois.Scene();
    this.scene.background = new trois.Color( 0xffffff );
    this.camera = new trois.OrthographicCamera(-20, 20, 20, -20, -40, 500);
    this.scene.add(this.camera);
    this.renderer = new trois.WebGLRenderer();
    this.renderer.setSize(500, 500);
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
      scale = 1/Math.sqrt(eigen.eigenvalues[parseInt(this.state.modeNum)]);
      let icnew = numeric.add(demo, numeric.mul(x/50*scale, eigen.eigenvectors[parseInt(this.state.modeNum)]));
      let points = ref.get30Coordinates(icnew, this.state.tetramer);
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
      console.log(name + " " + value);
      this.setState({
        [name] : value
      });
      if (name === 'modeNum')
        this.setState({evalue: this.state.eigenvalues[parseInt(value)]});
  }

  render() {
    let valtitles = ["pair 1", "pho 1", "basestep", "pho 2", "pair 2"];
    let meanvals = [this.state.mean.slice(0,6), this.state.mean.slice(6, 12), this.state.mean.slice(12, 18), this.state.mean.slice(18, 24), this.state.mean.slice(24, 30)];
    return (<>
        {this.state.eigenvalues.length > 0 ? <select value={this.state.modeNum} name="modeNum" onChange={this.inputChanged}>
        {this.state.eigenlist.map((value) => (
            <option key={value.value} value={value.index}>{value.index + ": eigenvalue: " + value.value}</option>
          ))}</select>
        : null}
	<b>Mean state:</b><table><tbody>{meanvals.map((value,index) => (<tr><td>{valtitles[index]}</td><td>{value[0]*11.46}</td><td>{value[1]*11.46}</td><td>{value[2]*11.46}</td><td>{value[3]}</td><td>{value[4]}</td><td>{value[5]}</td></tr>))}</tbody></table>
	<div ref={ref => (this.mount = ref)}></div>
	  {this.state.eigenvectors.length > 0 ? <Eigenvector vector={this.state.eigenvectors[parseInt(this.state.modeNum)]}/> : null}{this.state.midVal}</>);
  }
//<button onClick={() => {}}>Animate</button>
}

export default DThree;
