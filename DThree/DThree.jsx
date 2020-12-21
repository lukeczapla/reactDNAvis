
import React, {Component} from 'react';
import * as trois from 'three';
import numeric from 'numeric';
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
      mean: props.mean,
      cov: props.cov,
      tetramer: props.tetramer,
      eigenvalues: []
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
    this.setState({evalue: eigen.eigenvalues[parseInt(this.state.modeNum)],
    eigenvalues: eigen.eigenvalues});
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
    points.forEach((atom) => {
      //  console.log(atom);
        let geometry = new trois.SphereGeometry(1.2, 10, 10, 10);
        let color = 0xAA00AA;
        if (atom.name.charAt(0) === 'O') color = 0xCC0000;
        if (atom.name.charAt(0) === 'C') color = 0x777777;
        if (atom.name.charAt(0) === 'N') color = 0x0000CC;

        let material = new trois.MeshLambertMaterial({color: color});
        let sphere = new trois.Mesh(geometry, material);
        sphere.position.set(atom.x-avgx, atom.y-avgy, atom.z-avgz);
        this.scene.add(sphere);
        spheres.push(sphere);
    });
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

    let scale = 1/Math.sqrt(eigen.eigenvalues[parseInt(this.state.modeNum)]);
    let x = 0;
    let dir = 1;
    const animate = () => {
      let icnew = numeric.add(demo, numeric.mul(x/50*scale, eigen.eigenvectors[parseInt(this.state.modeNum)]));
      let points = ref.get30Coordinates(icnew, this.state.tetramer);
      let i = 0;
      points.forEach((atom) => {
        spheres[i].position.set(atom.x-avgx, atom.y-avgy, atom.z-avgz);
        i++;
      })
      //this.camera.position.x = 5*Math.cos(angle);
      //this.camera.position.y = 5*Math.sin(angle);
      let phi = this.state.translateX / 100.0; let theta = this.state.translateY / 100.0;
      this.camera.position.x = 30.0*Math.cos(theta)*Math.sin(phi);
      this.camera.position.y = 30.0*Math.sin(theta)*Math.sin(phi);
      this.camera.position.z = 30.0*Math.cos(phi);
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
    return (<>
        {this.state.eigenvalues.length > 0 ? <select value={this.state.modeNum} name="modeNum" onChange={this.inputChanged}>
        {this.state.eigenvalues.map((value, index) => (
            <option key={value} value={index}>{index + ": eigenvalue: " + value}</option>
          ))}</select>
        : null}

<br/>{"Eigenvalue: " + this.state.evalue}<div ref={ref => (this.mount = ref)}></div></>);
  }
//<button onClick={() => {}}>Animate</button>
}

export default DThree;
