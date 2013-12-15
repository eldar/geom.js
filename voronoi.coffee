define () ->
    class Event
        constructor: (@point) ->
            @is_circle = false
        lessThan: (other) ->
            @point.y < other.point.y || (@point.y == other.point.y && @point.x <= other.point.x)

    class BeachArc
        constructor: (@point ) ->

    # intersection points of two parabolas with foci p1 and p2,
    # and directrix y = y0
    parabolasIntersection = (p1, p2, y0) ->
        x1 = p1.x
        y1 = p1.y
        x2 = p2.x
        y2 = p2.y

        a = y2-y1
        b = x1*y0-x1*y2+x2*y1-x2*y0
        c = x1*x1*(y2-y0)-x2*x2*(y1-y0)+(y1-y2)*(y1-y0)*(y2-y0)

        D = Math.sqrt (b*b-a*c)
        xi_1 = (-b-D)/a
        xi_2 = (-b+D)/a
        [xi_1, xi_2]

    compute = (points) ->
        # Initialize the event queue with all site events
        event_queue = new RBTree
        event_queue.insert new Event(pt) for pt in points

        # initialize an empty status structure
        beach_line = new RBTree

        # and an empty doubly-connected edge list.

        #
        leftBreakPoint = (arc, y0) ->
            if not arc.rbPrevious
                return -Infinity
            inters = parabolasIntersection arc.point, arc.rbPrevious.point, y0
            
                

        handleCircleEvent = (p) ->

        handleSiteEvent = (ev) ->
            if not beach_line.root
                beach_line.root = new BeachArc ev.point
                return
            # find the arc above the isoline
            node = beach_line.root

            x0 = ev.point.x
            y0 = ev.point.y
            while true
                dx = x0 - leftBreakPoint(node, y0)


            

        while event_queue.root
            # Remove the event with largest y-coordinate from event queue.
            event = event_queue.getLast event_queue.root
            console.log event.point.x, event.point.y, event.point.is_circle
            event_queue.rbRemoveNode event
            if event.is_circle
                handleCircleEvent event
            else
                handleSiteEvent event

        console.log "done"

    # test_points = JSON.parse '[{"x":384,"y":75},{"x":591,"y":196},{"x":243,"y":249},{"x":203,"y":213},{"x":635,"y":483},{"x":460,"y":298},{"x":711,"y":294},{"x":434,"y":489},{"x":196,"y":330},{"x":228,"y":188},{"x":557,"y":291},{"x":325,"y":298}]'
    compute: compute
    parabolasIntersection: parabolasIntersection