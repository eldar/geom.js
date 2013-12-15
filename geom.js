define(function() {
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
/*
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
*/
    return {
        canvas: canvas,
        ctx: ctx
    }
});