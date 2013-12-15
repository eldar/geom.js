function draw_line_2(ctx, x1, y1, x2, y2, style) {
    ctx.beginPath();
    ctx.strokeStyle = style;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function draw_line(ctx, a, b, style) {
    ctx.beginPath();
    ctx.strokeStyle = style;
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
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