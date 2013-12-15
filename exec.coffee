define ['cs!voronoi', 'geom'], (voronoi, geom) ->
    inters = voronoi.parabolasIntersection

    points = [{"x":300,"y":400},{"x":200,"y":300},{"x":400,"y":280}]

    parabola_fun = (pt, y0, x) -> 0.5 * ((x-pt.x)*(x-pt.x)/(pt.y-y0)+pt.y+y0)

    draw_parabola = (ctx, pt, y0) ->
        para = (x) -> 0.5 * ((x-pt.x)*(x-pt.x)/(pt.y-y0)+pt.y+y0)
        ctx.beginPath()
        ctx.strokeStyle = 'green'
        ctx.moveTo 0, para 0
        (for x in [1..799]
            ctx.lineTo x, para x)
        
        ctx.stroke()


    ctx = geom.ctx
    canvas = geom.canvas
    ctx.scale 1, -1
    ctx.translate 0, -canvas.height

    y = points[2].y
    draw_frame = () ->
        ctx.clearRect 0,0,canvas.width,canvas.height
        draw_line_2 ctx, 0, y, canvas.width, y, 'red'
        draw_parabola ctx, points[0], y
        draw_parabola ctx, points[2], y

        pts = inters points[0], points[2], y
        (for px in pts
            pp = vec2(px, parabola_fun(points[0], y, px))
            draw_point ctx, pp, 3, 'red'
            )

        draw_points geom.ctx, points, 'blue'


    animate = (timeStamp) ->
        window.requestAnimationFrame animate
        # do something
        if y > 0 then y = y-0.5
        draw_frame()

    window.requestAnimationFrame animate