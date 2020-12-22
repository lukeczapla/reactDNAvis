import React from 'react';
import DThree from '../DThree/DThree.jsx';
class TetramerReader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: '1',
      tetramer: '',
      mean: {},
      covariance: {},
      items: [],
      engaged: false
    };
  }

  engage = () => {
    if (this.state.tetramer.length > 3) {
      this.setState({
        engaged: false
      }, () => {
        this.setState({
          engaged: true
        });
      });
    }
  }


  inputChanged = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  loadSet = () => {
    let f1 = "", f2 = "";
    let itemsT = [];
    let covarianceT = {};
    let meanT = {};
    if (parseInt(this.state.selected) === 1) {
      f1 = process.env.PUBLIC_URL+"/mean_TX3_3S_C1_cg_136.txt";
      f2 = process.env.PUBLIC_URL+"/cov_TX3_3S_C1_cg_136.txt";
    }
    if (parseInt(this.state.selected) === 2) {
      f1 = process.env.PUBLIC_URL+"/mean_cgDNA_136.txt";
      f2 = process.env.PUBLIC_URL+"/cov_cgDNA_136.txt";
    }
    if (parseInt(this.state.selected) === 3) {
      f1 = process.env.PUBLIC_URL+"/MD_mean_bstj_cgf_136.txt";
      f2 = process.env.PUBLIC_URL+"/MD_cov_bstj_cgf_136.txt";
    }
    if (parseInt(this.state.selected) === 4) {
      f1 = process.env.PUBLIC_URL+"/mean_TX2_3S_C1_cg_136.txt";
      f2 = process.env.PUBLIC_URL+"/cov_TX2_3S_C1_cg_136.txt";
    }
    fetch(f1)
    .then((r) => r.text())
    .then(text => {
      let lines = text.split("\n");
      lines.forEach(line => {
        let litems = line.split(" ");
        if (litems.length < 31) return;
        itemsT.push(litems[0]);
        let steps = [];
        for (let i = 0; i < 30; i++) {
          steps.push(parseFloat(litems[i+1]));
        }
        meanT[litems[0]] = steps;
      })
    });
    fetch(f2)
    .then((r) => r.text())
    .then(text => {
      let lines = text.split("\n");
      let lastitem = "";
      lines.forEach(line => {
        let litems = line.split(" ");
        if (litems.length < 31) return;
        if (!itemsT.includes(litems[0])) {
          alert("Step does not exist! " + litems[0]);
        }
        if (litems[0] !== lastitem) {
          covarianceT[litems[0]] = [];
          lastitem = litems[0];
        }
        let row = [];
        for (let i = 0; i < 30; i++) {
          row.push(parseFloat(litems[i+1]));
        }
        covarianceT[litems[0]].push(row);
      });
      this.setState({
        tetramer: itemsT[0],
        items: itemsT,
        covariance: covarianceT,
        mean: meanT
      }, () => this.forceUpdate());
      console.log(meanT);
      console.log(covarianceT);
      console.log(itemsT);
    });

  }

  render() {
    return (<div>
          <select name="selected" value={this.state.selected} onChange={this.inputChanged}>
            <option id="1" value="1" key="1">TX3 X-ray</option>
            <option id="2" value="2" key="2">cgDNA+ 136</option>
            <option id="3" value="3" key="3">MD</option>
            <option id="4" value="4" key="4">TX2 X-ray</option>

          </select>
          <button onClick={this.loadSet}>Load Dataset</button>
          <select name="tetramer" value={this.state.tetramer} onChange={this.inputChanged}>
            {this.state.items.length > 0 ? this.state.items.map((name) => (
              <option key={name} value={name}>{name}</option>
            )) : null}
          </select>
          <button onClick={this.engage}>Run</button>
          {this.state.engaged? <DThree mean={this.state.mean[this.state.tetramer]} cov={this.state.covariance[this.state.tetramer]} tetramer={this.state.tetramer}/>: null}
          </div>
        )
  }
}

export default TetramerReader;
