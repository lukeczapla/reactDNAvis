
# reactDNAvis - visualizer for mode of motion of DNA base-pair step regions

Animates the eigenvectors of the inverse covariance matrix for a subset of 30 coordinates representing the state of the central junction of a DNA tetramer duplex (e.g., ATAG representing 5'-ATAG-3' paired with 5'-CTAT-3'), for a set of 136 non-redundant tetramers (out of 256), and displays the means, eigenvectors (normalized), and eigenvalues (effective rigidity).

Requires React, Three, and Numeric for node, and the input files (30x30 covariance matrices and 1x30 row vector of mean values for dimeric or tetrameric sequences), the browser should be WebGL enabled.

![Screenshot](https://github.com/lukeczapla/reactDNAvis/blob/master/ReactDNAVis.png?raw=true)


