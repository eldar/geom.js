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

function DCEL() {
    this.edges = [];
    this.faces = [];
    this.vertices = [];
}

function fortunes_sweep(points) {
    var event_queue
}