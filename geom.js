function vec2(x_, y_) {
    return {x: x_, y: y_};
}

function copy_vec_2(v) {
    return {x: v.x, y: v.y};
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

function convexHull(points_) {
    var ch = [];
    if(points_.length < 3)
        return ch;

    // make a copy of points
    var points = [];
    for(var i = 0; i < points_.length; ++i)
        points.push(copy_vec_2(points_[i]));

    // find the bottommost point
    var idx = 0;
    for(var i = 0; i < points.length; ++i)
        if(points[i].y < points[idx].y)
            idx = i;

    // remove this point from array
    var min_pt = points.splice(idx, 1)[0];

    // ctx.strokeText("min_pt", min_pt.x+4, min_pt.y);

    var cos_angle = function(pt) {
        var v = sub2(pt, min_pt);
        return dot2(v, vec2(1, 0)) / norm2(v);
    };

    // sort points according to angle
    points.sort(function(a, b) {
        return cos_angle(a) < cos_angle(b);
    });
    points.unshift(min_pt);

    // draw_line(ctx, min_pt, points[1], 'black');
    for(var i = 1; i < points.length-1; ++i) {
        // ctx.strokeStyle = 'red';
        // ctx.strokeText(i.toString(), points[i].x+4, points[i].y);
        var prev = sub2(points[i], points[i-1]);
        var next = sub2(points[i+1], points[i]);
        var is_convex = sin_a(prev, next) > 0;
        // draw_line(ctx, points[i], points[i+1], is_convex ? 'green' : 'red');
    }

    //first and second point in sorted array always belong to CH
    ch = [points[0], points[1]];
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

/* Implementation using doubly-linked lists

    var head = ddl_array_to_list(points);
    var prev_n = ddl_get_next(head);
    var next_n = null;
    while(next_n != head) {
        var curr_n = ddl_get_next(prev_n);
        next_n = ddl_get_next(curr_n);

        var prev = sub2(curr_n.data, prev_n.data);
        var next = sub2(next_n.data, curr_n.data);

        var is_convex = sin_a(prev, next) > 0;
        if(!is_convex)
        {
            ddl_remove_node(curr_n);
            prev_n = ddl_get_prev(prev_n);
        }
        else
            prev_n = curr_n;
    }
    return head;
*/


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

function draw_points(ctx, points) {
    for(var i = 0; i < points.length; ++i)
        draw_point(ctx, points[i], 3, 'red');
}

function init(){
    var canvas = document.getElementById('viewer');
    var points = [];

    var ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', function(evt){
        points.push(getMousePos(canvas, evt));
        ctx.clearRect(0,0,canvas.width,canvas.height);

        hull = convexHull(points, ctx);
        draw_polygon(ctx, hull, 'green');
        for (var i = 0; i < points.length; i++)
            draw_point(ctx, points[i], 3, 'blue');
        draw_points(ctx, hull);
    });
}
