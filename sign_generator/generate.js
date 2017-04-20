/* global variables to set */
// unless otherwise specified, units are inches
const inch = 72, // 72 dpi
  tabSize = 0.8, // tab width
  tabMargin = 0.8, // minimum space to leave between tabs
  tolerance = 0.01, // padding;
  th_top = 0.095 + tolerance,
  th_side = 0.2 + tolerance,
  th_bot = th_side + tolerance, // same material for side and bottom
  side_depth = 0.42 + th_top + th_bot,
  side_marg = 0.3, // margin between side panels
  maxX = 24 * inch,
  maxY = 24 * inch,
  w = 7, // width of letter
  h = 9.5,
  maxR = 20; // square radius for letter

var draw = SVG('sign').size(maxX, maxY)
total = 0;

drawLetter('I', 0.5, 0.5);
drawLetter('E', 10.5, 0.5);

console.log(total/12)

document.getElementById('download').addEventListener("click", function() {
  initialize(); // run svg-crowbar
});

function drawLetter(letter, x, y) {
  var arr,
    xi = x * inch,
    yi = y * inch;

  var delta = [];
  if (letter == 'I') {
    arr = drawI(w, h);
    delta = [
      w / 2,
      h / 2
    ];
  } else {
    arr = drawE(w, h);
    delta = [
      w, h / 2
    ];
  }
  arr = removeDoubles(arr); // remove doubles from flip operation
  arr = addTabs(arr, x, y); // add tabs
  arr = transform(arr, delta[0], delta[1], inch);

  var polygon = draw.polygon(new SVG.PointArray(arr)).move(xi, yi).fill('none').stroke({opacity: 1, width: 0.8})
}

// the most important fxn
// creates tabs and creates side panels
var prevNorm;

function addTabs(arr, x, y) {
  var sidePanels = [] // tracks the number of tabs needed per side panel
  // loop over all edges
  for (var i = 0; i < arr.length; ++i) {
    var p1 = arr[i],
      position = 0,
      p2;
    if (i != arr.length - 1) {
      position = i + 1;
      p2 = arr[position];
    } else {
      position = 0;
      p2 = arr[position];
    }
    lineWidth = dist(p1, p2); // in inches
    total += lineWidth;

    // estimate number of tabs to use
    var tabWidth = tabMargin + tabSize,
      numTabs = Math.floor(lineWidth / tabWidth),
      norm = getNormal(arr, p1, p2, i), // find normal vector (outward direction)
      edge = getSign(sub(p2, p1)); // find edge vector

    var leftPad = (i == 0)
      ? false
      : -1 == cross(prevNorm, norm) // padding on side
    prevNorm = norm;

    sidePanels.push({nt: numTabs, wd: lineWidth, lp: leftPad});
    var tabs = getTabPts(numTabs, norm, edge, p1, p2, th_side);
    arr.splice(position, 0, ...tabs); // incorporate new tabs
    i += tabs.length;
  }

  sidePanels.sort(function(a, b) {
    return parseInt(b.nt) - parseInt(a.nt);
  });

  var sideX = x + side_marg,
    sideY = y + h + side_marg + 0.5;
  for (var i = 0; i < sidePanels.length; ++i) {
    drawSide(sidePanels[i], sideX, sideY);
    sideY += (side_depth + side_marg);
  }

  return arr;
}

// 2D Crossproduct
function cross(n1, n2) {
  return (n1[0] * n2[1]) - (n1[1] * n2[0]);
}

function drawSide(panel, x, y) {
  var nt = panel.nt,
    wd = panel.wd,
    lp = panel.lp,
    lDelta = lp
      ? th_side
      : -th_side, // if leftPad is true, extend one of the sides, if false, move the side in
    p1 = [-wd / 2,
      side_depth
    ],
    p2 = [
      wd / 2,
      side_depth
    ],
    norm = [
      0, -1
    ], // normal vector is in downward direction
    edge = [
      1, 0
    ], // edge vector
    pts = [
      p1,
      [
        wd / 2 + lDelta,
        side_depth
      ]
    ];

  pts.splice(1, 0, ...getTabPts(nt, norm, edge, p1, p2, th_top));

  var p1 = [
      wd / 2,
      0
    ],
    p2 = [-wd / 2,
      0
    ],
    norm = [
      0, 1
    ], // normal vector is in upward direction
    edge = [
      -1, 0
    ], // edge vector
    pts2 = [
      [
        wd / 2 + lDelta,
        0
      ],
      p2
    ];

  pts2.splice(1, 0, ...getTabPts(nt, norm, edge, p1, p2, th_bot));

  arr = pts.concat(pts2);
  arr = transform(arr, wd / 2 + x, y, inch);

  var polygon = draw.polygon(new SVG.PointArray(arr)).fill('none').stroke({opacity: 1, width: 0.8})
}

function getTabPts(numTabs, norm, edge, p1, p2, depth) {
  var numSegments = numTabs + 1,
    oppEd = [-edge[0], -edge[1]
    ],
    delta = div(sub(p2, p1), numSegments), // divide segment into this many segments
    tabs = [],
    sideDelta = mul(norm, depth),
    midPt = JSON.parse(JSON.stringify(p1)); // deep clone array

  for (var j = 0; j < numTabs * 4; j += 4) {
    midPt = add(delta, midPt); // midpoint of tab
    var t1 = add(midPt, mul(oppEd, tabSize / 2)),
      t2 = add(t1, sideDelta),
      t4 = add(midPt, mul(edge, tabSize / 2)),
      t3 = add(t4, sideDelta)
    tabs[0 + j] = t1;
    tabs[1 + j] = t2;
    tabs[2 + j] = t3;
    tabs[3 + j] = t4;
  }
  return tabs;
}

function drawI(w, h) { // generates points on a basic I
  // all units in inches
  var t1 = 2.25, // horizontal thickness
    t2 = 2; // vertical thickness
  var base = [
    [
      0, h / 2
    ],
    [
      w / 2,
      h / 2
    ],
    [
      w / 2,
      h / 2 - t2
    ],
    [
      t1 / 2,
      h / 2 - t2
    ]
  ];
  return flipY(flipX(base)); // full outline of figure, just need tabs
}

function drawE(w, h) { // generates points on a basic I
  // all units in inches
  var t1 = 2.25, // horizontal thickness
    t2 = 2; // vertical thickness
  var base = [
    [
      0, h / 2
    ],
    [
      w, h / 2
    ],
    [
      w, h / 2 - t2
    ],
    [
      t1, h / 2 - t2
    ],
    [
      t1, t2 / 2
    ],
    [
      w, t2 / 2
    ]
  ];
  return flipX(base); // full outline of figure, just need tabs
}
