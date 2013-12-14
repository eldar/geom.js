function vec2(x_, y_) {
    return {x: x_, y: y_};
}

function copy_vec_2(v) {
    return {x: v.x, y: v.y};
}

function copy_assign_2(v, w) {
    v.x = w.x;
    v.y = w.y;
}

function sub2(a, b) {
    return vec2(a.x-b.x, a.y-b.y);
}

function norm2(a) {
    return Math.sqrt(a.x*a.x+a.y*a.y);
}

function dot2(a, b) {
    return a.x*b.x+a.y*b.y;
}

function cross2(a, b) {
    return a.x*b.y-b.x*a.y;
}

function sin_a(a, b) {
    return cross2(a, b) / (norm2(a)*norm2(b));
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

function draw_line(ctx, a, b, style) {
    ctx.beginPath();
    ctx.strokeStyle = style;
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
}

function convexHull(points_, ctx) {
    if(points_.length < 3)
        return points_;

    // make a copy of points
    var points = points_.slice(0);

    // find the bottommost point
    var idx = 0;
    for(var i = 0; i < points.length; ++i)
        if(points[i].y < points[idx].y)
            idx = i;

    // remove this point from array
    var min_pt = points.splice(idx, 1)[0];

    var cos_angle = function(pt) {
        var v = sub2(pt, min_pt);
        return dot2(v, vec2(1, 0)) / norm2(v);
    };

    // sort points according to angle
    points.sort(function(a, b) {
        return cos_angle(b) - cos_angle(a);
    });
    points.unshift(min_pt);

    if(false) {
        ctx.strokeText("min_pt", min_pt.x+4, min_pt.y);
        draw_line(ctx, min_pt, points[1], 'black');
        for(var i = 1; i < points.length-1; ++i) {
            ctx.strokeStyle = 'red';
            var pt = points[i];
            var str = i.toString() + " (" + pt.x.toString() + ", " + pt.y.toString() + ")"
            ctx.strokeText(str, points[i].x+4, points[i].y);
            var prev = sub2(points[i], points[i-1]);
            var next = sub2(points[i+1], points[i]);
            var is_convex = sin_a(prev, next) > 0;
            draw_line(ctx, points[i], points[i+1], is_convex ? 'green' : 'red');
        }
    }

    //first and second point in sorted array always belong to CH
    var ch = [points[0], points[1]];
    for(var i = 1; i < points.length-1;) {
        var prev = sub2(ch[ch.length-1], ch[ch.length-2]);
        var next = sub2(points[i+1], ch[ch.length-1]);
        var is_convex = sin_a(prev, next) > 0;
        if(is_convex)
            ch.push(points[++i]);
        else
            ch.pop()
    }

    return ch;
}

function draw_polygon(ctx, points, colour) {
    ctx.lineWidth = 3;
    for(var i = 0; i < points.length; ++i)
        draw_line(ctx, points[i], points[(i+1)%points.length], colour);
    ctx.lineWidth = 1;
}

function draw_point(ctx, pt, radius, color) {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function draw_points(ctx, points, colour) {
    for(var i = 0; i < points.length; ++i)
        draw_point(ctx, points[i], 3, colour);
}

//var test_points = JSON.parse('[{"x":384,"y":75},{"x":591,"y":196},{"x":243,"y":454},{"x":203,"y":249},{"x":635,"y":483},{"x":460,"y":298},{"x":711,"y":294},{"x":434,"y":489},{"x":196,"y":330},{"x":228,"y":188},{"x":557,"y":291},{"x":325,"y":298}]');

function init() {
    var canvas = document.getElementById('viewer');
    var ctx = canvas.getContext('2d');

    var points = [];
    var hull = [];
    
    var highlighted = null;
    var in_drag = false;

    var calculate_frame = function() {
        hull = convexHull(points, ctx);
    };

    var draw_frame = function() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        draw_polygon(ctx, hull, 'green');
        draw_points(ctx, points, 'blue');
        draw_points(ctx, hull, 'red');
        if(highlighted)
            draw_point(ctx, highlighted, 3, 'black');
    };

    canvas.addEventListener('mousemove', function(evt){
        var pt = getMousePos(canvas, evt);
        if(in_drag) {
            copy_assign_2(highlighted, pt);
            calculate_frame();
        } else {
            var eps = 5;
            highlighted = _.find(points, function(val){
                return norm2(sub2(pt, val)) < eps;
            });
        }
        draw_frame();
    });

    canvas.addEventListener('mouseup', function(evt){
        if(in_drag)
            in_drag = false;
    });

    canvas.addEventListener('mousedown', function(evt){
        if(highlighted) {
            in_drag = true;
        } else {
            points.push(getMousePos(canvas, evt));
            calculate_frame();
        }
        draw_frame();
    });
}
