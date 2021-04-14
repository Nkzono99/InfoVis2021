class Vec3 {
    // Constructor
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }

    sum() {
        return this.x + this.y + this.z;
    }

    min() {
        return Math.min(this.x, this.y, this.z);
    }

    max() {
        return Math.max(this.x, this.y, this.z);
    }

    mid() {
        console.log(this.x, this.y, this.z);
        if (this.x <= this.y) {
            console.log(this.x, this.y);
            if (this.z <= this.x) { // if z <= x <= y
                return this.x;
            } else if (this.z <= this.y) {  // if x < z <= y
                return this.z;
            } else {  // if x <= y < z
                return this.y;
            }
        } else {
            if (this.z <= this.y) { // if z <= y < x
                return this.y;
            } else if (this.z < this.x) { // if y < z <= x
                return this.z;
            } else {  // if y < x < z
                return this.x;
            }
        }
    }
}