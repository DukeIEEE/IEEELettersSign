/* svg.js functions */
function getNormal(arr, p1, p2, edge_index) {
  // limitations: only works for vertical or horizontal lines

  var vertical = isVertical(p1, p2), // check if line is horizontal or vertical
    c = center(p1, p2);
  //console.log(p1, p2);
  // create perpendicular bisector of the line between p1 and p2
  // redefine p1 and p2 to be the new line
  if (vertical) {
    p1 = [-maxR,
      c[1]
    ];
    p2 = [maxR, c[1]];
  } else {
    p1 = [
      c[0], -maxR
    ];
    p2 = [c[0], maxR];
  }
  //console.log(p1, p2);

  // find intersections and calc. normal vector
  var intersections = [];
  // first, loop over all edges
  for (var i = 0; i < arr.length; ++i) {
    if (i == edge_index)
      continue;
    var q1 = arr[i],
      q2;
    if (i != arr.length - 1) {
      q2 = arr[i + 1];
    } else {
      q2 = arr[0];
    }
    pVert = isVertical(p1, p2);
    qVert = isVertical(q1, q2);
    if (pVert != qVert) { // if line and edge are not parallel
      //console.log(q1, q2);
      if (pVert && (isBetween(q1[0], p1[0], q2[0]) && isBetween(p1[1], q1[1], p2[1]))) { // p is vertical and q is horizontal
        var dir = q1[1] > c[1]
          ? 1
          : -1;
        intersections.push(dir);
        //console.log('intersectionY', dir);
      } else if (qVert && (isBetween(p1[0], q1[0], p2[0]) && isBetween(q1[1], p1[1], q2[1]))) { // q is vertical and p is horizontal
        var dir = q1[0] > c[0]
          ? 1
          : -1;
        intersections.push(dir);
        //console.log('intersectionX',dir);
      }
    }
  }
  //console.log(intersections);

  // calculate normal vector
  var vec = [
      0, 0
    ],
    above = 0,
    below = 0;
  for (var i = 0; i < intersections.length; ++i) {
    if (intersections[i] == 1) {
      ++above;
    } else {
      ++below;
    }
  }

  var sign = below % 2 - above % 2;
  //console.log(above, below, sign)
  if (pVert) { // intersections in y
    vec = [0, sign];
  } else { // intersections in x
    vec = [sign, 0];
  }
  //console.log(vec);
  return vec;
}

function isVertical(p1, p2) {
  return (p1[0] == p2[0])
}

function isBetween(a1, a2, a3) {
  return ((a1 < a2) && (a2 < a3)) || ((a3 < a2) && (a2 < a1));
}

/* pts transforms */

function transform(arr, x, y, scale) { // moves pts to position and scales them
  // note x and y are units of inches
  var xi = x * scale,
    yi = y * scale;
  for (var i = 0; i < arr.length; ++i) {
    var pt = arr[i];
    pt[0] = (pt[0] * scale) + xi;
    pt[1] = (pt[1] * scale) + yi;
  }
  return arr;
}

/* general pt operations */
function center(p1, p2) {
  return [
    (p1[0] + p2[0]) / 2,
    (p1[1] + p2[1]) / 2
  ];
}

function dist(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
}

function flipX(arr) { // mirror over x axis
  var newArr = [];
  for (var i = 0; i < arr.length; ++i) {
    var pt = arr[(arr.length - 1) - i];
    newArr.push([
      pt[0], -pt[1]
    ])
  }
  return arr.concat(newArr);
}

function flipY(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; ++i) {
    var pt = arr[(arr.length - 1) - i];
    newArr.push([-pt[0],
      pt[1]
    ])
  }
  // remove first item in each flipped array
  arr.splice(0, 1);
  newArr.splice(0, 1)
  arr.splice(-1, 1);
  newArr.splice(-1, 1)

  return arr.concat(newArr);
}

function removeDoubles(a) {
  return a.filter(function(item, pos, arr) {
    if (pos == a.length - 1) // check if last object is same as first
      return compareTuples(item, arr[0])

    return pos === 0 || compareTuples(item, arr[pos - 1]);
  });
}

function add(p1, p2) {
  return [
    p1[0] + p2[0],
    p1[1] + p2[1]
  ];
}

function sub(p1, p2) {
  return [
    p1[0] - p2[0],
    p1[1] - p2[1]
  ];
}

function mul(p1, p2) {
  if (!p2.length)
    return [
      p1[0] * p2,
      p1[1] * p2
    ];
  return [
    p1[0] * p2[0],
    p1[1] * p2[1]
  ];
}

function div(p1, p2) {
  if (!p2.length)
    return [
      p1[0] / p2,
      p1[1] / p2
    ];
  return [
    p1[0] / p2[0],
    p1[1] / p2[1]
  ];
}

function compareTuples(p1, p2) { // returns true if the objects are not the same
  return p1[0] !== p2[0] || p1[1] !== p2[1];
}

function getSign(pt) {
  return [
    Math.sign(pt[0]),
    Math.sign(pt[1])
  ];
}
