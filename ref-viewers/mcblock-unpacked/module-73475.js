export let V;
((e)=>{
    e.rotate = function({ up, down, north, east, south, west }, t, r) {
        switch(r){
            case 90:
                [north, east, south, west] = [
                    east,
                    south,
                    west,
                    north
                ];
                break;
            case 180:
                [north, east, south, west] = [
                    south,
                    west,
                    north,
                    east
                ];
                break;
            case 270:
                [north, east, south, west] = [
                    west,
                    north,
                    east,
                    south
                ];
        }
        switch(t){
            case 90:
                [up, north, down, south] = [
                    north,
                    down,
                    south,
                    up
                ];
                break;
            case 180:
                [up, north, down, south] = [
                    down,
                    south,
                    up,
                    north
                ];
                break;
            case 270:
                [up, north, down, south] = [
                    south,
                    up,
                    north,
                    down
                ];
        }
        return {
            up,
            down,
            north,
            east,
            south,
            west
        };
    };
    e.none = function() {
        return Object.create(null);
    };
})(V = V || (V = {}));
